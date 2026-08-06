"use client";

import { useThreats } from '../hooks/useThreats';
import { useMemo } from 'react';

export default function Dashboard() {
  const { threats } = useThreats();

  const metrics = useMemo(() => {
    return {
      total: threats.length,
      critical: threats.filter(t => t.classification === 'Malicious').length,
      avgConfidence: threats.length ? Math.round(threats.reduce((acc, t) => acc + t.confidenceScore, 0) / threats.length) : 0
    };
  }, [threats]);

  const getBadgeStyle = (classification: string) => {
    if (classification === 'Malicious') return 'bg-accent-red/10 text-accent-red border-accent-red/20';
    if (classification === 'Suspicious') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    return 'bg-accent-green/10 text-accent-green border-accent-green/20';
  };

  const getTimelineDotStyle = (classification: string) => {
    if (classification === 'Malicious') return 'bg-accent-red';
    if (classification === 'Suspicious') return 'bg-yellow-500';
    return 'bg-accent-green';
  };

  const getTimelineTextStyle = (classification: string) => {
    if (classification === 'Malicious') return 'text-accent-red';
    if (classification === 'Suspicious') return 'text-yellow-500';
    return 'text-accent-green';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Command Center</h1>
          <p className="text-gray-400 text-sm">Welcome back, Agent 47. Here is your situational overview.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            System Nominal
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-border/80 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent-blue/10 transition-colors">
              <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-accent-green text-sm font-medium flex items-center gap-1 bg-accent-green/10 px-2 py-0.5 rounded">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Live
            </span>
          </div>
          <h3 className="text-gray-400 font-medium text-sm">Analyzed Threats</h3>
          <p className="text-3xl font-display font-bold text-white mt-1">{metrics.total}</p>
        </div>

        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-border/80 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/10 blur-[50px] rounded-full"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent-red/10 transition-colors">
              <svg className="w-6 h-6 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 font-medium text-sm relative z-10">Critical Malicious Alerts</h3>
          <p className="text-3xl font-display font-bold text-white mt-1 relative z-10">{metrics.critical}</p>
        </div>

        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-border/80 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent-purple/10 transition-colors">
              <svg className="w-6 h-6 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 font-medium text-sm">Avg. AI Confidence Score</h3>
          <p className="text-3xl font-display font-bold text-white mt-1">{metrics.avgConfidence}%</p>
          <div className="w-full bg-primary-900 rounded-full h-1.5 mt-4">
            <div className="bg-gradient-to-r from-accent-blue to-accent-purple h-1.5 rounded-full" style={{ width: `${metrics.avgConfidence}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Investigations</h2>
            <button className="text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors">View All</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-900/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Case ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-border">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.slice(0, 5).map((threat) => (
                  <tr key={threat.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{threat.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.threatType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={"px-2.5 py-1 rounded-full text-xs font-medium border " + getBadgeStyle(threat.classification)}>
                        {threat.classification}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(threat.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                  </tr>
                ))}
                {threats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">No recent investigations found. Analyze a threat to populate.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Intelligence Feed
            </h2>
          </div>
          <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[400px]">
            {threats.slice(0, 4).map((threat, idx) => (
              <div key={threat.id} className="flex gap-4">
                <div className="relative">
                  <div className={"w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_rgba(255,255,255,0.4)] " + getTimelineDotStyle(threat.classification)}></div>
                  {idx !== threats.slice(0,4).length - 1 && <div className="absolute top-3.5 bottom-[-24px] left-[3px] w-px bg-border"></div>}
                </div>
                <div>
                  <p className={"text-xs font-semibold uppercase tracking-wider mb-1 " + getTimelineTextStyle(threat.classification)}>
                    {new Date(threat.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • SENTINEL AI
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{threat.analysis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
