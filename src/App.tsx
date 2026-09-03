import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PipelineShowcase } from './components/PipelineShowcase';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { WorkspaceDashboard } from './components/ClientPortal/WorkspaceDashboard';
import { WebhookHub } from './components/ClientPortal/WebhookHub';
import { ErrorPage } from './components/ErrorPage';
import { Footer } from './components/Footer';
import { logger } from './utils/logger';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [selectedPlanForLead, setSelectedPlanForLead] = useState<string | undefined>(undefined);

  // Initialize application and log startup state
  useEffect(() => {
    logger.stateUpdate('App', 'Synthex Enterprise Autonomous Platform Initialized', {
      view: 'landing',
      version: '4.1.0-enterprise',
      time: new Date().toISOString()
    });
  }, []);

  const handleNavigate = (view: ViewMode) => {
    logger.stateUpdate('App', `Route transition to: ${view}`);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeadModal = (plan?: string) => {
    logger.stateUpdate('App', 'Opening lead intake modal', { plan });
    setSelectedPlanForLead(plan);
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    logger.stateUpdate('App', 'Closing lead intake modal');
    setIsLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLeadModal={() => handleOpenLeadModal()}
      />

      {/* Main Content Areas based on currentView */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              onOpenLeadModal={() => handleOpenLeadModal()}
            />

            <PipelineShowcase
              onGoToPortal={() => handleNavigate('portal')}
              onGoToWebhooks={() => handleNavigate('webhooks')}
            />

            <Features
              onOpenLeadModal={() => handleOpenLeadModal()}
            />

            <Pricing
              onSelectPlan={(plan) => handleOpenLeadModal(plan)}
            />

            <LeadCaptureSection />
          </>
        )}

        {currentView === 'portal' && (
          <WorkspaceDashboard
            onBackToLanding={() => handleNavigate('landing')}
            onOpenWebhooksTab={() => handleNavigate('webhooks')}
          />
        )}

        {currentView === 'webhooks' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <WebhookHub />
          </div>
        )}

        {currentView === 'error_404' && (
          <ErrorPage
            onNavigate={handleNavigate}
            errorPath="/api/v1/autonomous-mesh/cluster-route"
          />
        )}
      </main>

      {/* Global Enterprise Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLeadModal={() => handleOpenLeadModal()}
      />

      {/* Global Architecture Lead Capture Intake Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseLeadModal}
        selectedPlan={selectedPlanForLead}
      />
    </div>
  );
}
