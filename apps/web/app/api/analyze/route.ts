import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { artifactType, content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // You can hardcode this here or use process.env.NVIDIA_API_KEY
    const API_KEY = process.env.NVIDIA_API_KEY || "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";

    const systemPrompt = `You are Sentinel AI, an expert cybersecurity threat analysis engine. 
    Analyze the following \${artifactType} for potential cyber threats.
    - If it is a Network PCAP, look for C2 beacons, abnormal data exfiltration, or exploitation attempts.
    - If it is a Sysmon Event, look for credential dumping, suspicious child processes, or privilege escalation.
    - If it is a Malware Hash (MD5/SHA256) or PE header, evaluate known signatures or suspicious imports.
    - If it is a URL/Email, look for phishing indicators or malicious payloads.
    
    Respond strictly in JSON format with the following structure:
    {
      "classification": "Benign" | "Suspicious" | "Malicious",
      "confidenceScore": number (0-100),
      "threatType": string (e.g. "SQL Injection", "Phishing", "Ransomware", "C2 Communication", "None"),
      "analysis": string (detailed explanation of exactly what you found and why it's a threat),
      "indicators": string[] (list of IOCs like IP addresses, domains, suspicious keywords, or "None"),
      "recommendation": string (actionable advice for the security team)
    }`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer \${API_KEY}`
      },
      body: JSON.stringify({
        model: "z-ai/glm-5.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please analyze this \${artifactType}:\n\n\${content}` }
        ],
        temperature: 0.2,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("NVIDIA API Error:", err);
      return NextResponse.json({ error: 'Failed to analyze threat' }, { status: 500 });
    }

    const data = await response.json();
    const resultContent = data.choices[0].message.content;
    const parsedResult = JSON.parse(resultContent);

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
