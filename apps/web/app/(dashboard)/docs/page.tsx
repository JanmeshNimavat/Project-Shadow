export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-bold tracking-tight text-white flex items-center gap-3">
          <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Aegis Documentation
        </h1>
        <p className="text-xl text-gray-400">Everything you need to know about the Aegis Cyber Intelligence Platform.</p>
      </div>

      <div className="prose prose-invert prose-blue max-w-none space-y-8">
        <section className="bg-primary-800/50 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Getting Started
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Aegis is a next-generation security operations platform powered by NVIDIA AI. It is designed to rapidly ingest, analyze, and remediate cyber threats across multiple attack vectors.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Guest Mode:</strong> You are currently able to use the platform without an account. All data is stored locally in your browser to preserve privacy.</li>
            <li><strong>AI Analyzer:</strong> Navigate to the AI Analyzer to paste logs, hashes, or PCAP data. The SENTINEL AI will instantly categorize it.</li>
            <li><strong>Reporting:</strong> Use the "Export Report" button in the top right to generate a pristine PDF of your current dashboard.</li>
          </ul>
        </section>

        <section className="bg-primary-800/50 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Threat Classifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-accent-red/10 border border-accent-red/20 rounded-xl">
              <h3 className="text-accent-red font-bold mb-2">Malicious</h3>
              <p className="text-sm text-gray-300">Confirmed threat with active indicators of compromise (IOCs). Immediate isolation and remediation required.</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h3 className="text-yellow-500 font-bold mb-2">Suspicious</h3>
              <p className="text-sm text-gray-300">Anomalous behavior that deviates from baseline. Requires human review by a Level 2 SOC Analyst.</p>
            </div>
            <div className="p-4 bg-accent-green/10 border border-accent-green/20 rounded-xl">
              <h3 className="text-accent-green font-bold mb-2">Benign</h3>
              <p className="text-sm text-gray-300">Normal system behavior or known safe files. No further action required.</p>
            </div>
          </div>
        </section>
        
        <section className="bg-primary-800/50 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Architecture & Privacy</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Aegis operates on a strictly localized architecture for Guest users. No investigation data leaves your browser unless you explicitly export it. The AI inference is routed securely through NVIDIA NIM gateways with zero-retention policies.
          </p>
        </section>
      </div>
    </div>
  );
}
