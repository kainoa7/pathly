import mixpanel from 'mixpanel-browser';

const initAnalytics = () => {
  try {
    const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

    if (!MIXPANEL_TOKEN) {
      console.warn('Mixpanel token not found. Analytics will not be tracked.');
      return false;
    }

    mixpanel.init(MIXPANEL_TOKEN, {
      debug: import.meta.env.DEV,
      track_pageview: true,
      persistence: 'localStorage'
    });
    
    console.log('Mixpanel initialized successfully');
    return true;
  } catch (error) {
    console.warn('Failed to initialize analytics:', error);
    return false;
  }
};

const isInitialized = initAnalytics();

export const Analytics = {
  trackPageView: (pageName: string) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Page View', {
        page: pageName,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }
  },

  trackQuizStart: () => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Quiz Started', {
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track quiz start:', error);
    }
  },

  trackQuizComplete: (results: any) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Quiz Completed', {
        results,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track quiz completion:', error);
    }
  },

  trackFeatureUsage: (featureName: string) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Feature Used', {
        feature: featureName,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track feature usage:', error);
    }
  },

  trackUserSignup: (method: string) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('User Signup', {
        method,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track user signup:', error);
    }
  },

  trackCareerPathView: (careerPath: string) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Career Path Viewed', {
        path: careerPath,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track career path view:', error);
    }
  },

  trackInteraction: (componentId: string, action: string) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('User Interaction', {
        component: componentId,
        action,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track interaction:', error);
    }
  },

  trackTimeSpent: (sectionName: string, timeInSeconds: number) => {
    if (!isInitialized) return;
    try {
      mixpanel.track('Time Spent', {
        section: sectionName,
        duration: timeInSeconds,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track time spent:', error);
    }
  }
};

export default Analytics; 