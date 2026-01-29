import { Helmet } from 'react-helmet-async';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Radiance Beauty Salon';

const SEO = ({
    title = `${APP_TITLE} | AI Virtual Makeup & Hairstyling`,
    description = `Experience Bangladesh's first AI-powered virtual makeup try-on. Professional hairstyling, premium beauty services, and instant booking in Dhaka with ${APP_TITLE}.`,
    keywords = 'beauty salon Dhaka, AI makeup, virtual try-on, hairstyling Gulshan, bridal makeup, skincare Bangladesh',
    image = '/og-image.jpg',
    url = 'https://radiance-salon.vercel.app/'
}) => {
    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data (Schema.org) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BeautySalon",
                    "name": "Radiance Beauty Salon",
                    "image": image,
                    "url": url,
                    "telephone": "+8801712345678",
                    "priceRange": "$$",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Road 12, Banani",
                        "addressLocality": "Dhaka",
                        "postalCode": "1213",
                        "addressCountry": "BD"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 23.7946,
                        "longitude": 90.4043
                    },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "10:00",
                        "closes": "21:00"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
