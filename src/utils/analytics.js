import ReactGA from 'react-ga4';

const isDev = process.env.NODE_ENV === 'development';
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  try {
    if (!MEASUREMENT_ID) {
      console.warn('GA Measurement ID not found');
      return;
    }

    ReactGA.initialize(MEASUREMENT_ID, {
      debug: isDev,
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
    
    if (isDev) console.log('GA initialized');
  } catch (error) {
    console.warn('GA initialization failed:', error);
  }
};

// Track page views
export const logPageView = () => {
  try {
    if (isDev) console.log('Page view:', window.location.pathname);
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  } catch (error) {
    console.warn('Failed to log page view:', error);
  }
};

// Track events
export const logEvent = (category, action, label) => {
  try {
    if (isDev) console.log('Event:', { category, action, label });
    ReactGA.event({
      category,
      action,
      label: typeof label === 'object' ? JSON.stringify(label) : label,
    });
  } catch (error) {
    console.warn('Failed to log event:', error);
  }
};

// Track user engagement
export const trackEngagement = (type, data) => {
  try {
    if (isDev) console.log('Engagement:', { type, data });
    ReactGA.event({
      category: 'Engagement',
      action: type,
      label: typeof data === 'object' ? JSON.stringify(data) : data,
    });
  } catch (error) {
    console.warn('Failed to track engagement:', error);
  }
};

// Track errors
export const trackError = (error, componentStack) => {
  try {
    if (isDev) console.log('Error:', { error, componentStack });
    ReactGA.exception({
      description: error?.message || String(error),
      fatal: true,
      componentStack: String(componentStack),
    });
  } catch (analyticsError) {
    console.warn('Failed to track error:', analyticsError);
  }
};
