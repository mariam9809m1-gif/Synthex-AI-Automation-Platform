import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Network, 
  Database, 
  Code2, 
  Layers,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { logger } from '../utils/logger';

export const Features: React.FC<{ onOpenLeadModal: () => void }> = ({ onOpenLeadModal }) => {
  const [activeCategory, setActiveCategory] = useState<'agents' | 'webhooks' | 'security' | 'observability'>('agents');

  const capabilities = [
    {
      icon: Cpu,
      title: 'Autonomous Multi-Agent Swarms',
      tag: 'Gemini Enterprise Reasoning',
      description: 'Specialized autonomous agents that reason over unstructured data, score intent, perform research crawls, and execute high-context outreach with zero human latency.',
      metric: '< 220ms Inference Latency'
    },
    {
      icon: Network,
      title: 'n8n & Make Cluster Integration',
      tag: 'Resilient Webhook Mesh',
      description: 'Engineered specifically to push and pull verified JSON payloads safely. Features automated dead-letter queues, exponential backoff, and idempotent event deduplication.',
      metric: '99.98% Guaranteed Delivery'
    },
    {
      icon: Lock,
      title: 'Zero-Trust Payload Cryptography',
      tag: 'HMAC-SHA256 & FormSubmit',
      description: 'Every webhook transmission is cryptographically hashed with rotating tenant keys. Inbound forms leverage advanced honeypot perimeter traps and FormSubmit proxy filters.',
      metric: 'SOC2 Type II & GDPR'
    },
    {
      icon: Database,
      title: 'Real-time ERP & CRM Synchronization',
      tag: 'Bidirectional Two-Way Mesh',
      description: 'Immediate synchronization across Salesforce, HubSpot, Snowflake, Stripe, and internal PostgreSQL ledgers with automatic schema validation and drift alerts.',
      metric: 'Zero-Loss Data Reconciliation'
    },
    {
      icon: Terminal,
      title: 'Headless Browser Scraping Cluster',
      tag: 'Autonomous Intelligence Ingestion',
      description: 'Distributed headless chromium workers extract public domain data, tech stacks, SEC filings, and corporate directory signals at scale without triggering anti-bot hurdles.',
      metric: '400+ Concurrent Nodes'
    },
    {
      icon: Layers,
      title: 'Self-Healing Circuit Breakers',
      tag: 'Automated Failover Protocol',
      description: 'If a downstream webhook endpoint degrades, the pipeline automatically redirects traffic to redundant standby clusters and triggers emergency incident telemetry.',
      metric: 'Sub-second Cluster Failover'
    }
  ];

  return (
    <section id="architecture-section" className="py-24 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <span>ENTERPRISE ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Engineered for Autonomous Reliability
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate fragile single-point-of-failure scripts. Synthex deploys hardened, scalable agentic pipelines built to handle millions of monthly workflow tasks with zero data loss.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-950/40 text-cyan-400 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-zinc-500">
                    0{idx + 1}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wide">
                    {item.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-3.5 font-mono text-xs">
                  <span className="text-zinc-500">Spec:</span>
                  <span className="text-emerald-400 font-medium">{item.metric}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Blueprint Diagram Teaser */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-mono text-xs text-cyan-400 font-semibold">CUSTOM ARCHITECTURE ENGAGEMENT</span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                Need a Custom n8n or Make.com Cluster Architecture?
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Our Solutions Architects conduct thorough audits of your existing infrastructure, design private multi-agent orchestration topologies, and deliver guaranteed sub-100ms response clusters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={onOpenLeadModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all"
              >
                <span>Schedule Solutions Audit</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
