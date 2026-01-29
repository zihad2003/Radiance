import ReactGA from 'react-ga4';

// Initialize Analytics Service
export const initAnalytics = () => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;

    // Google Analytics 4
    if (gaId) {
        ReactGA.initialize(gaId);
        console.log("Analytics Initialized (GA4)");
    }

    // Microsoft Clarity (Injected dynamically)
    if (clarityId) {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", clarityId);
    }
};

// Track Page Views (SPA support)
export const trackPageView = (path) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

// Track Specific Events
export const trackEvent = (category, action, label = null, value = null) => {
    const eventParams = {
        category,
        action,
        label,
    };

    // Ensure value is a strictly a number (GA4 requirement)
    if (value !== null && value !== undefined) {
        if (typeof value === 'number') {
            eventParams.value = value;
        } else {
            const parsed = parseFloat(value);
            if (!isNaN(parsed)) {
                eventParams.value = parsed;
            } else {
                console.warn(`[Analytics] Ignored non-numeric value for ${action}:`, value);
            }
        }
    }

    ReactGA.event(eventParams);
    console.log(`[Event Tracked] ${category}: ${action}`);
};

// Pre-defined Funnels for Consistency
export const AnalyticsEvents = {
    BOOKING: {
        STARTED: 'booking_started',
        SERVICE_SELECTED: 'booking_service_selected',
        STYLIST_SELECTED: 'booking_stylist_selected',
        DATE_SELECTED: 'booking_date_selected',
        DETAILS_COMPLETED: 'booking_details_completed',
        COMPLETED: 'booking_completed_purchase', // Conversion!
        FAILED: 'booking_failed'
    },
    VIRTUAL_TRY_ON: {
        OPENED: 'vto_opened',
        PRODUCT_SELECTED: 'vto_product_tried',
        PHOTO_CAPTURED: 'vto_photo_captured',
        LOOK_SAVED: 'vto_look_saved'
    },
    ENGAGEMENT: {
        CHATBOT_OPENED: 'engagement_chatbot_opened',
        NEWSLETTER_SIGNUP: 'engagement_newsletter_signup'
    }
};
