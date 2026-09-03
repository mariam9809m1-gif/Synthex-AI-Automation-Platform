import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Zap, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Network,
  Code2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { WebhookEndpoint } from '../../types';
import { INITIAL_WEBHOOK_ENDPOINTS } from '../../data/mockWorkflows';
import { 
  WEBHOOK_PAYLOAD_TEMPLATES, 
  dispatchWebhookPayload, 
  generateCurlCommand,
  WebhookDispatchResult 
} from '../../utils/webhookService';
import { logger } from '../../utils/logger';

export const WebhookHub: React.FC = () => {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>(INITIAL_WEBHOOK_ENDPOINTS);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('ep-n8n-prod');
  const [payloadTemplate, setPayloadTemplate] = useState<'lead_ingestion' | 'make_trigger' | 'custom'>('lead_ingestion');
  const [rawPayloadText, setRawPayloadText] = useState<string>(
    JSON.stringify(WEBHOOK_PAYLOAD_TEMPLATES.n8n_lead_ingestion, null, 2)
  );
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<WebhookDispatchResult | null>(null);
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);

  const selectedEndpoint = endpoints.find(e => e.id === selectedEndpointId) || endpoints[0];

  const handleTemplateChange = (template: 'lead_ingestion' | 'make_trigger' | 'custom') => {
    logger.stateUpdate('WebhookHub', `Switched template to ${template}`);
    setPayloadTemplate(template);
    setJsonParseError(null);

    if (template === 'lead_ingestion') {
      setRawPayloadText(JSON.stringify(WEBHOOK_PAYLOAD_TEMPLATES.n8n_lead_ingestion, null, 2));
      setSelectedEndpointId('ep-n8n-prod');
    } else if (template === 'make_trigger') {
      setRawPayloadText(JSON.stringify(WEBHOOK_PAYLOAD_TEMPLATES.make_workflow_trigger, null, 2));
      setSelectedEndpointId('ep-make-fin');
    }
  };

  const handlePayloadTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRawPayloadText(text);
    try {
      JSON.parse(text);
      setJsonParseError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON format';
      setJsonParseError(msg);
    }
  };

  const handleDispatch = async () => {
    logger.stateUpdate('WebhookHub', `Triggered manual dispatch to ${selectedEndpoint.name}`);
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawPayloadText);
    } catch {
      setJsonParseError('Cannot dispatch malformed JSON payload. Fix errors before transmission.');
      logger.validation('payloadJson', false, 'Malformed JSON');
      return;
    }

    setIsDispatching(true);
    setDispatchResult(null);

    try {
      const result = await dispatchWebhookPayload(selectedEndpoint, parsed);
      setDispatchResult(result);
      
      // Update endpoint last ping state
      setEndpoints(prev => prev.map(ep => {
        if (ep.id === selectedEndpoint.id) {
          return {
            ...ep,
            lastPingStatus: result.success ? 'success' : 'failed',
            lastPingTimestamp: 'Just now',
            latencyMs: result.latencyMs
          };
        }
        return ep;
      }));

      logger.stateUpdate('WebhookHub', 'Dispatch operation complete', result);
    } catch (error) {
      logger.error('WebhookHub', 'Unexpected error in dispatch wrapper', error);
    } finally {
      setIsDispatching(false);
    }
  };

  let currentParsedPayload: Record<string, unknown> = {};
  try {
    currentParsedPayload = JSON.parse(rawPayloadText);
  } catch {
    currentParsedPayload = { error: 'Invalid JSON' };
  }

  const generatedCurl = generateCurlCommand(selectedEndpoint, currentParsedPayload);

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(generatedCurl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
    logger.stateUpdate('WebhookHub', 'Copied cURL command');
  };

  const handleCopyResponse = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(JSON.stringify(dispatchResult.responsePayload, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-400">
            <Network className="h-3.5 w-3.5" />
            <span>INTEGRATION ARCHITECTURE ENGINE</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white font-mono">
            n8n &amp; Make Automation Webhook Service
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-3xl">
            Pre-configured API and webhook service modules designed to safely push and pull structured JSON payloads to and from autonomous workflows with cryptographic verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-xs text-zinc-300">Cluster Status: Ready</span>
        </div>
      </div>

      {/* Pre-configured Endpoints Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {endpoints.map((ep) => {
          const isSelected = ep.id === selectedEndpointId;
          return (
            <div
              key={ep.id}
              onClick={() => {
                setSelectedEndpointId(ep.id);
                logger.stateUpdate('WebhookHub', `Selected endpoint ${ep.name}`);
              }}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-zinc-900 shadow-[0_0_20px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/50'
                  : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 uppercase">
                  {ep.platform}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className={`h-2 w-2 rounded-full ${ep.lastPingStatus === 'success' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span className="text-zinc-400">{ep.latencyMs ? `${ep.latencyMs}ms` : 'Ready'}</span>
                </div>
              </div>

              <h4 className="mt-3 font-semibold text-sm text-white">
                {ep.name}
              </h4>
              <p className="mt-1 font-mono text-[11px] text-zinc-400 truncate">
                {ep.url}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2 font-mono text-[10px] text-zinc-500">
                <span>Method: {ep.method}</span>
                <span>Secret: {ep.secretKey.substring(0, 10)}...</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Payload Dispatcher & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Payload Editor */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-white">
                JSON PAYLOAD BUILDER
              </span>
            </div>

            {/* Template Presets */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleTemplateChange('lead_ingestion')}
                className={`rounded px-2.5 py-1 transition-colors ${
                  payloadTemplate === 'lead_ingestion'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                n8n Lead Hook
              </button>
              <button
                type="button"
                onClick={() => handleTemplateChange('make_trigger')}
                className={`rounded px-2.5 py-1 transition-colors ${
                  payloadTemplate === 'make_trigger'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Make Scenario
              </button>
              <button
                type="button"
                onClick={() => handleTemplateChange('custom')}
                className={`rounded px-2.5 py-1 transition-colors ${
                  payloadTemplate === 'custom'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Custom Payload
              </button>
            </div>
          </div>

          {/* JSON Textarea with syntax error alert */}
          <div className="relative">
            <textarea
              rows={12}
              value={rawPayloadText}
              onChange={handlePayloadTextChange}
              spellCheck={false}
              className={`w-full rounded-xl border bg-zinc-950 p-4 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 ${
                jsonParseError
                  ? 'border-red-500 text-red-300 focus:ring-red-500'
                  : 'border-zinc-800 text-cyan-300/90 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {jsonParseError && (
              <div className="mt-2 rounded-lg bg-red-950/70 border border-red-800 p-2.5 text-xs font-mono text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>Syntax Error: {jsonParseError}</span>
              </div>
            )}
          </div>

          {/* Dispatch Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>X-Synthex-Signature verification enabled</span>
            </div>

            <button
              onClick={handleDispatch}
              disabled={isDispatching || !!jsonParseError}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {isDispatching ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-white" />
                  <span>TRANSMITTING PAYLOAD...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>DISPATCH TO {selectedEndpoint.platform.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Response Inspector & Generated cURL */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Dispatch Response Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs font-semibold text-white">
                  SERVER RESPONSE TELEMETRY
                </span>
              </div>

              {dispatchResult && (
                <button
                  onClick={handleCopyResponse}
                  className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white"
                >
                  {copiedResponse ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="mt-4">
              {dispatchResult ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
                      <span className="text-zinc-500 text-[10px]">HTTP STATUS:</span>
                      <p className={`font-bold mt-0.5 ${dispatchResult.success ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {dispatchResult.statusCode} {dispatchResult.success ? 'OK' : 'ACCEPTED'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
                      <span className="text-zinc-500 text-[10px]">ROUND-TRIP LATENCY:</span>
                      <p className="font-bold text-cyan-400 mt-0.5">
                        {dispatchResult.latencyMs}ms
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-emerald-300/90 leading-relaxed scrollbar-thin">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(dispatchResult.responsePayload, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center font-mono text-xs text-zinc-500 space-y-2">
                  <Terminal className="h-8 w-8 text-zinc-700 mx-auto" />
                  <p>Awaiting webhook transmission...</p>
                  <p className="text-[10px] text-zinc-600">
                    Click &quot;DISPATCH&quot; to test real JSON routing to {selectedEndpoint.platform}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Generated cURL Terminal */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-semibold text-zinc-300">EQUIVALENT cURL COMMAND:</span>
              <button
                onClick={handleCopyCurl}
                className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
              >
                {copiedCurl ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy cURL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] leading-relaxed text-zinc-300 max-h-32 overflow-y-auto whitespace-pre-wrap scrollbar-thin">
              {generatedCurl}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
