export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  locale?: 'de' | 'en' | 'th';
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEOTags(props: SEOProps) {
  const {
    title = "Weib-Coding – Immobilien Pattaya",
    description = "Immobilien, Beratung und Service in Pattaya",
    image = "https://weib-coding.vercel.app/images/og-default.jpg",
    url = "https://weib-coding.vercel.app",
    locale = 'de',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = "Weib-Coding Real Estate",
    section,
    tags = []
  } = props;

  const localeMap = {
    de: 'de_DE',
    en: 'en_US', 
    th: 'th_TH'
  };

  const titleMap = {
    de: 'Weib-Coding – Immobilien Pattaya',
    en: 'Weib-Coding – Real Estate Pattaya',
    th: 'Weib-Coding – อสังหาริมทรัพย์ พัทยา'
  };

  const descriptionMap = {
    de: 'Immobilien, Beratung und Service in Pattaya',
    en: 'Real estate, consultation and service in Pattaya',
    th: 'อสังหาริมทรัพย์ คำปรึกษา และบริการในพัทยา'
  };

  return {
    title: title || titleMap[locale],
    description: description || descriptionMap[locale],
    image,
    url,
    locale: localeMap[locale],
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags
  };
}

export function generateStructuredData(props: SEOProps & { 
  property?: any;
  district?: any;
  organization?: any;
}) {
  const seo = generateSEOTags(props);
  const { property, district, organization } = props;

  // Base Organization Schema
  const baseOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Weib-Coding Real Estate",
    "url": "https://weib-coding.vercel.app",
    "logo": "https://weib-coding.vercel.app/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pattaya",
      "addressCountry": "TH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-XX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["German", "English", "Thai"]
    },
    "sameAs": [
      "https://www.facebook.com/weib-coding",
      "https://www.instagram.com/weib-coding"
    ]
  };

  // Property Schema
  if (property) {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.description,
      "url": property.url,
      "image": property.cover ? [property.cover] : [],
      "offers": {
        "@type": "Offer",
        "price": property.price_thb,
        "priceCurrency": "THB",
        "availability": property.status === 'available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location || "Pattaya",
        "addressCountry": "TH"
      },
      "geo": property.lat && property.lng ? {
        "@type": "GeoCoordinates",
        "latitude": property.lat,
        "longitude": property.lng
      } : undefined,
      "numberOfRooms": property.bedrooms,
      "numberOfBathroomsTotal": property.bathrooms,
      "floorSize": property.living_sqm ? {
        "@type": "QuantitativeValue",
        "value": property.living_sqm,
        "unitCode": "MTK"
      } : undefined,
      "publisher": baseOrg
    };
  }

  // District Schema
  if (district) {
    return {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": district.name,
      "description": district.description,
      "url": district.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pattaya",
        "addressCountry": "TH"
      },
      "geo": district.lat && district.lng ? {
        "@type": "GeoCoordinates",
        "latitude": district.lat,
        "longitude": district.lng
      } : undefined,
      "containsPlace": district.properties?.map((p: any) => ({
        "@type": "RealEstateListing",
        "name": p.title,
        "url": p.url
      }))
    };
  }

  // Default Website Schema
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seo.title,
    "description": seo.description,
    "url": seo.url,
    "publisher": baseOrg,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://weib-coding.vercel.app/{locale}/properties/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
