export default function IntelligencePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-mono font-bold uppercase text-primary-900 flex items-center gap-2">
            <span className="w-3 h-3 bg-accent-red animate-pulse"></span>
            Threat Intelligence
          </h1>
          <p className="text-sm font-mono text-gray-500 mt-1">Live dark web reconnaissance and threat actor profiles.</p>
        </div>
        <button className="bg-accent-red text-white px-4 py-2 font-mono font-bold text-sm hover:bg-red-700 transition-colors uppercase">
          Force Scrape
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-border bg-white shadow-sm">
          <div className="p-4 border-b border-border bg-primary-900 text-white font-mono font-bold text-sm uppercase">
            Active Threat Actors
          </div>
          <div className="p-4 space-y-4">
            <div className="border border-border p-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between">
                <span className="font-mono font-bold text-accent-red">TA-993 (LockBit Affiliate)</span>
                <span className="text-xs font-mono font-bold border border-red-500 text-red-500 px-1">HIGH RISK</span>
              </div>
              <p className="text-sm font-mono text-gray-500 mt-2">Active on XSS forum. Associated with 3 active cases.</p>
            </div>
            <div className="border border-border p-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between">
                <span className="font-mono font-bold text-primary-900">TA-821 (Unknown)</span>
                <span className="text-xs font-mono font-bold border border-orange-500 text-orange-500 px-1">MEDIUM RISK</span>
              </div>
              <p className="text-sm font-mono text-gray-500 mt-2">Monitoring new marketplace vendor profile.</p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-white shadow-sm">
          <div className="p-4 border-b border-border bg-primary-900 text-white font-mono font-bold text-sm uppercase">
            Live Feed (ROBIN Agent)
          </div>
          <div className="p-4 space-y-2 h-[300px] overflow-y-auto bg-gray-50 border-inner border-border">
            <div className="text-xs font-mono">
              <span className="text-accent-blue">[10:45:02]</span> SYSTEM: Initiating Tor circuit connection...
            </div>
            <div className="text-xs font-mono">
              <span className="text-green-600">[10:45:15]</span> SUCCESS: Connected to network.
            </div>
            <div className="text-xs font-mono">
              <span className="text-accent-blue">[10:46:22]</span> ROBIN: Scraping target URL (hidden service)...
            </div>
            <div className="text-xs font-mono">
              <span className="text-accent-red">[10:46:30]</span> ALERT: Keyword match found ('database dump', 'sql'). Threat score: 85.
            </div>
            <div className="text-xs font-mono">
              <span className="text-accent-blue">[10:46:35]</span> ORACLE: Correlating finding with Case SW-2026-0001.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
