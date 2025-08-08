// Simple, reliable analytics wrapper for PostHog
// Falls back gracefully when PostHog is not available

import posthog from 'posthog-js';

interface AnalyticsConfig {
  posthogKey?: string;
  posthogHost?: string;
  enabled: boolean;
}

class Analytics {
  private config: AnalyticsConfig;
  private initialized = false;

  constructor() {
    this.config = {
      posthogKey: import.meta.env.VITE_POSTHOG_KEY,
      posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.posthog.com',
      enabled: false, // Start disabled, enable after successful init
    };
  }

  /**
   * Initialize PostHog analytics
   * Safe to call multiple times - will only initialize once
   */
  init(): void {
    if (this.initialized) {
      console.log('Analytics already initialized');
      return;
    }

    if (!this.config.posthogKey) {
      console.log('No PostHog key provided - analytics disabled');
      return;
    }

    if (!posthog) {
      console.warn('PostHog library not available - analytics disabled');
      return;
    }

    try {
      posthog.init(this.config.posthogKey, {
        api_host: this.config.posthogHost,
        // Privacy-focused configuration
        capture_pageview: false, // We'll manually track important page views
        capture_pageleave: false,
        disable_session_recording: true,
        disable_surveys: true,
        disable_compression: false,
        cross_subdomain_cookie: false,
        persistence: 'localStorage',
        // Only capture basic device info, no personal data
        property_blacklist: ['$email', '$name', '$phone'],
        loaded: (posthogInstance) => {
          // Disable debug mode in production
          if (import.meta.env.MODE === 'development') {
            posthogInstance.debug();
          }
          console.log('PostHog loaded successfully');
        },
      });

      this.initialized = true;
      this.config.enabled = true;
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize analytics:', error);
      this.config.enabled = false;
    }
  }

  /**
   * Identify a user with their ID
   * Only sends userId, no personal information
   */
  identify(userId: string, properties?: Record<string, any>): void {
    if (!this.config.enabled || !this.initialized || !posthog) {
      console.log('Analytics not available, skipping identify for user:', userId);
      return;
    }

    try {
      // Only send non-personal properties
      const safeProperties = properties ? this.sanitizeProperties(properties) : {};
      posthog.identify(userId, safeProperties);
      console.log('User identified:', userId);
    } catch (error) {
      console.warn('Analytics identify failed:', error);
    }
  }

  /**
   * Track an event with optional properties
   */
  track(event: string, properties?: Record<string, any>): void {
    // Always log events for debugging, even when analytics is disabled
    console.log('📊 Analytics Event:', event, properties);

    if (!this.config.enabled || !this.initialized || !posthog) {
      return;
    }

    try {
      const safeProperties = properties ? this.sanitizeProperties(properties) : {};
      posthog.capture(event, safeProperties);
    } catch (error) {
      console.warn('Analytics track failed:', error);
    }
  }

  /**
   * Reset analytics state (useful for logout or privacy settings)
   */
  reset(): void {
    if (!this.config.enabled || !this.initialized || !posthog) {
      return;
    }

    try {
      posthog.reset();
      console.log('Analytics reset');
    } catch (error) {
      console.warn('Analytics reset failed:', error);
    }
  }

  /**
   * Check if analytics is enabled and initialized
   */
  isEnabled(): boolean {
    return this.config.enabled && this.initialized && !!posthog;
  }

  /**
   * Disable analytics (for privacy settings)
   */
  disable(): void {
    this.config.enabled = false;
    if (this.initialized && posthog) {
      this.reset();
    }
    console.log('Analytics disabled');
  }

  /**
   * Enable analytics (for privacy settings)
   */
  enable(): void {
    if (this.config.posthogKey && posthog) {
      this.config.enabled = true;
      if (!this.initialized) {
        this.init();
      }
      console.log('Analytics enabled');
    }
  }

  /**
   * Remove sensitive properties from analytics data
   */
  private sanitizeProperties(properties: Record<string, any>): Record<string, any> {
    const sensitiveKeys = [
      'email',
      'password',
      'phone',
      'address',
      'firstName',
      'lastName',
      'name',
      'token',
      'accessToken',
      'refreshToken',
    ];

    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(properties)) {
      // Skip sensitive keys
      if (sensitiveKeys.some(sensitiveKey => 
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      )) {
        continue;
      }

      // Only include basic data types
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined
      ) {
        sanitized[key] = value;
      } else if (Array.isArray(value)) {
        // For arrays, only include primitive values
        sanitized[key] = value.filter(item => 
          typeof item === 'string' || 
          typeof item === 'number' || 
          typeof item === 'boolean'
        );
      }
    }

    return sanitized;
  }
}

// Create singleton instance
const analytics = new Analytics();

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  // Initialize immediately, with error handling
  try {
    analytics.init();
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export default analytics;

// Named exports for convenience - these will always work even if PostHog fails
export const init = () => {
  try {
    analytics.init();
  } catch (error) {
    console.warn('Analytics init failed:', error);
  }
};

export const identify = (userId: string, properties?: Record<string, any>) => {
  try {
    analytics.identify(userId, properties);
  } catch (error) {
    console.warn('Analytics identify failed:', error);
  }
};

export const track = (event: string, properties?: Record<string, any>) => {
  try {
    analytics.track(event, properties);
  } catch (error) {
    console.warn('Analytics track failed:', error);
  }
};

export const reset = () => {
  try {
    analytics.reset();
  } catch (error) {
    console.warn('Analytics reset failed:', error);
  }
};

export const isEnabled = () => {
  try {
    return analytics.isEnabled();
  } catch (error) {
    console.warn('Analytics isEnabled failed:', error);
    return false;
  }
};

export const disable = () => {
  try {
    analytics.disable();
  } catch (error) {
    console.warn('Analytics disable failed:', error);
  }
};

export const enable = () => {
  try {
    analytics.enable();
  } catch (error) {
    console.warn('Analytics enable failed:', error);
  }
};