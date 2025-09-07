// Analytics Events für bessere Conversion-Tracking

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', eventName, properties);
  }
  
  // Google Analytics 4 (falls vorhanden)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  
  // Plausible Analytics (falls vorhanden)
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: properties });
  }
  
  // Console für Development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
};

// Spezifische Events
export const trackPropertyClick = (propertyId: string, propertyTitle: string) => {
  trackEvent('property_click', {
    property_id: propertyId,
    property_title: propertyTitle
  });
};

export const trackFilterUsage = (filterType: string, filterValue: string) => {
  trackEvent('filter_used', {
    filter_type: filterType,
    filter_value: filterValue
  });
};

export const trackCTAClick = (ctaType: string, location: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    location: location
  });
};

export const trackContactFormSubmit = (interest: string) => {
  trackEvent('contact_form_submit', {
    interest: interest
  });
};
