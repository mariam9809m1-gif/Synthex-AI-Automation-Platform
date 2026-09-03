import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockWorkflows';
import { PricingPlan } from '../types';
import { logger } from '../utils/logger';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [monthlyTaskVolume, setMonthlyTaskVolume] = useState<number>(250000);

  const handleToggleCycle = (cycle: 'monthly' | 'annual') => {
    logger.stateUpdate('Pricing', `Toggled billing cycle to ${cycle}`);
    setBillingCycle(cycle);
  };

  const handlePlanClick = (plan: PricingPlan) => {
    logger.stateUpdate('Pricing', `User selected plan: ${plan.name}`);
    onSelectPlan(plan.name);
  };

  // Calculate estimated ROI savings
  const estimatedEngineerHoursSaved = Math.round((monthlyTaskVolume / 1000) * 1.8);
  const estimatedDollarSavings = Math.round(estimatedEngineerHoursSaved * 85); // $85/hr blended engineer rate

  return (
    <section id="pricing-section" className="py-24 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <span>TRANSPARENT ENTERPRISE ENGAGEMENTS</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Predictable Scaled Automation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Deploy production-ready autonomous pipelines backed by enterprise SLAs, zero-trust cryptographic security, and dedicated Solutions Architects.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-zinc-800 bg-zinc-900/90 p-1 backdrop-blur-md">
            <button
              onClick={() => handleToggleCycle('monthly')}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Invoicing
            </button>
            <button
              onClick={() => handleToggleCycle('annual')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Engagement</span>
              <span className="rounded bg-emerald-950 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-800">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 ${
                  isPopular
                    ? 'border-cyan-500/80 bg-zinc-900/80 shadow-[0_0_35px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/40'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider text-white shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">{plan.name}</h3>
                    <span className="rounded bg-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-300">
                      {plan.targetScale}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1 border-b border-zinc-800 pb-6">
                    <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-sm font-mono text-zinc-400">/month</span>
                    {billingCycle === 'annual' && (
                      <span className="ml-2 font-mono text-xs text-emerald-400">
                        (billed annually)
                      </span>
                    )}
                  </div>

                  {/* Core Metrics */}
                  <div className="mt-5 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Included Tasks:</span>
                      <span className="text-zinc-200 font-semibold">{plan.includedTasks}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Concurrency:</span>
                      <span className="text-cyan-400 font-semibold">{plan.concurrency}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Guaranteed SLA:</span>
                      <span className="text-emerald-400 font-semibold">{plan.sla}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-7">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                      Included Architecture:
                    </h4>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={`feat-${plan.id}-${fIdx}`} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800/80">
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all ${
                      isPopular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white shadow-lg'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    <span>Deploy {plan.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Volume & ROI Estimator */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              Interactive Autonomous Throughput &amp; ROI Calculator
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Slide your estimated monthly task load across n8n, Make, or custom API endpoints to estimate engineering capacity returned.
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">MONTHLY WORKFLOW TASKS:</span>
                <span className="text-cyan-400 font-bold text-sm">
                  {monthlyTaskVolume.toLocaleString()} executions/month
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={1500000}
                step={20000}
                value={monthlyTaskVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMonthlyTaskVolume(val);
                  logger.stateUpdate('PricingCalculator', 'Adjusted volume slider', val);
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>20k (Startup)</span>
                <span>250k (Mid-Market)</span>
                <span>750k (Enterprise)</span>
                <span>1.5M+ (High Scale)</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-500">Engineering Hours Saved:</span>
                <span className="text-emerald-400 font-bold">~{estimatedEngineerHoursSaved} hrs/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Monthly Value:</span>
                <span className="text-cyan-400 font-bold">${estimatedDollarSavings.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-2 text-[11px]">
                <span className="text-zinc-400">Recommended Architecture:</span>
                <span className="text-white font-semibold">
                  {monthlyTaskVolume > 600000 
                    ? 'Enterprise Autonomous Cloud' 
                    : monthlyTaskVolume > 100000 
                    ? 'Autonomous Growth' 
                    : 'Core Automation'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
