// Analytics - Disabled Implementation
// Mixpanel removed by user request

const initAnalytics = () => {
  console.log('Analytics disabled - no tracking');
  return false;
};

const isInitialized = false;

export const Analytics = {
  trackPageView: (pageName: string) => {
    // No-op - analytics disabled
    console.debug(`Page view: ${pageName}`);
  },

  trackEvent: (eventName: string, properties?: any) => {
    // No-op - analytics disabled
    console.debug(`Event: ${eventName}`, properties);
  },

  trackUserSignup: (accountType: 'EXPLORER' | 'PRO' | 'PREMIUM') => {
    // No-op - analytics disabled
    console.debug(`User signup: ${accountType}`);
  },

  trackQuizCompletion: (quizType: string, results: any) => {
    // No-op - analytics disabled
    console.debug(`Quiz completion: ${quizType}`, results);
  },

  trackFeatureUsage: (feature: string, context?: any) => {
    // No-op - analytics disabled
    console.debug(`Feature usage: ${feature}`, context);
  },

  trackCareerPathSelection: (major: string, interests: string[]) => {
    // No-op - analytics disabled
    console.debug(`Career path selection: ${major}`, interests);
  },

  trackResourceAccess: (resourceType: string, resourceId: string) => {
    // No-op - analytics disabled
    console.debug(`Resource access: ${resourceType}/${resourceId}`);
  },

  trackUserEngagement: (action: string, duration?: number) => {
    // No-op - analytics disabled
    console.debug(`User engagement: ${action}`, duration);
  },

  trackError: (error: string, context?: any) => {
    // No-op - analytics disabled
    console.debug(`Error tracked: ${error}`, context);
  },

  trackConversion: (conversionType: string, value?: number) => {
    // No-op - analytics disabled
    console.debug(`Conversion: ${conversionType}`, value);
  },

  identifyUser: (userId: string, traits?: any) => {
    // No-op - analytics disabled
    console.debug(`User identified: ${userId}`, traits);
  },

  setUserProperty: (property: string, value: any) => {
    // No-op - analytics disabled
    console.debug(`User property: ${property} = ${value}`);
  },

  trackPlatformGrowth: (metric: string, value: number) => {
    // No-op - analytics disabled
    console.debug(`Platform growth: ${metric} = ${value}`);
  },

  trackNewsEngagement: (articleId: string, action: string) => {
    // No-op - analytics disabled
    console.debug(`News engagement: ${articleId}/${action}`);
  },

  trackFeedback: (feedbackType: string, rating?: number, comment?: string) => {
    // No-op - analytics disabled
    console.debug(`Feedback: ${feedbackType}`, { rating, comment });
  }
};

export default Analytics; 