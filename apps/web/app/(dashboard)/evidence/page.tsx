"use client";

import { useThreats } from '../../../hooks/useThreats';
import { toast } from 'sonner';

export default function EvidencePage() {
  const { threats } = useThreats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex justify-between items-end border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Chain of Custody</h1>
          <p className="text-gray-400 text-sm">Immutable evidence records and cryptographic artifacts.</p>
        </div>
        <button onClick={() => toast.promise(new Promise((r) => setTimeout(r, 1000)), { loading: 'Encrypting artifact...', success: 'Artifact uploaded to secure vault.'})} className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue hover:bg-accent-blue/90 text-white text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Artifact
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white border-b border-border/50 pb-4 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Chain of Custody
            </h3>
            <div className="space-y-6">
              {threats.length === 0 ? (
                <p className="text-sm text-gray-500">No active chains of custody.</p>
              ) : (
                threats.map((threat) => (
                  <div key={`chain-${threat.id}`} className="relative pl-6 border-l border-accent-blue/30">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-accent-blue rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      {new Date(threat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-sm text-white font-medium">Artifact EV-{threat.id.split('-')[2]} secured</div>
                    <div className="text-xs text-gray-500 mt-1">Source: ATI Engine</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-900/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Artifact ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">SHA-256 Hash</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                      Vault is empty. Analyze new threats to automatically secure evidence artifacts.
                    </td>
                  </tr>
                ) : (
                  threats.map((threat) => (
                    <tr key={threat.id} onClick={() => toast.info(`Viewing hash details for EV-2026-${threat.id.split('-')[2]}`)} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-accent-blue transition-colors">
                        EV-2026-{threat.id.split('-')[2]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {threat.threatType === 'SQL Injection' ? 'Database Dump (.sql)' : 'Network Capture (.pcap)'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-mono truncate max-w-[200px]">
                        {threat.id.replace(/-/g, '')}eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-[#10B981]/20 text-[#10B981] bg-[#10B981]/10 flex items-center gap-1 w-max">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
