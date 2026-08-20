import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { artifactType, content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // You can hardcode this here or use process.env.NVIDIA_API_KEY
    const API_KEY = process.env.NVIDIA_API_KEY || "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";

    const systemPrompt = `You are ATI Engine, an elite Level-3 SOC analyst AI. 
    Analyze the following \${artifactType} for potential cyber threats.
    
    1. Look for known IOCs (Indicators of Compromise).
    2. Check for abnormal behaviors (e.g., C2 beacons, credential dumping).
    3. Cross-reference with standard MITRE ATT&CK vectors.
    
    Respond strictly in JSON format with exactly this structure:
    {
      "classification": "Benign" | "Suspicious" | "Malicious",
      "confidenceScore": <number between 0 and 100>,
      "threatType": "<Short label e.g., SQL Injection, Phishing, None>",
      "analysis": "<Detailed, highly technical explanation of findings>",
      "indicators": ["<List>", "<of>", "<extracted>", "<IOCs>", "or 'None'"],
      "recommendation": "<Actionable mitigation steps for incident responders>"
    }`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer \${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please analyze this \${artifactType}:\n\n\${content}` }
        ],
        temperature: 0.1,
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
