export class AgentService {
  private readonly baseUrl = 'https://integrate.api.nvidia.com/v1';

  constructor(private apiKey: string) {}

  async runAgent(prompt: string, model: string = 'meta/llama3-70b-instruct'): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 2048,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NVIDIA NIM API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as any;
    return data.choices[0]?.message?.content || '';
  }

  async runOracleAgent(caseSummary: string): Promise<string> {
    const prompt = `You are ORACLE, the Case Intelligence Agent for ShadowWatch. 
Please analyze this case summary and suggest investigative leads:
${caseSummary}`;
    return this.runAgent(prompt);
  }

  async runSentinelAgent(threatData: string): Promise<string> {
    const prompt = `You are SENTINEL, the Threat Analysis Agent for ShadowWatch.
Evaluate the following threat data and output a JSON threat score from 0 to 100:
${threatData}`;
    return this.runAgent(prompt);
  }
}
