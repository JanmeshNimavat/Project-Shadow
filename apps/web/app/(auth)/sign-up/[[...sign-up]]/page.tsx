import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">ShadowWatch</span>
        </div>
        
        <SignUp appearance={{
          elements: {
            formButtonPrimary: "bg-accent-blue hover:bg-accent-blue/80 text-sm normal-case",
            card: "bg-primary-800/80 backdrop-blur-xl border border-border shadow-2xl",
            headerTitle: "text-white font-display",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "text-gray-300 border-border hover:bg-white/5",
            dividerLine: "bg-border",
            dividerText: "text-gray-500",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-primary-900 border-border text-white focus:border-accent-blue",
            footerActionText: "text-gray-400",
            footerActionLink: "text-accent-blue hover:text-accent-blue/80"
          }
        }} />
      </div>
    </div>
  );
}
