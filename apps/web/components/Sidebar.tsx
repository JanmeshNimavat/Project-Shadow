import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export function Sidebar() {
  return (
    <div className="w-64 bg-primary-800 border-r border-border/50 flex flex-col h-full shrink-0 shadow-2xl relative z-20">
      <div className="p-6">
        <h1 className="text-xl font-display font-extrabold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          ShadowWatch
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Workspace</p>
        
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </Link>
        <Link href="/analyzer" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          AI Analyzer
        </Link>
        <Link href="/cases" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Investigations
        </Link>
        <Link href="/evidence" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Evidence Vault
        </Link>
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors justify-between">
          <div className="flex items-center gap-3">
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 rounded-full shadow-inner",
                userButtonPopoverCard: "bg-primary-800 border-border shadow-2xl",
                userButtonPopoverActionButton: "hover:bg-white/5 text-gray-300",
                userButtonPopoverActionButtonText: "text-gray-300",
                userPreviewSecondaryIdentifier: "text-gray-400",
                userPreviewMainIdentifier: "text-white font-medium"
              }
            }} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Agent Profile</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Cyber Division</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
