import { AutomationPipeline, WebhookEndpoint, PricingPlan, ExecutionLog } from '../types';

export const INITIAL_PIPELINES: AutomationPipeline[] = [
  {
    id: 'pipe-lead-01',
    title: 'Autonomous Inbound Lead Pipeline',
    category: 'Sales & Revenue Acceleration',
    description: 'High-frequency inbound processing: Captures lead webhook, enriches company domain telemetry, scores intent with Gemini AI, and triggers dynamic bespoke executive outreach.',
    targetPlatform: 'n8n',
    active: true,
    totalExecutions: 48920,
    successRate: 99.7,
    avgDurationMs: 642,
    lastRunTimestamp: 'Just now (12s ago)',
    steps: [
      {
        id: 'step-lead-1',
        name: 'Lead Generated',
        type: 'trigger',
        status: 'completed',
        latencyMs: 84,
        description: 'Receives webhook payload from landing FormSubmit or CRM webhook with cryptographic signature verification.',
        iconName: 'Zap',
        inputPayload: {
          event: 'lead.created',
          source: 'Synthex Enterprise Landing',
          lead_id: 'lead_x892f_acme',
          contact_email: 'marcus.vance@acme-cloud.io',
          name: 'Marcus Vance',
          company: 'Acme Cloud Dynamics',
          declared_volume: '250,000 tasks/mo',
          security_hash: '0x8f729b19e93'
        },
        outputPayload: {
          status: 'verified_and_queued',
          normalized_domain: 'acme-cloud.io',
          tenant_tier: 'Enterprise Priority',
          ingest_timestamp: '2026-09-03T12:30:14.218Z'
        },
        logs: [
          'Webhook listener received POST request (2.1 KB)',
          'HMAC-SHA256 signature verified against active tenant secret',
          'Payload validated against JSON schema v3.1',
          'State passed downstream to Enrichment Scraper Worker'
        ]
      },
      {
        id: 'step-lead-2',
        name: 'Scraped & Enriched',
        type: 'scraper',
        status: 'completed',
        latencyMs: 215,
        description: 'Autonomous headless agent crawls target company domain, pulling tech stack, recent funding, headcount, and hiring signals.',
        iconName: 'Search',
        inputPayload: {
          target_domain: 'acme-cloud.io',
          query_parameters: ['tech_stack', 'funding_rounds', 'executive_roster', 'open_positions']
        },
        outputPayload: {
          company_name: 'Acme Cloud Dynamics',
          headcount: '420-500 employees',
          funding_stage: 'Series C ($48M raised)',
          identified_stack: ['AWS', 'Kubernetes', 'PostgreSQL', 'Snowflake', 'Make.com'],
          current_pain_point: 'Scaling webhook latency & data synchronization across European data centers',
          target_persona_verified: true
        },
        logs: [
          'Spawned Headless Chromium Worker #089',
          'Extracted meta tags, DNS records, and SEC/Crunchbase telemetry',
          'Identified active Make.com and n8n webhook usage in developer docs',
          'Enrichment payload consolidated (confidence score: 0.96)'
        ]
      },
      {
        id: 'step-lead-3',
        name: 'AI Analyzed & Scored',
        type: 'ai_analysis',
        status: 'completed',
        latencyMs: 198,
        description: 'Gemini reasoning agent cross-references ICP criteria, computes lead viability score, and synthesizes tailored value pitch angles.',
        iconName: 'Cpu',
        inputPayload: {
          raw_lead_profile: 'Marcus Vance, VP Infrastructure',
          company_telemetry: 'Acme Cloud Dynamics (450 FTE, Make.com user)',
          prompt_template: 'synthex_enterprise_sales_intelligence_v4'
        },
        outputPayload: {
          intent_classification: 'Immediate Enterprise Deployment',
          icp_fit_score: 96,
          recommended_plan: 'Enterprise Autonomous Cloud ($2,400/mo)',
          dynamic_pitch_angles: [
            'Seamless migration from fragile Make workflows to high-throughput n8n / Synthex cluster',
            'Sub-100ms webhook latency SLA for EU data sovereignty',
            'Dedicated Solutions Architect pairing within 48 hours'
          ],
          ai_confidence: 0.984
        },
        logs: [
          'Invoked Gemini Enterprise Reasoning Engine',
          'Context window evaluation completed in 198ms',
          'Synthesized custom business case and ROI projection table',
          'Generated personalized draft email with dynamic merge tokens'
        ]
      },
      {
        id: 'step-lead-4',
        name: 'Email Sent & Synced',
        type: 'action',
        status: 'completed',
        latencyMs: 145,
        description: 'Dispatches bespoke executive email via authenticated SMTP/Resend API, creates HubSpot deal record, and pings Slack leadership channel.',
        iconName: 'Send',
        inputPayload: {
          recipient: 'marcus.vance@acme-cloud.io',
          subject: 'Architecting Acme Cloud’s autonomous pipeline with sub-100ms latency',
          sender_alias: 'Elena Rostova, Principal Solutions Architect <elena@synthex.ai>',
          cc: ['solutions-team@synthex.ai']
        },
        outputPayload: {
          email_delivery_status: '250 2.0.0 Message queued for delivery',
          message_id: 'msg_9941a87c129e',
          crm_deal_created: 'DEAL-ACME-2026-90',
          slack_notification_sent: true,
          next_autonomous_followup: '2026-09-05T09:00:00Z'
        },
        logs: [
          'Authenticated with enterprise SMTP relay',
          'DKIM and SPF cryptographic signatures generated',
          'Email dispatched to recipient gateway (SMTP 250 OK)',
          'Deal pipeline updated in HubSpot Enterprise and Slack #revenue-radar'
        ]
      }
    ]
  },
  {
    id: 'pipe-fraud-02',
    title: 'Financial Anomaly & Sentinel Pipeline',
    category: 'FinTech & High-Frequency Security',
    description: 'Autonomous financial safety sentinel monitoring webhook streams from Stripe/Adyen, identifying micro-patterns of fraud, and freezing malicious sessions in real time.',
    targetPlatform: 'Make',
    active: true,
    totalExecutions: 194310,
    successRate: 99.98,
    avgDurationMs: 412,
    lastRunTimestamp: '2 mins ago',
    steps: [
      {
        id: 'step-fraud-1',
        name: 'Ledger Webhook Triggered',
        type: 'trigger',
        status: 'completed',
        latencyMs: 52,
        description: 'Direct webhook hook from Stripe processing stream with zero buffer.',
        iconName: 'Zap',
        inputPayload: { event: 'charge.attempted', amount_usd: 14200, currency: 'USD', card_country: 'SG' },
        outputPayload: { routed_to_anomaly_worker: 'sentinel_core_node_1' },
        logs: ['Received payload via TLS 1.3', 'Validated HMAC-SHA256 signature']
      },
      {
        id: 'step-fraud-2',
        name: 'IP & Velocity Scraped',
        type: 'scraper',
        status: 'completed',
        latencyMs: 140,
        description: 'Real-time proxy & residential VPN detection, card velocity check across 500+ global partner nodes.',
        iconName: 'Search',
        inputPayload: { ip: '194.26.29.112', bin: '411111', device_fingerprint: 'dfp_8871ab' },
        outputPayload: { proxy_risk: 0.89, velocity_past_hour: 14, known_fraud_cluster: true },
        logs: ['Scraped IP intelligence databases in 140ms', 'Identified Tor exit node hop']
      },
      {
        id: 'step-fraud-3',
        name: 'Neural Risk Model Evaluated',
        type: 'ai_analysis',
        status: 'completed',
        latencyMs: 110,
        description: 'Sub-second classification model evaluates transactional drift and velocity metrics.',
        iconName: 'Cpu',
        inputPayload: { combined_risk_vector: [0.89, 14, 14200] },
        outputPayload: { decision: 'REJECT_AND_ISOLATE', confidence: 0.992, alert_level: 'CRITICAL_P0' },
        logs: ['Machine learning inference completed', 'Threshold exceeded: 0.992 > 0.850']
      },
      {
        id: 'step-fraud-4',
        name: 'Autonomous Containment Executed',
        type: 'action',
        status: 'completed',
        latencyMs: 110,
        description: 'Auto-revokes API session tokens, blocks card hash across firewall, and sends high-priority pager incident.',
        iconName: 'ShieldAlert',
        inputPayload: { action: 'quarantine_token', token_id: 'tok_live_7718a' },
        outputPayload: { session_terminated: true, webhook_response_sent: 'DECLINED_SUSPICIOUS' },
        logs: ['Stripe authorization rejected safely', 'Incident dispatched to security ops center']
      }
    ]
  },
  {
    id: 'pipe-voice-03',
    title: 'Customer Voice & Proactive Churn Sentinel',
    category: 'Customer Intelligence & Retention',
    description: 'Analyzes omni-channel customer conversations from Zendesk, Intercom, and Discord, auto-detecting frustration indicators and routing high-value accounts to executive escalation.',
    targetPlatform: 'Custom Webhook',
    active: true,
    totalExecutions: 83120,
    successRate: 99.4,
    avgDurationMs: 520,
    lastRunTimestamp: '5 mins ago',
    steps: [
      {
        id: 'step-voice-1',
        name: 'Ticket Ingested',
        type: 'trigger',
        status: 'completed',
        latencyMs: 65,
        description: 'Ingests ticket creation and customer reply webhooks across CRM channels.',
        iconName: 'Zap',
        inputPayload: { ticket_id: 'ZD-89912', channel: 'Zendesk Support', text_length_chars: 640 },
        outputPayload: { ticket_queued: true, customer_tier: 'Enterprise Premium' },
        logs: ['Received inbound webhook', 'Extracted plain text transcript']
      },
      {
        id: 'step-voice-2',
        name: 'Account Context Scraped',
        type: 'scraper',
        status: 'completed',
        latencyMs: 180,
        description: 'Extracts historical contract value, active license count, and recent support sentiment trajectory.',
        iconName: 'Search',
        inputPayload: { customer_id: 'cust_enterprise_04' },
        outputPayload: { arr_value: '$120,000/yr', renewal_date: 'In 45 days', previous_nps: 9 },
        logs: ['Retrieved Salesforce customer record', 'Aggregated contract metadata']
      },
      {
        id: 'step-voice-3',
        name: 'Sentiment & Drift Analyzed',
        type: 'ai_analysis',
        status: 'completed',
        latencyMs: 160,
        description: 'Classifies root cause (e.g., API Rate Limit, Billing, Bug) and scores churn risk.',
        iconName: 'Cpu',
        inputPayload: { sentiment_model: 'Gemini Semantic Intent v2.1' },
        outputPayload: { churn_risk_score: 82, primary_friction: 'Webhook throughput bottleneck', urgency: 'High' },
        logs: ['Detected negative sentiment shift regarding API rate limits', 'Marked as high retention risk']
      },
      {
        id: 'step-voice-4',
        name: 'VIP Escalation & Slack Alert',
        type: 'action',
        status: 'completed',
        latencyMs: 115,
        description: 'Dispatches VIP alert to Customer Success VP and schedules automated priority engineering consultation.',
        iconName: 'Send',
        inputPayload: { target_channel: '#vip-client-escalations', ping_roles: ['@vp-customer-success'] },
        outputPayload: { slack_ts: '1725358992.0019', meeting_proposal_generated: true },
        logs: ['Posted rich interactive block message to Slack', 'Automated priority calendar slot reserved']
      }
    ]
  }
];

