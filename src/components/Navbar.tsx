import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Workflow, 
  Terminal, 
  Layers, 
  CreditCard, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowUpRight, 
  Activity,
  AlertCircle
} from 'lucide-react';
import { ViewMode } from '../types';
import { logger } from '../utils/logger';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenLeadModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    logger.stateUpdate('Navigation', `Switched view to ${view}`);
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      {/* Top micro-announcement banner */}
      <div className="border-b border-zinc-800/50 bg-gradient-to-r from-zinc-950 via-cyan-950/20 to-zinc-950 px-4 py-1.5 text-xs text-zinc-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] text-zinc-300">
              SYNTHEX CORE v4.1: ALL SYSTEMS OPERATIONAL
            </span>
            <span className="hidden text-zinc-600 sm:inline">•</span>
            <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
              99.98% SLA Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <button
              onClick={() => handleNavClick('webhooks')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>n8n & Make Hub</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => handleNavClick('error_404')}
              className="text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1"
              title="Test user-friendly 404 & incident recovery page"
            >
              <AlertCircle className="h-3 w-3" />
              <span className="hidden md:inline">Test 404 Error</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('landing')}
          className="flex cursor-pointer items-center gap-3 group"
          id="nav-brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 transition-colors">
            <Workflow className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                SYNTHEX<span className="text-cyan-400">.AI</span>
              </span>
              <span className="rounded bg-cyan-950/70 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-400 border border-cyan-800/60">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans tracking-wide">
              Autonomous Analytics & Automation
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('landing')}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-zinc-900 text-cyan-400 border border-zinc-800'
                : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('pipelines-section')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all"
          >
            Pipelines
          </button>
          <button
            onClick={() => scrollToSection('architecture-section')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all"
          >
            Architecture
          </button>
          <button
            onClick={() => scrollToSection('pricing-section')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all"
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('webhooks')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              currentView === 'webhooks'
                ? 'bg-zinc-900 text-cyan-400 border border-zinc-800'
                : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
            }`}
          >
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span>Webhook Hub</span>
          </button>
          <button
            onClick={() => handleNavClick('portal')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              currentView === 'portal'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/80 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
            }`}
          >
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Client Workspace</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={() => handleNavClick('portal')}
            className="flex items-center gap-2 rounded-lg border border-zinc-700/80 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Live Workspace Demo</span>
          </button>
          <button
            onClick={onOpenLeadModal}
            className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <span>Request Architecture Call</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('portal')}
            className="rounded-lg bg-cyan-950/80 border border-cyan-800/70 p-2 text-cyan-400 text-xs flex items-center gap-1"
            title="Portal"
          >
            <Activity className="h-4 w-4" />
            <span className="font-mono text-[11px]">Portal</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('landing')}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-zinc-900"
              >
                <span>Landing Overview</span>
                <span className="font-mono text-xs text-cyan-400">01</span>
              </button>
              <button
                onClick={() => scrollToSection('pipelines-section')}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-zinc-900"
              >
                <span>Automated Pipelines</span>
                <span className="font-mono text-xs text-cyan-400">02</span>
              </button>
              <button
                onClick={() => scrollToSection('pricing-section')}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-zinc-900"
              >
                <span>Interactive Pricing</span>
                <span className="font-mono text-xs text-cyan-400">03</span>
              </button>
              <button
                onClick={() => handleNavClick('webhooks')}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>Webhook Hub (n8n/Make)</span>
                </div>
                <span className="font-mono text-xs text-cyan-400">04</span>
              </button>
              <button
                onClick={() => handleNavClick('portal')}
                className="flex items-center justify-between rounded-lg bg-zinc-900/90 border border-cyan-800/50 px-3 py-2.5 text-left text-sm font-semibold text-cyan-300"
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span>Client Workspace Portal</span>
                </div>
                <span className="rounded bg-cyan-900/50 px-1.5 py-0.5 text-[10px] text-cyan-300 font-mono">LIVE</span>
              </button>
              <button
                onClick={() => handleNavClick('error_404')}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-zinc-400 hover:text-red-400"
              >
                <span>View Error Recovery Page (404)</span>
                <AlertCircle className="h-3.5 w-3.5" />
              </button>

              <div className="pt-3 border-t border-zinc-800/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLeadModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Request Architecture Call</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
