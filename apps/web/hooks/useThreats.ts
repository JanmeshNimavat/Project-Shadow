import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

interface ThreatState {
  threats: ThreatRecord[];
  addThreat: (threat: Omit<ThreatRecord, 'id' | 'timestamp'>) => ThreatRecord;
  clearThreats: () => void;
  simulateAttack: () => void;
}

export const useThreats = create<ThreatState>()(
  persist(
    (set) => ({
      threats: [],
      
      addThreat: (threat) => {
        const newThreat: ThreatRecord = {
          ...threat,
          id: `SW-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          timestamp: new Date().toISOString()
        };
        
        set((state) => ({ threats: [newThreat, ...state.threats] }));
        return newThreat;
      },
      
      clearThreats: () => set({ threats: [] }),
      
      simulateAttack: () => {
        const mockThreats: Omit<ThreatRecord, 'id' | 'timestamp'>[] = [
          {
            type: "Network Traffic",
            classification: "Malicious",
            confidenceScore: 98,
            threatType: "Ransomware Lateral Movement",
            analysis: "Detected anomalous SMB traffic patterns consistent with WannaCry or similar ransomware variants attempting to spread to adjacent subnets. Multiple failed authentication attempts followed by rapid connection requests.",
            indicators: ["445/tcp", "192.168.1.55", "192.168.1.0/24"],
            recommendation: "Immediately isolate host 192.168.1.55 from the network. Block port 445 on internal firewalls."
          },
          {
            type: "System Logs",
            classification: "Suspicious",
            confidenceScore: 88,
            threatType: "Privilege Escalation",
            analysis: "Process injection detected in lsass.exe. A previously unknown process (svchost_update.exe) attempted to read memory from the Local Security Authority Subsystem Service.",
            indicators: ["lsass.exe", "svchost_update.exe", "EventID: 10"],
            recommendation: "Run a full EDR scan on the affected endpoint. Disable the compromised user account."
          },
          {
            type: "Web Link / Email",
            classification: "Malicious",
            confidenceScore: 99,
            threatType: "Spear Phishing",
            analysis: "Email originating from a newly registered domain (microsoft-secure-login.net) mimicking internal IT communications. Contains a malicious payload disguised as a PDF invoice.",
            indicators: ["microsoft-secure-login.net", "invoice_Q3.pdf", "sha256: 8a9...f42"],
            recommendation: "Purge email from all corporate inboxes. Block the sender domain."
          }
        ];

        const newThreats = mockThreats.map(t => ({
          ...t,
          id: `SW-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          timestamp: new Date().toISOString()
        }));

        set((state) => ({ threats: [...newThreats, ...state.threats] }));
      }
    }),
    {
      name: 'aegis_threats',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