export const INITIAL_WEBHOOK_ENDPOINTS: WebhookEndpoint[] = [
  {
    id: 'ep-n8n-prod',
    name: 'n8n Enterprise Cluster (Core Ingestion)',
    platform: 'n8n',
    url: 'https://n8n.synthex-automations.io/webhook/v1/lead-enrichment',
    secretKey: 'whsec_n8n_prod_9941a87b',
    method: 'POST',
    events: ['lead.created', 'pipeline.step_completed', 'enrichment.verified'],
    isActive: true,
    lastPingStatus: 'success',
    lastPingTimestamp: '3 mins ago',
    latencyMs: 142,
    headers: {
      'X-Synthex-Cluster': 'eu-west1-cluster-a',
      'X-Retry-Policy': 'exponential-backoff-3'
    }
  },
  {
    id: 'ep-make-fin',
    name: 'Make.com Scenario 778 (Fraud & Alert Relay)',
    platform: 'Make',
    url: 'https://hook.eu1.make.com/x8929fac712891bbca',
    secretKey: 'whsec_make_fin_3310b',
    method: 'POST',
    events: ['anomaly.detected', 'account.quarantine_triggered'],
    isActive: true,
    lastPingStatus: 'success',
    lastPingTimestamp: '12 mins ago',
    latencyMs: 218,
    headers: {
      'X-Make-Scenario-ID': 'scen_778_live'
    }
  },
  {
    id: 'ep-formsubmit-direct',
    name: 'FormSubmit Secure Lead Gateway',
    platform: 'Custom',
    url: 'https://formsubmit.co/ajax/enterprise-leads@synthex.ai',
    secretKey: 'whsec_formsubmit_crypt_8992',
    method: 'POST',
    events: ['lead.formsubmit_secure_dispatch'],
    isActive: true,
    lastPingStatus: 'success',
    lastPingTimestamp: 'Just now',
    latencyMs: 98,
    headers: {
      'Accept': 'application/json',
      'X-Security-Checksum': 'sha256-verified-lead'
    }
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Core Automation',
    tagline: 'Ideal for scaling startups automating core revenue and inbound operations.',
    monthlyPrice: 950,
    annualPrice: 760, // 20% discount
    includedTasks: '50,000 tasks/month',
    concurrency: '5 concurrent workers',
    sla: '99.5% Uptime SLA',
    targetScale: 'Up to $10M ARR',
    features: [
      'Pre-configured n8n / Make.com Webhook Relays',
      'Standard Inbound Lead Enrichment & Scraper',
      'Gemini AI Intent Classification & Scoring',
      'Email & Slack Autonomous Dispatchers',
      'Structured JSON Payload Validation Engine',
      'Standard Email & Discord Support (4hr SLA)'
    ]
  },
  {
    id: 'plan-growth',
    name: 'Autonomous Growth',
    badge: 'MOST POPULAR',
    tagline: 'High-throughput intelligence pipelines for high-velocity enterprise teams.',
    monthlyPrice: 2400,
    annualPrice: 1920, // 20% discount
    includedTasks: '350,000 tasks/month',
    concurrency: '25 concurrent workers',
    sla: '99.9% Uptime SLA',
    highlighted: true,
    targetScale: '$10M - $100M ARR',
    features: [
      'Everything in Core Automation, plus:',
      'Sub-200ms Webhook Execution SLA',
      'Multi-Agent Omni-Channel Autonomous Outreach',
      'Custom Headless Browser Scrapers & Fingerprinting',
      'Real-time Financial & Data Drift Anomaly Sentinels',
      'Cryptographic HMAC Signature Verification on all Webhooks',
      'Dedicated Slack Bridge with Synthex Solutions Architect',
      'Interactive Client Workspace Portal with Custom Branding'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Autonomous Cloud',
    badge: 'MISSION CRITICAL',
    tagline: 'Dedicated cloud clusters, custom LLM fine-tuning, and zero-trust perimeter.',
    monthlyPrice: 5900,
    annualPrice: 4720,
    includedTasks: 'Unlimited / Custom Quota',
    concurrency: 'Unlimited dedicated nodes',
    sla: '99.99% Financial SLA',
    targetScale: '$100M+ ARR / Global Org',
    features: [
      'Everything in Autonomous Growth, plus:',
      'Dedicated VPC or On-Premise Kubernetes Cluster deployment',
      'Custom fine-tuned Enterprise Gemini models on private telemetry',
      'Direct n8n self-hosted instance clustering & disaster recovery',
      'Air-gapped security, SOC2 Type II & HIPAA compliance pack',
      '24/7/365 War Room & PagerDuty escalation (< 15m P0 response)',
      'Quarterly In-Person Architecture Audits with Chief Architect'
    ]
  }
];

export const INITIAL_LOGS: ExecutionLog[] = [
  {
    id: 'log-1',
    timestamp: '12:34:02.114',
    pipelineId: 'pipe-lead-01',
    pipelineTitle: 'Autonomous Inbound Lead Pipeline',
    stepId: 'step-lead-4',
    stepName: 'Email Sent & Synced',
    level: 'success',
    message: 'Outreach dispatched to marcus.vance@acme-cloud.io with 100% deliverability token.',
    payloadSummary: 'Status: 250 OK | Latency: 145ms'
  },
  {
    id: 'log-2',
    timestamp: '12:33:58.890',
    pipelineId: 'pipe-lead-01',
    pipelineTitle: 'Autonomous Inbound Lead Pipeline',
    stepId: 'step-lead-3',
    stepName: 'AI Analyzed & Scored',
    level: 'info',
    message: 'Gemini reasoning agent scored lead ICP fit at 96/100 (Enterprise Priority).',
    payloadSummary: 'Intent: Immediate Deployment'
  },
  {
    id: 'log-3',
    timestamp: '12:32:10.042',
    pipelineId: 'pipe-fraud-02',
    pipelineTitle: 'Financial Anomaly & Sentinel Pipeline',
    stepId: 'step-fraud-4',
    stepName: 'Autonomous Containment Executed',
    level: 'warn',
    message: 'Suspicious card velocity detected from proxy IP 194.26.29.112. Session quarantined.',
    payloadSummary: 'Risk score: 0.992 | Alert: CRITICAL_P0'
  },
  {
    id: 'log-4',
    timestamp: '12:30:44.771',
    pipelineId: 'pipe-voice-03',
    pipelineTitle: 'Customer Voice & Proactive Churn Sentinel',
    stepId: 'step-voice-3',
    stepName: 'Sentiment & Drift Analyzed',
    level: 'info',
    message: 'Zendesk ticket ZD-89912 categorized as Throughput Friction. Escrow alert routed to CSM.',
    payloadSummary: 'Churn risk: 82%'
  }
];
