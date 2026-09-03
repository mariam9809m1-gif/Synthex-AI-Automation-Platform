import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Terminal, 
  Copy, 
  Check, 
  Zap, 
  Search, 
  Cpu, 
  Send, 
  ShieldAlert,
  Settings,
  ChevronRight,
  Database,
  ArrowRight
} from 'lucide-react';
import { AutomationPipeline, WorkflowStep } from '../../types';
import { logger } from '../../utils/logger';

interface WorkflowVisualizerProps {
  pipeline: AutomationPipeline;
  onUpdatePipeline?: (updated: AutomationPipeline) => void;
  onOpenWebhookTester?: () => void;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ 
  pipeline,
  onOpenWebhookTester 
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'input' | 'output' | 'logs' | 'config'>('output');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentStep = pipeline.steps[activeStepIndex] || pipeline.steps[0];

  const handleSimulateExecution = () => {
    logger.stateUpdate('PortalVisualizer', `Starting live simulation for ${pipeline.title}`);
    setIsSimulating(true);
    setSimulationProgress(0);
    setActiveStepIndex(0);

    let current = 0;
    const total = pipeline.steps.length;

    const interval = setInterval(() => {
      current++;
      if (current < total) {
        setActiveStepIndex(current);
        setSimulationProgress(Math.round(((current + 1) / total) * 100));
        logger.stateUpdate('PortalVisualizer', `Step reached: ${pipeline.steps[current].name}`);
      } else {
        clearInterval(interval);
        setSimulationProgress(100);
        setTimeout(() => {
          setIsSimulating(false);
          logger.stateUpdate('PortalVisualizer', 'Simulation completed successfully');
        }, 600);
      }
    }, 800);
  };

  const handleCopy = (content: unknown, key: string) => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
    logger.stateUpdate('PortalVisualizer', `Copied ${key} JSON to clipboard`);
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Search': return Search;
      case 'Cpu': return Cpu;
      case 'Send': return Send;
      case 'ShieldAlert': return ShieldAlert;
      default: return Database;
    }
  };

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-bold text-white font-mono">
              {pipeline.title}
            </h3>
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-300 border border-zinc-700">
              {pipeline.targetPlatform} Orchestration
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
            {pipeline.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateExecution}
            disabled={isSimulating}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono font-bold transition-all ${
              isSimulating
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                <span>STEP 0{activeStepIndex + 1} RUNNING...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>SIMULATE LIVE PIPELINE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Workflow Steps (Lead Generated -> Scraped -> AI Analyzed -> Email Sent) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span>PIPELINE EXECUTION GRAPH</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">Click any node to inspect payload state</span>
          </div>
          <div className="font-mono text-xs text-zinc-500">
            Progress: <span className="text-emerald-400 font-semibold">{simulationProgress}%</span>
          </div>
        </div>

        {/* Node Graph Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {pipeline.steps.map((step, idx) => {
            const Icon = getStepIcon(step.iconName);
            const isSelected = activeStepIndex === idx;
            const isRunning = isSimulating && activeStepIndex === idx;
            const isFinished = !isSimulating || activeStepIndex > idx;

            return (
              <div
                key={step.id}
                onClick={() => {
                  setActiveStepIndex(idx);
                  logger.stateUpdate('PortalVisualizer', `Inspecting step ${step.name}`);
                }}
                className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-500 bg-zinc-900 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50'
                    : isRunning
                    ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400/50'
                    : 'border-zinc-800/90 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950 text-cyan-300'
                      : isRunning
                      ? 'border-amber-400 bg-amber-950 text-amber-300 animate-spin'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-300'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-zinc-500">#0{idx + 1}</span>
                    {isFinished && (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {step.name}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-2.5 font-mono text-xs">
                  <span className="text-zinc-500">Latency:</span>
                  <span className="text-emerald-400 font-semibold">{step.latencyMs}ms</span>
                </div>

                {/* Desktop connecting arrow */}
                {idx < pipeline.steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Payload & Configuration Inspector Drawer */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Node Metadata Column */}
          <div className="lg:w-1/3 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-xs text-cyan-400 border border-cyan-800 font-semibold">
                  NODE 0{activeStepIndex + 1} STATE
                </span>
                <span className="rounded bg-emerald-950/70 px-2 py-0.5 font-mono text-xs text-emerald-400 border border-emerald-800/60 font-semibold">
                  200 OK
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-white">
                {currentStep.name}
              </h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs space-y-2.5">
              <div className="flex justify-between text-zinc-400">
                <span>Step Identifier:</span>
                <span className="text-zinc-200">{currentStep.id}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Step Type:</span>
                <span className="text-cyan-400 uppercase font-semibold">{currentStep.type}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Round-Trip Latency:</span>
                <span className="text-emerald-400">{currentStep.latencyMs}ms</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Retry Policy:</span>
                <span className="text-zinc-200">Exponential (3 retries)</span>
              </div>
            </div>

            {onOpenWebhookTester && (
              <button
                onClick={onOpenWebhookTester}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-mono text-cyan-300 border border-zinc-700 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Test Webhook Payload in Simulator</span>
              </button>
            )}
          </div>

          {/* Interactive Payload Terminal */}
          <div className="lg:w-2/3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
            {/* Terminal Header & Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('output')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === 'output'
                      ? 'bg-zinc-800 text-cyan-300 border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Output Payload
                </button>
                <button
                  onClick={() => setActiveTab('input')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === 'input'
                      ? 'bg-zinc-800 text-emerald-300 border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Input Payload
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === 'logs'
                      ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Node Trace Logs ({currentStep.logs.length})
                </button>
              </div>

              <button
                onClick={() => handleCopy(activeTab === 'input' ? currentStep.inputPayload : currentStep.outputPayload, activeTab)}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                {copiedText === activeTab ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="text-[11px]">Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <div className="mt-3 max-h-72 overflow-y-auto font-mono text-xs leading-relaxed scrollbar-thin">
              {activeTab === 'output' && (
                <pre className="text-cyan-300/90 whitespace-pre-wrap">
                  {JSON.stringify(currentStep.outputPayload, null, 2)}
                </pre>
              )}

              {activeTab === 'input' && (
                <pre className="text-emerald-300/90 whitespace-pre-wrap">
                  {JSON.stringify(currentStep.inputPayload, null, 2)}
                </pre>
              )}

              {activeTab === 'logs' && (
                <div className="space-y-2 text-zinc-300">
                  {currentStep.logs.map((log, lIdx) => (
                    <div key={`log-${lIdx}`} className="flex items-start gap-2.5">
                      <span className="text-zinc-600 select-none">[{lIdx + 1}]</span>
                      <span className="text-zinc-400">{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
