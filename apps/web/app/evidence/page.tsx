export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-mono font-bold uppercase text-primary-900">Evidence Vault</h1>
          <p className="text-sm font-mono text-gray-500 mt-1">Immutable chain of custody records and artifacts.</p>
        </div>
        <button className="bg-primary-900 text-white px-4 py-2 font-mono font-bold text-sm hover:bg-black transition-colors uppercase">
          Upload Artifact
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-white border border-border p-4 shadow-sm">
            <h3 className="text-sm font-mono font-bold uppercase border-b border-border pb-2 mb-4">Chain of Custody</h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-accent-blue">
                <div className="absolute -left-[5px] top-1 w-2 h-2 bg-accent-blue rounded-full"></div>
                <div className="text-xs font-mono text-gray-500">10:42 AM Today</div>
                <div className="text-sm font-mono font-medium">Artifact EV-992 accessed by Agent 47</div>
              </div>
              <div className="relative pl-4 border-l-2 border-accent-blue">
                <div className="absolute -left-[5px] top-1 w-2 h-2 bg-accent-blue rounded-full"></div>
                <div className="text-xs font-mono text-gray-500">Yesterday</div>
                <div className="text-sm font-mono font-medium">Artifact EV-991 uploaded securely via portal</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white border border-border shadow-sm p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Artifact ID</th>
                <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Type</th>
                <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">SHA-256 Hash</th>
                <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono text-primary-900">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 font-bold text-accent-blue">EV-2026-992</td>
                <td className="px-4 py-4">Database Dump (.sql)</td>
                <td className="px-4 py-4 font-mono text-xs text-gray-500 truncate max-w-[150px]">8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92</td>
                <td className="px-4 py-4"><span className="text-green-600 font-bold uppercase text-xs border border-green-600 px-2 py-1">Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
