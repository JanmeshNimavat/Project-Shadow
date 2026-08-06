"use client";

import { useState, useEffect } from 'react';

export type ThreatRecord = {
  id: string;
  type: string;
  classification: "Benign" | "Suspicious" | "Malicious";
  confidenceScore: number;
  threatType: string;
  analysis: string;
  indicators: string[];
  recommendation: string;
  timestamp: string;
};

const SEED_DATA: ThreatRecord[] = [
  {
    id: "SW-2026-04291",
    type: "URL/Email",
    classification: "Malicious",
    confidenceScore: 98,
    threatType: "Phishing / Credential Harvesting",
    analysis: "The provided email contains a malicious link masquerading as a Microsoft 365 password reset portal. The sender domain 'micros0ft-support.com' is a known typosquatting domain.",
    indicators: ["micros0ft-support.com", "192.168.1.100"],
    recommendation: "Block the domain on the email gateway. Force a password reset for the targeted user.",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString()
  },
  {
    id: "SW-2026-04290",
    type: "SQL Query",
    classification: "Suspicious",
    confidenceScore: 85,
    threatType: "SQL Injection (Blind)",
    analysis: "The input contains a classic boolean-based blind SQL injection payload (' OR 1=1 --). While the WAF blocked it, this indicates an active reconnaissance attempt.",
    indicators: ["' OR 1=1 --", "10.0.0.55"],
    recommendation: "Ensure parameterized queries are used in the authentication module. Rate limit the offending IP.",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString()
  }
];

export function useThreats() {
  const [threats, setThreats] = useState<ThreatRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('shadowwatch_threats');
    if (saved) {
      setThreats(JSON.parse(saved));
    } else {
      localStorage.setItem('shadowwatch_threats', JSON.stringify(SEED_DATA));
      setThreats(SEED_DATA);
    }
  }, []);

  const addThreat = (threat: Omit<ThreatRecord, 'id' | 'timestamp'>) => {
    const newThreat: ThreatRecord = {
      ...threat,
      id: `SW-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      timestamp: new Date().toISOString()
    };
    
    const updated = [newThreat, ...threats];
    setThreats(updated);
    localStorage.setItem('shadowwatch_threats', JSON.stringify(updated));
    return newThreat;
  };

  const clearThreats = () => {
    localStorage.setItem('shadowwatch_threats', JSON.stringify(SEED_DATA));
    setThreats(SEED_DATA);
  };

  return { threats, addThreat, clearThreats };
}
