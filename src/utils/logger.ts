/**
 * Enterprise console debugger utility for Synthex AI
 * Wraps state updates and system events in clean, structured logs.
 */

const IS_DEV = true;

const STYLES = {
  state: 'color: #06b6d4; font-weight: bold; background: #082f49; padding: 2px 6px; border-radius: 4px;',
  webhook: 'color: #10b981; font-weight: bold; background: #064e3b; padding: 2px 6px; border-radius: 4px;',
  validation: 'color: #f59e0b; font-weight: bold; background: #451a03; padding: 2px 6px; border-radius: 4px;',
  error: 'color: #ef4444; font-weight: bold; background: #450a0a; padding: 2px 6px; border-radius: 4px;',
  text: 'color: #e4e4e7; font-weight: normal;',
};

export const logger = {
  stateUpdate: (scope: string, action: string, payload?: unknown) => {
    if (!IS_DEV) return;
    try {
      if (payload !== undefined) {
        console.groupCollapsed(`%c[Synthex:State]%c ${scope} -> ${action}`, STYLES.state, STYLES.text);
        console.log('Payload:', payload);
        console.log('Timestamp:', new Date().toISOString());
        console.groupEnd();
      } else {
        console.log(`%c[Synthex:State]%c ${scope} -> ${action}`, STYLES.state, STYLES.text);
      }
    } catch {
      // Safe fallback
    }
  },

  webhookEvent: (endpoint: string, event: string, details?: unknown) => {
    if (!IS_DEV) return;
    try {
      console.groupCollapsed(`%c[Synthex:Webhook]%c ${event} @ ${endpoint}`, STYLES.webhook, STYLES.text);
      if (details) console.log('Payload / Headers:', details);
      console.groupEnd();
    } catch {
      // Safe fallback
    }
  },

  validation: (field: string, isValid: boolean, message?: string) => {
    if (!IS_DEV) return;
    try {
      if (!isValid) {
        console.warn(`%c[Synthex:Validation]%c Field "${field}" failed: ${message}`, STYLES.validation, STYLES.text);
      } else {
        console.log(`%c[Synthex:Validation]%c Field "${field}" valid`, STYLES.validation, STYLES.text);
      }
    } catch {
      // Safe fallback
    }
  },

  error: (scope: string, message: string, error?: unknown) => {
    try {
      console.error(`%c[Synthex:Error]%c [${scope}] ${message}`, STYLES.error, STYLES.text, error || '');
    } catch {
      // Safe fallback
    }
  }
};
