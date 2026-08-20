"use client";

import { useThreats } from '../../hooks/useThreats';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Dashboard() {
  const { threats, simulateAttack } = useThreats();

  const metrics = useMemo(() => {
    return {
      total: threats.length,
      critical: threats.filter(t => t.classification === 'Malicious').length,
      avgConfidence: threats.length ? Math.round(threats.reduce((acc, t) => acc + t.confidenceScore, 0) / threats.length) : 0,
      activeCases: threats.filter(t => t.classification === 'Malicious' || t.classification === 'Suspicious').length
    };
  }, [threats]);

  const trendData = useMemo(() => {
    // Generate last 7 days
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayString = d.toISOString().split('T')[0];
      
      // Count threats for this day
      const alerts = threats.filter(t => t.timestamp.startsWith(dayString || '')).length;
      data.push({ name: dayName, alerts });
    }
    return data;
  }, [threats]);

  const pieData = useMemo(() => {
    if (threats.length === 0) return []; // Empty if no threats
    return [
      { name: 'Malicious', value: threats.filter(t => t.classification === 'Malicious').length },
      { name: 'Suspicious', value: threats.filter(t => t.classification === 'Suspicious').length },
      { name: 'Benign', value: threats.filter(t => t.classification === 'Benign').length },
    ].filter(item => item.value > 0);
  }, [threats]);
  
  const COLORS = ['#EF5350', '#F59E0B', '#10B981'];

  const getBadgeStyle = (classification: string) => {
    if (classification === 'Malicious') return 'bg-[#EF5350]/10 text-[#EF5350] border-[#EF5350]/20';
    if (classification === 'Suspicious') return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-border/50 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">SOC Dashboard</h1>
          <p className="text-gray-400 text-sm">Security Operations Center - Global Threat Overview</p>
        </div>
        <div className="flex gap-3">
          <button onClick={simulateAttack} className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#EF5350] hover:bg-[#EF5350]/90 text-white text-xs font-bold transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Simulate Attack Vector
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="bg-primary-800/50 rounded-lg p-5 border border-border flex flex-col justify-between">
          <h3 className="text-gray-400 font-medium text-xs uppercase tracking-wider">Total Alerts (24h)</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{metrics.total}</p>
            <span className="text-xs text-[#10B981]">+12%</span>
          </div>
        </div>

        <div className="bg-primary-800/50 rounded-lg p-5 border border-border flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1 h-full bg-[#EF5350]"></div>
          <h3 className="text-gray-400 font-medium text-xs uppercase tracking-wider">Critical Escalations</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-[#EF5350]">{metrics.critical}</p>
          </div>
        </div>

        <div className="bg-primary-800/50 rounded-lg p-5 border border-border flex flex-col justify-between">
          <h3 className="text-gray-400 font-medium text-xs uppercase tracking-wider">Avg. ATI Confidence</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{metrics.avgConfidence}%</p>
          </div>
          <div className="w-full bg-primary-900 rounded-full h-1 mt-3">
            <div className="bg-accent-blue h-1 rounded-full" style={{ width: `${metrics.avgConfidence}%` }}></div>
          </div>
        </div>
        
        <div className="bg-primary-800/50 rounded-lg p-5 border border-border flex flex-col justify-between">
           <h3 className="text-gray-400 font-medium text-xs uppercase tracking-wider">Active Investigations</h3>
           <div className="mt-2 flex items-baseline gap-2">
             <p className="text-3xl font-bold text-white">{metrics.activeCases}</p>
             <span className="text-xs text-[#F59E0B]">Pending Review</span>
           </div>
           <div className="w-full bg-primary-900 rounded-full h-1 mt-3">
             <div className="bg-[#F59E0B] h-1 rounded-full" style={{ width: metrics.total > 0 ? `${(metrics.activeCases / metrics.total) * 100}%` : '0%' }}></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Charts */}
        <div className="lg:col-span-2 bg-primary-800/50 rounded-lg border border-border p-5">
          <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Threat Volume (7 Days)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
                <XAxis dataKey="name" stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A202C', borderColor: '#2D3748', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="alerts" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-primary-800/50 rounded-lg border border-border p-5">
          <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Risk Distribution</h2>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: '#2D3748', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="block text-2xl font-bold text-white">{metrics.total}</span>
              <span className="block text-xs text-gray-400">Alerts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-primary-800/50 rounded-lg border border-border flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-primary-900/30">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Recent Incidents</h2>
            <Link href="/cases" className="text-xs font-medium text-gray-400 hover:text-white transition-colors border border-border px-3 py-1.5 rounded bg-primary-800">
              View All Log Data
            </Link>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-900/80">
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-border">Incident ID</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-border">Vector</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-border">Severity</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-border">Timestamp (UTC)</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-border">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.slice(0, 5).map((threat) => (
                  <tr key={threat.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-300">{threat.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300">{threat.threatType}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={"px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider " + getBadgeStyle(threat.classification)}>
                        {threat.classification}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400 font-mono">
                      {new Date(threat.timestamp).toISOString().replace('T', ' ').substring(0, 19)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button onClick={() => toast.success('Investigation case opened and assigned to your ID.')} className="text-[10px] text-accent-blue hover:underline">Investigate</button>
                    </td>
                  </tr>
                ))}
                {threats.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-xs">No incidents in the current retention window.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
