"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError('AUTHENTICATION FAILED: INVALID CREDENTIALS');
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-primary-900 border border-border shadow-2xl p-8">
        <div className="mb-8 text-center border-b border-border pb-6">
          <h1 className="text-2xl font-mono font-bold tracking-widest text-white uppercase flex items-center justify-center gap-2">
            <span className="w-4 h-4 bg-accent-red rounded-none inline-block" />
            ShadowWatch
          </h1>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-mono">
            Restricted System Access
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/50 border border-accent-red text-accent-red text-xs font-mono uppercase text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Operator ID</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-primary-950 border border-border text-white px-4 py-3 font-mono focus:outline-none focus:border-accent-blue transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Passcode</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary-950 border border-border text-white px-4 py-3 font-mono focus:outline-none focus:border-accent-blue transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-accent-blue hover:bg-blue-700 text-white font-mono font-bold uppercase tracking-wider py-3 border border-transparent focus:outline-none transition-colors"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[10px] font-mono text-gray-500 uppercase leading-relaxed">
            WARNING: This is a restricted government system. Unauthorized access will be prosecuted to the fullest extent of the law. All activities are monitored and recorded.
          </p>
        </div>
      </div>
    </div>
  );
}
