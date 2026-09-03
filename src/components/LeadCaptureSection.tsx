import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Send, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  RefreshCw,
  Copy,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { LeadFormData, FormValidationErrors } from '../types';
import { submitEnterpriseLead, generatePayloadSignature } from '../utils/webhookService';
import { logger } from '../utils/logger';

interface LeadCaptureSectionProps {
  initialPlan?: string;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ initialPlan }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    monthlyWorkflows: initialPlan ? '100,000 - 500,000' : '20,000 - 100,000',
    automationTarget: 'n8n',
    projectScope: initialPlan ? `Deploy ${initialPlan} pipeline with custom integrations.` : '',
    honeypot: '', // bot trap
    encryptionConsent: true
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; timestamp: string; payload: Record<string, unknown> } | null>(null);
  const [showConfigPreview, setShowConfigPreview] = useState<boolean>(false);
  const [copiedChecksum, setCopiedChecksum] = useState<boolean>(false);

  // Validate form fields with rigorous error freedom constraints
  const validateForm = (): boolean => {
    const newErrors: FormValidationErrors = {};
    let isValid = true;

    // Full name check
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (minimum 2 characters).';
      logger.validation('fullName', false, newErrors.fullName);
      isValid = false;
    } else {
      logger.validation('fullName', true);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required.';
      logger.validation('businessEmail', false, newErrors.businessEmail);
      isValid = false;
    } else if (!emailRegex.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = 'Please provide a valid corporate email format.';
      logger.validation('businessEmail', false, newErrors.businessEmail);
      isValid = false;
    } else {
      logger.validation('businessEmail', true);
    }

    // Company name
    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company / Organization name is required.';
      logger.validation('companyName', false, newErrors.companyName);
      isValid = false;
    } else {
      logger.validation('companyName', true);
    }

    // Scope check
    if (!formData.projectScope.trim() || formData.projectScope.trim().length < 8) {
      newErrors.projectScope = 'Please outline your automation requirements (minimum 8 characters).';
      logger.validation('projectScope', false, newErrors.projectScope);
      isValid = false;
    } else {
      logger.validation('projectScope', true);
    }

    // Consent
    if (!formData.encryptionConsent) {
      newErrors.encryptionConsent = 'Please confirm secure data transmission consent.';
      logger.validation('encryptionConsent', false, newErrors.encryptionConsent);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user corrects it
    if (errors[name as keyof FormValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logger.stateUpdate('LeadCapture', 'User triggered lead form submission');

    if (!validateForm()) {
      logger.stateUpdate('LeadCapture', 'Validation halted submission due to bad data');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitEnterpriseLead(formData);
      if (result.success) {
        const ticketId = `SYNTHEX-ARCH-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmittedTicket({
          id: ticketId,
          timestamp: new Date().toLocaleTimeString(),
          payload: result.payload
        });
        setSubmissionSuccess(true);
        logger.stateUpdate('LeadCapture', `Submission succeeded: Ticket ${ticketId}`);
      } else {
        setErrors(prev => ({ ...prev, general: result.message }));
      }
    } catch (err) {
      logger.error('LeadCapture', 'Unhandled error during lead submission', err);
      setErrors(prev => ({ ...prev, general: 'A network anomaly occurred. Safe retry enabled.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(false);
    setSubmittedTicket(null);
    setFormData({
      fullName: '',
      businessEmail: '',
      companyName: '',
      monthlyWorkflows: '20,000 - 100,000',
      automationTarget: 'n8n',
      projectScope: '',
      honeypot: '',
      encryptionConsent: true
    });
    setErrors({});
  };

  const currentPayloadSignature = generatePayloadSignature(
    JSON.stringify(formData), 
    'formsubmit_enterprise_secret_salt'
  );

  return (
    <section id="contact-section" className="py-24 bg-zinc-950 relative border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Security architecture */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ZERO-TRUST SECURE ONBOARDING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Initiate Enterprise Architecture Engagement
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Connect directly with our Principal Solutions Architects. We audit existing workflows, construct custom n8n/Make topologies, and guarantee sub-100ms webhook routing.
            </p>

            {/* FormSubmit Security Configuration Blueprint */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-semibold flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>FORMSUBMIT SECURITY PROTOCOL</span>
                </span>
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-800">
                  ENCRYPTED
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Gateway Relay:</span>
                  <span className="text-zinc-300">formsubmit.co/ajax/enterprise</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Spam Defense:</span>
                  <span className="text-emerald-400 font-semibold">Dual Honeypot + Bot Trap</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Payload Digest:</span>
                  <span className="text-cyan-400 font-mono text-[11px] truncate max-w-[180px]">
                    {currentPayloadSignature}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Response SLA:</span>
                  <span className="text-zinc-200 font-semibold">&lt; 2 Hours Guaranteed</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowConfigPreview(!showConfigPreview)}
                className="w-full flex items-center justify-between rounded-lg bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              >
                <span>{showConfigPreview ? 'Hide Technical Headers' : 'Inspect FormSubmit Headers'}</span>
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              </button>

              {showConfigPreview && (
                <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[10px] text-cyan-300/80 border border-zinc-800/80 max-h-40 overflow-y-auto">
                  <p>_subject: &quot;Synthex Enterprise Inbound Lead Dispatch&quot;</p>
                  <p>_template: &quot;table&quot;</p>
                  <p>_captcha: &quot;false&quot;</p>
                  <p>_autoresponse: &quot;Enabled (Immediate dispatch confirmation)&quot;</p>
                  <p>_honeypot: &quot;synthex_perimeter_token&quot;</p>
                </div>
              )}
            </div>

            {/* Direct Contact Guarantee */}
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-4 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Info className="h-4 w-4 text-cyan-400" />
                <span>NDA &amp; Intellectual Property Protection</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All client workflow topologies, schema configurations, and payload blueprints are encrypted under mutual enterprise Non-Disclosure standards.
              </p>
            </div>
          </div>

          {/* Right Column: High-End Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <AnimatePresence mode="wait">
                {submissionSuccess && submittedTicket ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white font-mono">
                        Pipeline Engagement Registered
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400 max-w-md mx-auto">
                        Your enterprise architecture inquiry has been parsed, signed, and dispatched to our Principal Solutions Engineering queue.
                      </p>
                    </div>

                    <div className="mx-auto max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-left space-y-2">
                      <div className="flex justify-between text-zinc-400">
                        <span>Incident Reference:</span>
                        <span className="text-cyan-400 font-bold">{submittedTicket.id}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Registered At:</span>
                        <span className="text-zinc-300">{submittedTicket.timestamp}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Target Engine:</span>
                        <span className="text-zinc-300">{formData.automationTarget}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Cryptographic Status:</span>
                        <span className="text-emerald-400 font-semibold">VERIFIED &amp; ENCRYPTED</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 text-xs font-mono font-semibold text-zinc-200 border border-zinc-700 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Submit Another Architecture Request</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Architecture Engagement Intake
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        All fields are verified client-side before transmission. Bad payload data is automatically sanitized.
                      </p>
                    </div>

                    {errors.general && (
                      <div className="rounded-lg bg-red-950/50 border border-red-800 p-3 text-xs text-red-300 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                        <span>{errors.general}</span>
                      </div>
                    )}

                    {/* Anti-spam Honeypot Field (invisible to users, catches bots) */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="synthex-honeypot">Perimeter Check</label>
                      <input
                        type="text"
                        id="synthex-honeypot"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Row 1: Full Name & Corporate Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="e.g. Jordan Vance"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
                            errors.fullName 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          Corporate Business Email *
                        </label>
                        <input
                          type="email"
                          name="businessEmail"
                          placeholder="e.g. j.vance@company.com"
                          value={formData.businessEmail}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
                            errors.businessEmail 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500'
                          }`}
                        />
                        {errors.businessEmail && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">{errors.businessEmail}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Company Name & Monthly Workflow Scale */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          placeholder="e.g. Acme Aerospace Corp"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
                            errors.companyName 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500'
                          }`}
                        />
                        {errors.companyName && (
                          <p className="mt-1 font-mono text-[11px] text-red-400">{errors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          Projected Monthly Task Volume
                        </label>
                        <select
                          name="monthlyWorkflows"
                          value={formData.monthlyWorkflows}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        >
                          <option value="20,000 - 100,000">20,000 - 100,000 tasks/mo</option>
                          <option value="100,000 - 500,000">100,000 - 500,000 tasks/mo</option>
                          <option value="500,000 - 1,500,000">500,000 - 1.5M tasks/mo</option>
                          <option value="1,500,000+ (High Concurrency)">1.5M+ (High Concurrency Cluster)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Target Platform Selection */}
                    <div>
                      <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                        Target Orchestration Engine
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: 'n8n', label: 'n8n Cluster' },
                          { id: 'Make', label: 'Make.com' },
                          { id: 'Custom Webhook', label: 'Custom Webhook' },
                          { id: 'Enterprise Hybrid', label: 'Hybrid Multi-Cloud' }
                        ].map((engine) => (
                          <button
                            type="button"
                            key={engine.id}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, automationTarget: engine.id as any }));
                              logger.stateUpdate('LeadForm', `Selected target engine ${engine.id}`);
                            }}
                            className={`rounded-lg px-3 py-2 text-xs font-mono text-center border transition-all ${
                              formData.automationTarget === engine.id
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            {engine.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Scope Description */}
                    <div>
                      <label className="block font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                        Pipeline Requirements &amp; Scope *
                      </label>
                      <textarea
                        rows={3}
                        name="projectScope"
                        placeholder="Detail your expected automation nodes, data sources (Stripe, HubSpot, Snowflake), and target latency requirements..."
                        value={formData.projectScope}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
                          errors.projectScope 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                      />
                      {errors.projectScope && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">{errors.projectScope}</p>
                      )}
                    </div>

                    {/* Consent checkbox */}
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="encryptionConsent"
                        name="encryptionConsent"
                        checked={formData.encryptionConsent}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-zinc-900"
                      />
                      <label htmlFor="encryptionConsent" className="text-xs text-zinc-400 leading-relaxed">
                        I confirm this payload should be processed securely under Synthex Zero-Trust SOC2 Type II cryptographic dispatch protocols.
                      </label>
                    </div>
                    {errors.encryptionConsent && (
                      <p className="font-mono text-[11px] text-red-400">{errors.encryptionConsent}</p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin text-white" />
                            <span className="font-mono">ENCRYPTING &amp; DISPATCHING...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Dispatch Architecture Intake Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
