"use client";

import { useThreats } from '../../../hooks/useThreats';
import { toast } from 'sonner';

export default function CasesPage() {
  const { threats } = useThreats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex justify-between items-end border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Incident Response</h1>
          <p className="text-gray-400 text-sm">Active SOC cases, classified files, and assigned targets.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              if (threats.length === 0) {
                toast.error('No data available to export.');
                return;
              }
              const headers = ['Case ID', 'Threat Type', 'Classification', 'Confidence Score', 'Timestamp'];
              const csvContent = [
                headers.join(','),
                ...threats.map(t => `"\${t.id}","\${t.threatType}","\${t.classification}","\${t.confidenceScore}","\${t.timestamp}"`)
              ].join('\\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `aegis_soc_report_\${new Date().toISOString().split('T')[0]}.csv`;
              link.click();
              toast.success('SOC Incident Report exported successfully as CSV.');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-700 hover:bg-primary-600 text-white text-sm font-bold border border-border transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <button onClick={() => toast.success('Generated new empty case file.')} className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue hover:bg-accent-blue/90 text-white text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Case File
          </button>
        </div>
      </div>

      <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 bg-white/[0.02]">
          <div className="relative flex-1">
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by Case ID, Target, or Keywords..." 
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  toast.info(`Filtering cases for: ${e.currentTarget.value}`);
                }
              }}
              className="w-full bg-primary-900 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
          <select className="bg-primary-900 border border-border rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent-blue">
            <option>All Statuses</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Pending Review</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-900/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Case ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Classification</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Assigned To</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {threats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No active investigations found. Analyze a new threat to generate a case file.
                  </td>
                </tr>
              ) : (
                threats.map((threat) => (
                  <tr key={threat.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-accent-blue transition-colors">
                      {threat.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.threatType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Unassigned</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${threat.classification === 'Malicious' ? 'border-[#EF5350]/20 text-[#EF5350] bg-[#EF5350]/10' : threat.classification === 'Suspicious' ? 'border-[#F59E0B]/20 text-[#F59E0B] bg-[#F59E0B]/10' : 'border-[#10B981]/20 text-[#10B981] bg-[#10B981]/10'}`}>
                        {threat.classification === 'Malicious' ? 'Investigating' : 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button onClick={() => toast.info(`Viewing details for ${threat.id}...`)} className="text-xs font-semibold text-accent-blue hover:text-white transition-colors">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
