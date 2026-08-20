export default function IntelligencePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex justify-between items-end border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red shadow-[0_0_8px_rgba(239,83,80,0.8)]"></span>
            </span>
            Threat Intelligence
          </h1>
          <p className="text-gray-400 text-sm">Live dark web reconnaissance and threat actor profiles.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-red hover:bg-accent-red/90 text-white text-sm font-bold shadow-[0_0_15px_rgba(239,83,80,0.4)] transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Force Scrape
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 bg-white/[0.02] flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-white">Active Threat Actors</h2>
          </div>
          <div className="p-6 space-y-4 flex-1">
            <div className="border border-border/50 bg-primary-900/50 rounded-xl p-4 hover:bg-white/[0.05] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-white group-hover:text-accent-blue transition-colors">TA-993 (LockBit Affiliate)</span>
                <span className="text-xs font-semibold uppercase tracking-wider border border-accent-red/30 bg-accent-red/10 text-accent-red px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
                  High Risk
                </span>
              </div>
              <p className="text-sm text-gray-400">Active on XSS forum. Associated with 3 active cases involving critical infrastructure.</p>
            </div>
            
            <div className="border border-border/50 bg-primary-900/50 rounded-xl p-4 hover:bg-white/[0.05] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-white group-hover:text-accent-blue transition-colors">TA-821 (Unknown)</span>
                <span className="text-xs font-semibold uppercase tracking-wider border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                  Medium Risk
                </span>
              </div>
              <p className="text-sm text-gray-400">Monitoring new marketplace vendor profile selling stolen credentials.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0D1117] backdrop-blur-md rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col font-mono relative">
          <div className="p-4 border-b border-border/50 bg-primary-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Live Feed (ROBIN Agent)</h2>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
            </div>
          </div>
          <div className="p-6 space-y-3 flex-1 overflow-y-auto text-sm text-gray-400">
            <div className="flex gap-3">
              <span className="text-accent-blue shrink-0">[10:45:02]</span>
              <span className="text-gray-300">SYSTEM: Initiating Tor circuit connection...</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-green shrink-0">[10:45:15]</span>
              <span className="text-gray-300">SUCCESS: Connected to network.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-blue shrink-0">[10:46:22]</span>
              <span className="text-gray-300">ROBIN: Scraping target URL (hidden service)...</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-red shrink-0 font-bold">[10:46:30]</span>
              <span className="text-accent-red">ALERT: Keyword match found ('database dump', 'sql'). Threat score: 85.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-purple shrink-0">[10:46:35]</span>
              <span className="text-gray-300">ORACLE: Correlating finding with Case SW-2026-0001.</span>
            </div>
            <div className="flex gap-3 animate-pulse">
              <span className="text-gray-500 shrink-0">[10:46:38]</span>
              <span className="text-gray-500">_ waiting for input...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
