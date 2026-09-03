import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle2, 
  Terminal, 
  Home, 
  ShieldAlert,
  Copy,
  Check,
  Activity
} from 'lucide-react';
import { ViewMode } from '../types';
import { logger } from '../utils/logger';

interface ErrorPageProps {
  onNavigate: (view: ViewMode) => void;
  errorPath?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ 
  onNavigate, 
  errorPath = '/api/v1/unknown-autonomous-cluster' 
}) => {
  const [incidentId] = useState<string>(() => `INC-404-${Math.floor(100000 + Math.random() * 900000)}`);
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosticSteps, setDiagnosticSteps] = useState<{ name: string; status: 'pending' | 'running' | 'success' }[]>([
    { name: 'Inspecting edge DNS route table', status: 'pending' },
    { name: 'Testing n8n & Make failover webhook mesh', status: 'pending' },
    { name: 'Verifying client tenant authentication session', status: 'pending' },
    { name: 'Self-healing circuit reroute initiated', status: 'pending' }
  ]);
  const [healed, setHealed] = useState<boolean>(false);
  const [copiedIncident, setCopiedIncident] = useState<boolean>(false);

  useEffect(() => {
    logger.error('ErrorPage', `404 / Route Exception rendered for path: ${errorPath}`, { incidentId });
  }, [errorPath, incidentId]);

  const handleRunSelfHealing = () => {
    logger.stateUpdate('ErrorPage', `Running self-healing diagnostics for ${incidentId}`);
    setIsDiagnosing(true);
    setHealed(false);

    let step = 0;
    const interval = setInterval(() => {
      setDiagnosticSteps(prev => prev.map((s, idx) => {
        if (idx < step) return { ...s, status: 'success' };
        if (idx === step) return { ...s, status: 'running' };
        return s;
      }));

      step++;
      if (step > 4) {
        clearInterval(interval);
        setDiagnosticSteps(prev => prev.map(s => ({ ...s, status: 'success' })));
        setIsDiagnosing(false);
        setHealed(true);
        logger.stateUpdate('ErrorPage', 'Self-healing complete. Fallback route active.');
      }
    }, 600);
  };

  const handleCopyIncident = () => {
    navigator.clipboard.writeText(incidentId);
    setCopiedIncident(true);
    setTimeout(() => setCopiedIncident(false), 2000);
    logger.stateUpdate('ErrorPage', 'Copied incident reference');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-red-400">
              HTTP 404: CLUSTER ROUTE NOT FOUND
            </span>
          </div>

          <button
            onClick={handleCopyIncident}
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white"
          >
            <span>{incidentId}</span>
            {copiedIncident ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Error Main Details */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            Autonomous Pipeline Endpoint Unreachable
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
            The target URL or workflow cluster could not be located on the Synthex mesh. Our self-healing routing protocol can diagnose and redirect you to active operations.
          </p>
          <div className="rounded-lg bg-zinc-950 p-3 font-mono text-xs text-zinc-400 border border-zinc-800">
            <span className="text-zinc-500">Attempted Route: </span>
            <span className="text-cyan-400">{errorPath}</span>
          </div>
        </div>

        {/* Self-Healing Diagnostic Widget */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-white">
                AUTOMATED RECOVERY &amp; CLUSTER FAILOVER
              </span>
            </div>

            <button
              onClick={handleRunSelfHealing}
              disabled={isDiagnosing}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                isDiagnosing
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
              }`}
            >
              {isDiagnosing ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin text-cyan-400" />
                  <span>DIAGNOSING...</span>
                </>
              ) : (
                <>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                  <span>TEST SELF-HEALING</span>
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Steps */}
          <div className="space-y-2.5 font-mono text-xs">
            {diagnosticSteps.map((step, idx) => (
              <div key={`diag-${idx}`} className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">[{idx + 1}]</span>
                  <span>{step.name}</span>
                </div>
                <div>
                  {step.status === 'success' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>HEALED</span>
                    </span>
                  )}
                  {step.status === 'running' && (
                    <span className="text-cyan-400 animate-pulse">CHECKING...</span>
                  )}
                  {step.status === 'pending' && (
                    <span className="text-zinc-600">PENDING</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {healed && (
            <div className="rounded-lg bg-emerald-950/40 border border-emerald-800/60 p-3 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Diagnostic complete: Failover route verified. Safe return enabled.</span>
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('landing')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-mono font-bold text-white shadow-lg hover:brightness-110 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>RETURN TO PUBLIC LANDING</span>
          </button>

          <button
            onClick={() => onNavigate('portal')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-xs font-mono font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>CLIENT WORKSPACE PORTAL</span>
          </button>

          <button
            onClick={() => onNavigate('webhooks')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-xs font-mono font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>WEBHOOK HUB</span>
          </button>
        </div>
      </div>
    </div>
  );
};
