import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export default function WebVitalsReporter() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      // Send to our metrics endpoint
      fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
          url: window.location.href,
          timestamp: Date.now(),
        }),
      }).catch(console.warn);

      // Also log to console for development
      console.log('[Web Vitals]', metric);
    };

    // Collect all Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null; // This component doesn't render anything
}
