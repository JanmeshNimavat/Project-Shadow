export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-mono font-bold uppercase text-primary-900">Case Management</h1>
          <p className="text-sm font-mono text-gray-500 mt-1">Active investigations and classified files.</p>
        </div>
        <button className="bg-accent-blue text-white px-4 py-2 font-mono font-bold text-sm hover:bg-blue-700 transition-colors uppercase">
          + New Case File
        </button>
      </div>

      <div className="bg-white border border-border">
        <div className="p-4 border-b border-border bg-gray-50 flex gap-4">
          <input 
            type="text" 
            placeholder="Search by Case ID, Target, or Keywords..." 
            className="flex-1 bg-white border border-border px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
          />
          <select className="bg-white border border-border px-4 py-2 font-mono text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Pending Review</option>
          </select>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-white">
              <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Case ID</th>
              <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Classification</th>
              <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Assigned To</th>
              <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Status</th>
              <th className="px-4 py-3 text-xs font-mono text-gray-500 uppercase font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono text-primary-900">
            {/* Example Data */}
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 font-bold text-accent-blue hover:underline cursor-pointer">
                  SW-2026-{(4291 - i).toString().padStart(4, '0')}
                </td>
                <td className="px-4 py-4">Ransomware - P{i > 3 ? 3 : i}</td>
                <td className="px-4 py-4">Agent 47</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-bold uppercase border ${i === 1 ? 'border-accent-red text-accent-red bg-red-50' : 'border-primary-900 text-primary-900 bg-gray-50'}`}>
                    {i === 1 ? 'Investigating' : 'Open'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="text-xs uppercase font-bold text-gray-500 hover:text-primary-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
