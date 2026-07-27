export function Topnav() {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent z-10 relative">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search cases, threat actors, evidence..." 
            className="w-full bg-primary-800/50 border border-border/50 text-sm text-gray-200 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 transition-all placeholder:text-gray-500 backdrop-blur-md shadow-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full animate-pulse shadow-[0_0_8px_rgba(239,83,80,0.8)]"></span>
        </button>
        <button className="bg-primary-800 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg border border-border/50 transition-colors shadow-sm">
          Export Report
        </button>
      </div>
    </header>
  );
}
