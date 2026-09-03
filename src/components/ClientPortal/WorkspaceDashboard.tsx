import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  Workflow, 
  Zap, 
  Clock, 
  Server, 
  RefreshCw, 
  Filter, 
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AutomationPipeline, ExecutionLog } from '../../types';
import { INITIAL_PIPELINES, INITIAL_LOGS } from '../../data/mockWorkflows';
import { WorkflowVisualizer } from './WorkflowVisualizer';
import { WebhookHub } from './WebhookHub';
import { logger } from '../../utils/logger';

interface WorkspaceDashboardProps {
  onBackToLanding: () => void;
  onOpenWebhooksTab?: () => void;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({ 
  onBackToLanding 
}) => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'webhooks' | 'logs'>('workflows');
  const [pipelines, setPipelines] = useState<AutomationPipeline[]>(INITIAL_PIPELINES);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-lead-01');
  const [logs, setLogs] = useState<ExecutionLog[]>(INITIAL_LOGS);
  const [selectedTenant, setSelectedTenant] = useState<string>('Apex Global Enterprises (Production)');
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'info' | 'warn'>('all');

  const currentPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];

  const handleSelectPipeline = (id: string) => {
    logger.stateUpdate('Workspace', `Selected pipeline ${id}`);
    setSelectedPipelineId(id);
  };

  const filteredLogs = logs.filter(l => {
    if (logFilter === 'all') return true;
    return l.level === logFilter;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Workspace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Public Landing</span>
              </button>
              <span className="text-zinc-600">|</span>
              <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-800">
                CLIENT WORKSPACE PORTAL
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                Mission Control
              </h1>
              <select
                value={selectedTenant}
                onChange={(e) => {
                  setSelectedTenant(e.target.value);
                  logger.stateUpdate('Workspace', `Tenant switched to ${e.target.value}`);
                }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Apex Global Enterprises (Production)">Apex Global Enterprises (Production)</option>
                <option value="Vance Dynamics Corp (Staging)">Vance Dynamics Corp (Staging)</option>
                <option value="Nova Health Robotics (EU-West)">Nova Health Robotics (EU-West)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-400">SOC2 Node:</span>
              <span className="text-emerald-400 font-semibold">Healthy (Zero Drops)</span>
            </div>
          </div>
        </div>

        {/* Real-time KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="font-mono text-xs">ACTIVE PIPELINES</span>
              <Workflow className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">3 Live</p>
            <p className="mt-1 text-[11px] font-mono text-emerald-400">
              100% Autonomous Coverage
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="font-mono text-xs">24H EXECUTIONS</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">326,350</p>
            <p className="mt-1 text-[11px] font-mono text-cyan-400">
              +18.4% volume increase
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="font-mono text-xs">GUARANTEED SLA</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400 font-mono">99.78%</p>
            <p className="mt-1 text-[11px] font-mono text-zinc-400">
              0 dropped webhook events
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="font-mono text-xs">MEAN LATENCY (P95)</span>
              <Clock className="h-4 w-4 text-purple-400" />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">94ms</p>
            <p className="mt-1 text-[11px] font-mono text-emerald-400">
              Sub-100ms cluster SLA
            </p>
          </div>
        </div>

        {/* Navigation Tabs inside Portal */}
        <div className="flex border-b border-zinc-800 gap-4">
          <button
            onClick={() => {
              setActiveTab('workflows');
              logger.stateUpdate('WorkspaceTabs', 'Switched to Active Pipelines');
            }}
            className={`flex items-center gap-2 border-b-2 py-3 px-2 font-mono text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'workflows'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Workflow className="h-4 w-4" />
            <span>Active Pipelines &amp; Visual Flow</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('webhooks');
              logger.stateUpdate('WorkspaceTabs', 'Switched to Webhook Integration Hub');
            }}
            className={`flex items-center gap-2 border-b-2 py-3 px-2 font-mono text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'webhooks'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Webhook Integration Hub (n8n/Make)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('logs');
              logger.stateUpdate('WorkspaceTabs', 'Switched to Logs Stream');
            }}
            className={`flex items-center gap-2 border-b-2 py-3 px-2 font-mono text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'logs'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Real-time Telemetry &amp; Logs</span>
          </button>
        </div>

        {/* Tab 1: Workflows & Visualizer */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Pipeline Selector Pills */}
            <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-none">
              {pipelines.map((pipe) => {
                const isSelected = pipe.id === selectedPipelineId;
                return (
                  <button
                    key={pipe.id}
                    onClick={() => handleSelectPipeline(pipe.id)}
                    className={`whitespace-nowrap flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-mono font-medium transition-all ${
                      isSelected
                        ? 'bg-zinc-800 text-white border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.18)]'
                        : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-zinc-600'}`}></span>
                    <span>{pipe.title}</span>
                    <span className="rounded bg-zinc-950 px-2 py-0.5 text-[10px] text-zinc-400 border border-zinc-800">
                      {pipe.targetPlatform}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Workflow Node Representation Component */}
            <WorkflowVisualizer 
              pipeline={currentPipeline}
              onOpenWebhookTester={() => setActiveTab('webhooks')}
            />
          </div>
        )}

        {/* Tab 2: Webhook Hub */}
        {activeTab === 'webhooks' && (
          <WebhookHub />
        )}

        {/* Tab 3: Execution Telemetry & Logs */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Autonomous Execution Stream
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Live decentralized log buffer across all active n8n, Make, and FormSubmit nodes.
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  <span>Filter:</span>
                </span>
                {(['all', 'success', 'info', 'warn'] as const).map((filterVal) => (
                  <button
                    key={filterVal}
                    onClick={() => {
                      setLogFilter(filterVal);
                      logger.stateUpdate('LogsStream', `Filtered logs by ${filterVal}`);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs uppercase transition-colors ${
                      logFilter === filterVal
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {filterVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs Table */}
            <div className="space-y-3 font-mono text-xs">
              {filteredLogs.map((log) => {
                const isSuccess = log.level === 'success';
                const isWarn = log.level === 'warn';

                return (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950 p-3.5 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                        isSuccess 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' 
                          : isWarn 
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/60' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {log.level.substring(0, 3).toUpperCase()}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-200 font-semibold">{log.pipelineTitle}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-cyan-400">{log.stepName}</span>
                        </div>
                        <p className="mt-0.5 text-zinc-400 text-[11px]">{log.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] sm:text-right shrink-0">
                      <span className="text-zinc-500">{log.payloadSummary}</span>
                      <span className="text-zinc-400">{log.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
