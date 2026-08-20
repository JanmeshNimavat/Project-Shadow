"use client";

import { useState } from 'react';
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useThreats } from '../hooks/useThreats';
import { toast } from 'sonner';

export function Topnav() {
  const { userId } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const { threats } = useThreats();
  
  const recentAlerts = threats.slice(0, 5);

  const handleExport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating SOC compliance report...',
        success: 'Report exported to secure cold storage.',
        error: 'Failed to generate report.',
      }
    );
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toast.info(`Searching database for: ${e.currentTarget.value}`, {
        description: 'Initiating deep database query across all records.'
      });
      e.currentTarget.value = '';
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-transparent z-50 relative border-b border-border/30">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden sm:block">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search cases... (Press Enter)" 
            onKeyDown={handleSearch}
            className="w-full bg-primary-800/50 border border-border/50 text-sm text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent-blue/50 focus:border-accent-blue/50 transition-all placeholder:text-gray-500 shadow-sm font-mono"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-gray-400 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {recentAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full animate-pulse shadow-[0_0_8px_rgba(239,83,80,0.8)]"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-primary-800 border border-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="px-4 py-2 border-b border-border">
                <h3 className="text-sm font-semibold text-white">System Alerts</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {recentAlerts.length === 0 ? (
                  <div className="px-4 py-4 text-center text-sm text-gray-500">
                    No new alerts
                  </div>
                ) : (
                  recentAlerts.map(alert => (
                    <div key={alert.id} className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-border/50 last:border-0" onClick={() => {
                        toast.info(`Investigating Alert: ${alert.id}`);
                        setShowNotifications(false);
                    }}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          alert.classification === 'Malicious' ? 'bg-[#EF5350]' :
                          alert.classification === 'Suspicious' ? 'bg-[#F59E0B]' :
                          'bg-[#10B981]'
                        }`}></div>
                        <div>
                          <p className="text-sm text-white font-medium">{alert.threatType}</p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{alert.analysis}</p>
                          <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono">
                            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <button onClick={handleExport} className="bg-primary-800 hover:bg-primary-700 text-white text-xs font-bold px-4 py-2 rounded-md border border-border/50 transition-colors shadow-sm tracking-wider uppercase">
          Export Log
        </button>
        <div className="pl-2 border-l border-border/50 flex items-center">
          {userId ? (
            <UserButton />
          ) : (
            <Link 
              href="/sign-in" 
              className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
