# Analytics & Tracking Setup Guide

## Overview
The Radiance Beauty Salon application now has comprehensive analytics tracking infrastructure in place. This guide explains how to activate and configure the tracking services.

## 🎯 What's Already Implemented

### 1. **Google Analytics 4 (GA4)**
- **File**: `src/utils/analytics.js`
- **Status**: Code ready, needs Measurement ID
- **Events Tracked**:
  - Page views
  - Booking funnel (service selection, stylist selection, payment completion)
  - Virtual Try-On interactions (camera activation, product selection, look saves)
  - User engagement (chatbot opens, newsletter signups)

### 2. **Microsoft Clarity**
- **File**: `src/utils/analytics.js`
- **Status**: Code ready, needs Project ID
- **Features**: Heatmaps, session recordings, user behavior insights

### 3. **Event Tracking**
- **Booking Wizard**: Tracks complete conversion funnel
- **Makeup Studio**: Tracks product interactions and saves
- **App.jsx**: Tracks initial page load

## 🚀 Activation Steps

### Step 1: Get Your Tracking IDs

#### Google Analytics 4:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Microsoft Clarity:
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project
3. Copy your **Project ID**

### Step 2: Update Configuration

Open `src/utils/analytics.js` and replace the placeholder IDs:

```javascript
// Line 6: Replace with your actual GA4 Measurement ID
ReactGA.initialize('G-YOUR-ACTUAL-MEASUREMENT-ID');

// Line 13: Replace with your actual Clarity Project ID
})(window, document, "clarity", "script", "YOUR-ACTUAL-CLARITY-ID");
```

### Step 3: Verify Installation

1. Run the development server: `npm run dev`
2. Open browser DevTools → Console
3. You should see: `"Analytics Initialized (GA4)"`
4. Check Network tab for requests to:
   - `google-analytics.com/g/collect`
   - `clarity.ms`

## 📊 Tracked Events Reference

### Booking Events
```javascript
AnalyticsEvents.BOOKING.STARTED              // Wizard opened
AnalyticsEvents.BOOKING.SERVICE_SELECTED     // Service chosen
AnalyticsEvents.BOOKING.STYLIST_SELECTED     // Stylist chosen
AnalyticsEvents.BOOKING.COMPLETED            // Payment successful (CONVERSION)
```

### Virtual Try-On Events
```javascript
AnalyticsEvents.VIRTUAL_TRY_ON.OPENED        // Camera activated
AnalyticsEvents.VIRTUAL_TRY_ON.PRODUCT_SELECTED  // Product/preset applied
AnalyticsEvents.VIRTUAL_TRY_ON.LOOK_SAVED    // Look saved to bag
```

### Engagement Events
```javascript
AnalyticsEvents.ENGAGEMENT.CHATBOT_OPENED
AnalyticsEvents.ENGAGEMENT.NEWSLETTER_SIGNUP
```

## 🔍 Monitoring & Insights

### In Google Analytics:
- **Realtime**: See live user activity
- **Events**: View all tracked interactions
- **Conversions**: Mark `booking_completed_purchase` as a conversion goal
- **Funnels**: Create visualization of booking flow

### In Microsoft Clarity:
- **Heatmaps**: See where users click
- **Recordings**: Watch actual user sessions
- **Insights**: AI-powered behavior analysis

## 🛡️ Privacy & GDPR Compliance

**Important**: The current implementation tracks all users by default. For GDPR compliance:

1. Add a cookie consent banner
2. Only initialize analytics after user consent
3. Update Privacy Policy to mention tracking
4. Provide opt-out mechanism

Example consent check:
```javascript
// In App.jsx useEffect
const hasConsent = localStorage.getItem('analytics_consent') === 'true';
if (hasConsent) {
    initAnalytics();
    trackPageView(window.location.pathname);
}
```

## 📈 Recommended Dashboards

### GA4 Custom Reports:
1. **Booking Conversion Funnel**
   - Started → Service → Stylist → Payment
   - Shows drop-off at each step

2. **Virtual Try-On Engagement**
   - Camera activations
   - Products tried
   - Looks saved

3. **Traffic Sources**
   - Where users come from
   - Which channels convert best

## 🔧 Troubleshooting

### Events not showing in GA4:
- Check Measurement ID is correct
- Wait 24-48 hours for data to appear
- Use GA4 DebugView for real-time validation

### Clarity not recording:
- Verify Project ID
- Check browser console for errors
- Ensure site is publicly accessible (Clarity can't track localhost)

## 📝 Next Steps

1. **Set up conversion goals** in GA4 for booking completions
2. **Create custom dashboards** for key metrics
3. **Set up alerts** for unusual traffic patterns
4. **Integrate with Google Ads** for campaign tracking
5. **Add UTM parameters** to marketing links

## 🎓 Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Clarity Help Center](https://docs.microsoft.com/en-us/clarity/)
- [react-ga4 Library](https://github.com/codler/react-ga4)
