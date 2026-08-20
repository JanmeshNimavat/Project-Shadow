"use client";

import { useState } from 'react';
import { useThreats } from '../../../hooks/useThreats';

type ThreatReport = {
  classification: "Benign" | "Suspicious" | "Malicious";
  confidenceScore: number;
  threatType: string;
  analysis: string;
  indicators: string[];
  recommendation: string;
};

export default function AnalyzerPage() {
  const { addThreat } = useThreats();
  const [artifactType, setArtifactType] = useState('Web Link / Email');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ThreatReport | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    setError('');
    setReport(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artifactType, content })
      });

      if (!res.ok) throw new Error('Failed to analyze threat. Please try again.');
      
      const data = await res.json();
      setReport(data);
      addThreat({
        type: artifactType,
        ...data
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white flex items-center gap-3">
          <svg className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          AI Threat Analyzer
        </h1>
        <p className="text-gray-400">Powered by NVIDIA NIM (GLM-5.2) to instantly detect and analyze cyber threats.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Input Artifact</h2>
          
          <div className="flex flex-wrap gap-2">
            {['Web Link / Email', 'Network Traffic', 'System Logs', 'Suspicious File', 'Database Query', 'Other / Raw Text'].map(type => (
              <button
                key={type}
                onClick={() => setArtifactType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  artifactType === type 
                    ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/50' 
                    : 'bg-primary-900 text-gray-400 border border-border hover:bg-white/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={artifactType === 'Other / Raw Text' ? "Paste any text, log, code, or data from any source here..." : `Paste suspicious ${artifactType} here...`}
              className="w-full h-64 bg-primary-900/50 border border-border rounded-xl p-4 pb-12 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 font-mono text-sm resize-none"
            />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-800 hover:bg-white/10 border border-border rounded-lg text-xs font-medium text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Attach File
              </button>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setContent(`[Attached File: ${file.name} - ${Math.round(file.size / 1024)}KB]\n` + content);
                  }
                }}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !content.trim()}
            className="w-full bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-blue/80 hover:to-accent-purple/80 text-white font-semibold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Threat...
              </>
            ) : 'Analyze Artifact'}
          </button>

          {error && <p className="text-accent-red text-sm mt-2">{error}</p>}
        </div>

        {/* Output Section */}
        <div className="bg-primary-800/80 backdrop-blur-md rounded-2xl border border-border shadow-lg p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Analysis Report</h2>
          
          {!report && !isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
              <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Submit an artifact to view the AI analysis.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-accent-purple/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-accent-purple font-medium animate-pulse">Running Neural Diagnostics...</p>
            </div>
          )}

          {report && !isAnalyzing && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              {/* Score Header */}
              <div className="flex items-center justify-between p-4 bg-primary-900/50 rounded-xl border border-border">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Classification</p>
                  <span className={"px-3 py-1 rounded-full text-sm font-bold " + 
                    (report.classification === 'Malicious' ? 'bg-accent-red/20 text-accent-red border border-accent-red/50' :
                     report.classification === 'Suspicious' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                     'bg-accent-green/20 text-accent-green border border-accent-green/50')
                  }>
                    {report.classification}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Confidence Score</p>
                  <p className="text-3xl font-display font-bold text-white">{report.confidenceScore}%</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Identified Threat Type</h3>
                  <p className="text-white font-medium">{report.threatType}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Detailed Analysis</h3>
                  <p className="text-gray-300 leading-relaxed bg-primary-900/30 p-3 rounded-lg border border-border/50">{report.analysis}</p>
                </div>

                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Extracted Indicators (IOCs)</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.indicators.length > 0 && report.indicators[0] !== "None" ? (
                      report.indicators.map((ioc, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 border border-border rounded text-accent-blue font-mono text-xs">{ioc}</span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">No IOCs detected.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Remediation Recommendation</h3>
                  <div className="p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-accent-blue/90">
                    <svg className="w-4 h-4 inline mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {report.recommendation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
