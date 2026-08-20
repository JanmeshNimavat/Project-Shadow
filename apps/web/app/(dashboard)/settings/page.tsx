"use client";

import { toast } from 'sonner';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white flex items-center gap-3">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          System Config
        </h1>
        <p className="text-gray-400 text-sm">Manage your workspace preferences, privacy controls, and data retention policies.</p>
      </div>

      <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Tactical Display</h2>
          <div className="flex items-center justify-between p-4 bg-primary-900/50 rounded-xl border border-border/50">
            <div>
              <p className="font-medium text-white">Dark Mode (Enforced)</p>
              <p className="text-sm text-gray-400">Toggle the platform's color theme.</p>
            </div>
            <button className="w-12 h-6 bg-accent-blue rounded-full relative cursor-not-allowed opacity-80" onClick={() => toast.error('Security Override: Dark Mode is strictly enforced for tactical operations.')}>
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">Note: Aegis SOC Interface is permanently enforced in Dark Mode for maximum tactical visibility.</p>
        </div>

        <hr className="border-border" />

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Data Residency & Sync</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-primary-900/50 rounded-xl border border-border/50">
              <div>
                <p className="font-medium text-white">Local Secure Storage Mode</p>
                <p className="text-sm text-gray-400">Save investigation artifacts only to this terminal.</p>
              </div>
              <button className="w-12 h-6 bg-accent-green rounded-full relative" onClick={() => toast.success('Local Secure Storage policy updated.')}>
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary-900/50 rounded-xl border border-border/50 opacity-50">
              <div>
                <p className="font-medium text-white">Centralized Cloud Sync (Clearance Required)</p>
                <p className="text-sm text-gray-400">Sync cases and evidence with central SOC servers.</p>
              </div>
              <button className="w-12 h-6 bg-primary-700 rounded-full relative cursor-not-allowed" onClick={() => toast.error('Access Denied: Level 4 clearance required for Cloud Sync.')}>
                <span className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Data Destruction</h2>
          <div className="p-4 bg-accent-red/5 border border-accent-red/20 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-accent-red">Purge Local Cache</p>
              <p className="text-sm text-gray-400">Permanently wipe all locally saved investigations and threat telemetry.</p>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('aegis_threats');
                toast.success('Local cache purged. Terminating active sessions...');
                setTimeout(() => window.location.reload(), 1500);
              }}
              className="px-4 py-2 bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white transition-colors border border-accent-red/50 rounded-lg text-sm font-medium"
            >
              Initiate Purge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
