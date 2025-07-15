// Initialize analytics in a way that won't block the app if it fails
let mixpanel: any;

try {
  mixpanel = await import('mixpanel-browser');
  const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token not found. Analytics will not be tracked.');
  } else {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage'
    });
    console.log('Mixpanel initialized successfully');
  }
} catch (error) {
  console.warn('Failed to initialize analytics:', error);
  // Provide a mock implementation so the app doesn't crash
  mixpanel = {
    track: (event: string, properties?: any) => {
      console.log('Analytics disabled - would track:', event, properties);
    },
    init: () => {},
  };
}

export const Analytics = {
  trackPageView: (pageName: string) => {
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
    try {
      mixpanel.track('Quiz Started', {
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to track quiz start:', error);
    }
  },

  trackQuizComplete: (results: any) => {
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