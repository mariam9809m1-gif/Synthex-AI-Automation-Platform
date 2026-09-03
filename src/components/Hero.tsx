import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Search, 
  Send,
  Play
} from 'lucide-react';
import { ViewMode } from '../types';
import { logger } from '../utils/logger';

interface HeroProps {
  onNavigate: (view: ViewMode) => void;
  onOpenLeadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const heroSteps = [
    { name: 'Lead Ingested', icon: Zap, latency: '34ms', status: 'verified' },
    { name: 'Headless Scraped', icon: Search, latency: '184ms', status: 'enriched' },
    { name: 'Gemini AI Reasoned', icon: Cpu, latency: '210ms', status: 'scored' },
    { name: 'Omni-Action Dispatched', icon: Send, latency: '92ms', status: 'delivered' }
  ];

  const handleTriggerInteractiveRun = () => {
    logger.stateUpdate('Hero', 'Triggered hero workflow simulation');
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 4) {
        setActiveStepIndex(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveStepIndex(0);
        }, 1200);
      }
    }, 600);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-zinc-800/60 bg-zinc-950">
      {/* Background architectural grid & subtle glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),rgba(9,9,11,0))]"></div>
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top telemetry status pill */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-cyan-300">
              NEXT-GEN AUTONOMOUS ENTERPRISE INFRASTRUCTURE
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              n8n &amp; Make Native
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Autonomous</span> Enterprise Intelligence
          </h1>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We build high-throughput AI analytics pipelines, self-healing n8n and Make.com webhook clusters, and autonomous multi-agent systems designed for mission-critical operations.
          </p>
        </motion.div>

        {/* Action Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate('portal')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-[0.98]"
          >
            <span>Launch Client Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onNavigate('webhooks')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
          >
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span>Webhook Architecture (n8n/Make)</span>
          </button>
        </motion.div>

        {/* Live Interactive Workflow Stepper Preview (Visualizing Lead Generated -> Scraped -> AI Analyzed -> Email Sent) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-7 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-3 w-3 items-center justify-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                pipeline_id: <span className="text-cyan-400">synthex_inbound_autonomous_core</span>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500">AVG LATENCY:</span>
                <span className="text-emerald-400 font-semibold">520ms Total</span>
              </div>

              <button
                onClick={handleTriggerInteractiveRun}
                disabled={isSimulating}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono font-semibold transition-all ${
                  isSimulating 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                }`}
              >
                <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
                <span>{isSimulating ? 'SIMULATING EXECUTION...' : 'SIMULATE LIVE RUN'}</span>
              </button>
            </div>
          </div>

          {/* Stepper Grid: Lead Generated -> Scraped -> AI Analyzed -> Email Sent */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;

              return (
                <div
                  key={step.name}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-cyan-500 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/50'
                      : isPassed
                      ? 'border-zinc-800 bg-zinc-950/60 text-zinc-400'
                      : 'border-zinc-800/80 bg-zinc-950/40 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isActive 
                        ? 'border-cyan-400 bg-cyan-900/60 text-cyan-300' 
                        : isPassed 
                        ? 'border-emerald-700/60 bg-emerald-950/40 text-emerald-400' 
                        : 'border-zinc-800 bg-zinc-900 text-zinc-500'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-1.5">
                      <h4 className={`text-sm font-semibold ${isActive ? 'text-cyan-200' : 'text-zinc-200'}`}>
                        {step.name}
                      </h4>
                      {isPassed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <div className="mt-1 flex items-center justify-between font-mono text-xs">
                      <span className="text-zinc-500">Latency:</span>
                      <span className={isActive ? 'text-cyan-400 font-semibold' : 'text-zinc-400'}>
                        {step.latency}
                      </span>
                    </div>
                  </div>

                  {/* Visual progression indicator bar */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isActive ? 'w-full bg-cyan-400 animate-pulse' : isPassed ? 'w-full bg-emerald-500' : 'w-0'
                      }`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick telemetry stats row */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-800/70 pt-5 sm:grid-cols-4 font-mono">
            <div>
              <span className="text-[11px] text-zinc-500">DAILY AUTONOMOUS RUNS</span>
              <p className="mt-0.5 text-lg font-bold text-zinc-100">326,350+</p>
            </div>
            <div>
              <span className="text-[11px] text-zinc-500">AVERAGE WEBHOOK LATENCY</span>
              <p className="mt-0.5 text-lg font-bold text-cyan-400">94ms P95</p>
            </div>
            <div>
              <span className="text-[11px] text-zinc-500">FAILOVER RETRY SLA</span>
              <p className="mt-0.5 text-lg font-bold text-emerald-400">99.98% Zero-Loss</p>
            </div>
            <div>
              <span className="text-[11px] text-zinc-500">SECURITY PROTOCOL</span>
              <p className="mt-0.5 text-lg font-bold text-zinc-100">HMAC-SHA256 / SOC2</p>
            </div>
          </div>
        </motion.div>

        {/* Enterprise trust badges */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            ENGINEERED TO INTEGRATE SEAMLESSLY WITH PRODUCTION ECOSYSTEMS
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-sm font-mono text-zinc-400">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span> n8n Cloud &amp; Self-Hosted
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span> Make.com Enterprise
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="h-2 w-2 rounded-full bg-blue-400"></span> FormSubmit Secure Gateway
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Google Gemini 1.5 Models
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span> Zapier &amp; Custom Webhooks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
