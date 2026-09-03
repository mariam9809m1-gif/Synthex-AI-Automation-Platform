import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Play, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  Search, 
  Cpu, 
  Send, 
  ShieldAlert,
  Sliders,
  ExternalLink,
  Code
} from 'lucide-react';
import { AutomationPipeline, WorkflowStep } from '../types';
import { INITIAL_PIPELINES } from '../data/mockWorkflows';
import { logger } from '../utils/logger';

interface PipelineShowcaseProps {
  onGoToPortal: () => void;
  onGoToWebhooks: () => void;
}

export const PipelineShowcase: React.FC<PipelineShowcaseProps> = ({ 
  onGoToPortal,
  onGoToWebhooks
}) => {
  const [pipelines] = useState<AutomationPipeline[]>(INITIAL_PIPELINES);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-lead-01');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'input_json' | 'output_json' | 'logs'>('visual');

  const currentPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];
  const currentStep: WorkflowStep = currentPipeline.steps[activeStepIndex] || currentPipeline.steps[0];

  const handleSelectPipeline = (id: string) => {
    logger.stateUpdate('PipelineShowcase', `Selected pipeline ${id}`);
    setSelectedPipelineId(id);
    setActiveStepIndex(0);
    setIsSimulating(false);
  };

  const handleRunSimulation = () => {
    logger.stateUpdate('PipelineShowcase', `Simulating run on ${currentPipeline.title}`);
    setIsSimulating(true);
    let stepIdx = 0;
    setActiveStepIndex(0);

    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < currentPipeline.steps.length) {
        setActiveStepIndex(stepIdx);
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsSimulating(false);
        }, 800);
      }
    }, 750);
  };

  const handleCopyJson = (content: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
    logger.stateUpdate('PipelineShowcase', 'Copied step JSON to clipboard');
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Search': return Search;
      case 'Cpu': return Cpu;
      case 'Send': return Send;
      case 'ShieldAlert': return ShieldAlert;
      default: return Sliders;
    }
  };

  return (
    <section id="pipelines-section" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-mono font-medium text-cyan-400">
              <span>VISUAL WORKFLOW ENGINE</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Active Enterprise Automation Pipelines
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-2xl">
              Inspect live step-by-step state representations, from inbound webhook trigger to AI reasoning and final action dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToPortal}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-700/60 bg-cyan-950/50 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition-colors"
            >
              <span>Open in Client Workspace</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Pipeline Selection Bar */}
        <div className="mt-8 flex overflow-x-auto pb-2 gap-2 border-b border-zinc-800 scrollbar-none">
          {pipelines.map((pipe) => {
            const isSelected = pipe.id === selectedPipelineId;
            return (
              <button
                key={pipe.id}
                onClick={() => handleSelectPipeline(pipe.id)}
                className={`whitespace-nowrap flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-zinc-800 text-white border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-zinc-600'}`}></span>
                <span>{pipe.title}</span>
                <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 border border-zinc-700/60">
                  {pipe.targetPlatform}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Visualizer Panel */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md overflow-hidden">
          {/* Top Panel Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-900/90 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-white">
                {currentPipeline.title}
              </span>
              <span className="hidden sm:inline font-mono text-xs text-zinc-500">•</span>
              <span className="hidden sm:inline text-xs text-zinc-400 font-sans">
                {currentPipeline.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                <span>Success: <strong className="text-emerald-400">{currentPipeline.successRate}%</strong></span>
                <span className="text-zinc-700">|</span>
                <span>Avg: <strong className="text-cyan-400">{currentPipeline.avgDurationMs}ms</strong></span>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all ${
                  isSimulating
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-600 animate-pulse'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                    <span>EXECUTING STEPS...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>SIMULATE LIVE RUN</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stepper Flow Nodes Visual Representation */}
          <div className="p-6 bg-zinc-950/70 border-b border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {currentPipeline.steps.map((step, idx) => {
                const IconComponent = getStepIcon(step.iconName);
                const isSelected = activeStepIndex === idx;
                const isCompleted = activeStepIndex > idx || (!isSimulating && activeStepIndex >= idx);
                const isRunning = isSimulating && activeStepIndex === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      logger.stateUpdate('PipelineVisualizer', `Step clicked: ${step.name}`);
                    }}
                    className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-500 bg-zinc-900 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/50'
                        : isRunning
                        ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/50 animate-pulse'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/60'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isSelected 
                          ? 'border-cyan-400 bg-cyan-950 text-cyan-300' 
                          : isRunning 
                          ? 'border-amber-400 bg-amber-950 text-amber-300' 
                          : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-semibold ${isSelected ? 'text-cyan-300' : 'text-zinc-200'}`}>
                          {step.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-2.5 font-mono text-[11px]">
                      <span className="text-zinc-500">Latency:</span>
                      <span className="text-emerald-400 font-semibold">{step.latencyMs}ms</span>
                    </div>

                    {/* Step progress connector line on desktop */}
                    {idx < currentPipeline.steps.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500">
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector Drawer for Selected Step */}
          <div className="p-6 bg-zinc-900/90">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Details */}
              <div className="lg:w-1/3 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-400 border border-cyan-800">
                      STEP 0{activeStepIndex + 1} INSPECTOR
                    </span>
                    <span className="rounded bg-emerald-950/60 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-400 border border-emerald-800/50">
                      STATUS: VERIFIED
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {currentStep.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Node Type:</span>
                    <span className="text-zinc-200 capitalize">{currentStep.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Target Engine:</span>
                    <span className="text-cyan-400">{currentPipeline.targetPlatform} Node</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Execution Latency:</span>
                    <span className="text-emerald-400">{currentStep.latencyMs} milliseconds</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Signature Verification:</span>
                    <span className="text-zinc-200">HMAC-SHA256 (Pass)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onGoToWebhooks}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-mono text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Send Custom Webhook Payload</span>
                  </button>
                </div>
              </div>

              {/* Right Payload / Code Inspector */}
              <div className="lg:w-2/3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
                {/* Tabs */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('visual')}
                      className={`rounded px-2.5 py-1 text-xs transition-colors ${
                        activeTab === 'visual' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Output Payload
                    </button>
                    <button
                      onClick={() => setActiveTab('input_json')}
                      className={`rounded px-2.5 py-1 text-xs transition-colors ${
                        activeTab === 'input_json' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Input Payload
                    </button>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className={`rounded px-2.5 py-1 text-xs transition-colors ${
                        activeTab === 'logs' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Execution Logs
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyJson(activeTab === 'input_json' ? currentStep.inputPayload : currentStep.outputPayload)}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedPayload ? (
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

                {/* Tab content viewer */}
                <div className="mt-3 max-h-56 overflow-y-auto font-mono text-[11px] leading-relaxed text-zinc-300 scrollbar-thin">
                  {activeTab === 'visual' && (
                    <pre className="text-cyan-300/90 whitespace-pre-wrap">
                      {JSON.stringify(currentStep.outputPayload, null, 2)}
                    </pre>
                  )}

                  {activeTab === 'input_json' && (
                    <pre className="text-emerald-300/90 whitespace-pre-wrap">
                      {JSON.stringify(currentStep.inputPayload, null, 2)}
                    </pre>
                  )}

                  {activeTab === 'logs' && (
                    <div className="space-y-1.5 text-zinc-300">
                      {currentStep.logs.map((log, lIdx) => (
                        <div key={`step-log-${lIdx}`} className="flex items-start gap-2">
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
      </div>
    </section>
  );
};
