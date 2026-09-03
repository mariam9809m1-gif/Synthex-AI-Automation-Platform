import React from 'react';
import { Workflow, ShieldCheck, Terminal, Heart, ExternalLink } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Core Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Workflow className="h-5 w-5" />
              </div>
              <span className="font-mono text-lg font-bold text-white tracking-tight">
                SYNTHEX<span className="text-cyan-400">.AI</span>
              </span>
            </div>

            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Enterprise autonomous AI analytics and workflow automation agency. We architect mission-critical multi-agent pipelines, self-healing n8n &amp; Make clusters, and sub-100ms webhook routing.
            </p>

            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>99.98% Cluster SLA</span>
              </span>
              <span>•</span>
              <span>SOC2 Type II Audited</span>
              <span>•</span>
              <span>TLS 1.3 Strict</span>
            </div>
          </div>

          {/* Col 2: Architecture & Solutions */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Client Workspace Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('webhooks')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  n8n &amp; Make Webhook Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Visual Workflow Stepper
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('error_404')}
                  className="hover:text-red-400 transition-colors"
                >
                  Self-Healing 404 Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrations & Compliance */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Integrations
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-400">n8n Self-Hosted &amp; Cloud</li>
              <li className="text-zinc-400">Make.com Scenario Webhooks</li>
              <li className="text-zinc-400">FormSubmit Secure Relay</li>
              <li className="text-zinc-400">Google Gemini Enterprise</li>
              <li className="text-zinc-400">Stripe &amp; Salesforce Ledgers</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Synthex AI Autonomous Systems. All rights reserved.</p>
          <div className="mt-2 sm:mt-0 flex items-center gap-4">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Security Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Zero-Trust SLA</span>
            <span>•</span>
            <button
              onClick={onOpenLeadModal}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Contact Architect
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
