import { useEffect } from 'react';

const SITE_URL = 'https://idrtech.in';

const ROUTES = {
  '/': {
    title: 'IDR Tech | Web Development Company in Bharuch, Gujarat',
    description: 'IDR Tech is a premier web development company in Bharuch, Gujarat. We build high-performance business websites, custom UI/UX designs, e-commerce platforms, hosting solutions, and site maintenance to help your brand rank and convert.',
    keywords: 'IDR Tech, web development company in Bharuch, Bharuch web developer, website design Bharuch, Gujarat web development, UI UX design Bharuch, business website India, e-commerce development, digital agency Bharuch, responsive website, website maintenance',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  '/home': {
    title: 'IDR Tech | Web Development Company in Bharuch, Gujarat',
    description: 'IDR Tech is a premier web development company in Bharuch, Gujarat. We build high-performance business websites, custom UI/UX designs, e-commerce platforms, hosting solutions, and site maintenance to help your brand rank and convert.',
    keywords: 'IDR Tech, web development company in Bharuch, Bharuch web developer, website design Bharuch, Gujarat web development, UI UX design Bharuch, business website India, e-commerce development, digital agency Bharuch, responsive website, website maintenance',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  '/about': {
    title: 'About IDR Tech | Web & Design Studio in Bharuch',
    description: 'Meet the IDR Tech team — a passionate agency based in Bharuch, Gujarat, delivering scalable digital web experiences, modern interfaces, and professional full-stack designs for growing businesses.',
    keywords: 'About IDR Tech, Indrajit Padhiyar, Drumul Thakor, Rohit Patil, web developers Bharuch, design studio Bharuch, agency team, software developers Gujarat',
    robots: 'index, follow',
  },
  '/projects': {
    title: 'IDR TECH | Portfolio',
    description: 'Explore the IDR Tech client portfolio: custom responsive business websites, React apps, refined motion interfaces, and professional full-stack developments.',
    keywords: 'web design portfolio, React showcase, web agency projects, client work IDR Tech, software engineering portfolio, web development Bharuch',
    robots: 'index, follow',
  },
  '/our-work': {
    title: 'Our Work | Web Development Portfolio | IDR Tech',
    description: 'Explore the IDR Tech client portfolio: custom responsive business websites, React apps, refined motion interfaces, and professional full-stack developments.',
    keywords: 'web design portfolio, React showcase, web agency projects, client work IDR Tech, software engineering portfolio, web development Bharuch',
    robots: 'index, follow',
  },
  '/services': {
    title: 'Our Services | Web Development, UI/UX & E-commerce | IDR Tech',
    description: 'Discover IDR Tech services: bespoke web development, custom UI/UX design systems, e-commerce stores, modern SEO optimizations, and reliable website hosting & maintenance in Bharuch.',
    keywords: 'web development services, custom website designer, React development company, UI UX consulting, SEO optimization agency, website maintenance Bharuch',
    robots: 'index, follow',
  },
  '/tech-showcase': {
    title: 'Interactive Tech Lab | Full Stack & 3D WebGL Showcase | IDR Tech',
    description: 'Step into the IDR Tech interactive full-stack laboratory: dynamic React showcases, 3D WebGL renderers, custom motion components (GSAP, Framer Motion), and comprehensive backend integrations (Node.js, Express, databases).',
    keywords: 'interactive lab, 3D WebGL React, full stack showcase, GSAP animation lab, Three.js developer, developer showcase',
    robots: 'index, follow',
  },
  '/contact': {
    title: 'Contact IDR Tech | Hire Web Developers in Bharuch',
    description: 'Get in touch with IDR Tech to launch your next web project. Request a custom design and development quote or secure priority support.',
    keywords: 'contact IDR Tech, hire web developer, website quote, design agency contact, support idr tech',
    robots: 'index, follow',
  },
  '/terms': {
    title: 'Terms of Service | IDR Tech',
    description: 'Official terms of service and usage regulations for using IDR Tech websites, products, and custom digital services.',
    keywords: 'terms of service, legal documents, idr tech terms',
    robots: 'noindex, follow',
  },
  '/privacy': {
    title: 'Privacy Policy | IDR Tech',
    description: 'Understand how IDR Tech collects, uses, updates, and protects client information and website user data.',
    keywords: 'privacy policy, compliance, data protection, security policy',
    robots: 'noindex, follow',
  },
  '/refund': {
    title: 'Refund Policy | IDR Tech',
    description: 'Our customer satisfaction commitment and standard refund policy for IDR Tech web development and related digital services.',
    keywords: 'refund policy, cancellation refund, payment terms',
    robots: 'noindex, follow',
  },
  '/cancellation': {
    title: 'Cancellation Policy | IDR Tech',
    description: 'Cancellation parameters, notice requirements, and standard terms for terminating IDR Tech contracts and digital subscriptions.',
    keywords: 'cancellation policy, terminate contract, cancel service',
    robots: 'noindex, follow',
  },
  '/disclaimer': {
    title: 'Disclaimer | IDR Tech',
    description: 'Legal disclaimers regarding the website information, resources, and advice provided by IDR Tech.',
    keywords: 'disclaimer, liability disclaimer, legal notices',
    robots: 'noindex, follow',
  },
};

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkRel(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJSONLD(id, schemaObject) {
  if (!schemaObject) {
    const el = document.getElementById(id);
    if (el) el.remove();
    return;
  }
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schemaObject);
}

function canonicalForPath(pathname) {
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  return `${SITE_URL}${path}`;
}

// Schema generators for LLM & Search Engine optimization
const generateAboutSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about/#webpage`,
  'url': `${SITE_URL}/about`,
  'name': 'About IDR Tech',
  'description': 'Meet the IDR Tech team, an agency located in Bharuch, Gujarat offering custom full-stack solutions, high performance, and visual excellence.',
  'mainEntity': {
    '@type': 'Organization',
    'name': 'IDR Tech',
    'knowsAbout': [
      'Web Development',
      'UI/UX Design',
      'E-commerce Storefronts',
      'Search Engine Optimization',
      'React & Next.js Architecture',
      'GSAP Animations'
    ],
    'founder': [
      {
        '@type': 'Person',
        'name': 'Indrajit Padhiyar',
        'jobTitle': 'Full Stack Developer',
        'url': 'https://myportfolio-78uy.onrender.com/',
        'sameAs': 'https://github.com/Indrajitpadhiyar'
      },
      {
        '@type': 'Person',
        'name': 'Drumul Thakor',
        'jobTitle': 'Frontend Developer',
        'url': 'https://drumilthakor33.github.io/Portfolio/',
        'sameAs': 'https://github.com/drumilthakor33'
      },
      {
        '@type': 'Person',
        'name': 'Rohit Patil',
        'jobTitle': 'UI/UX Designer',
        'url': 'https://roohitportfolio.onrender.com/'
      }
    ]
  }
});

const generateServicesSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/services/#service`,
  'name': 'Web Design, Development & UI/UX Solutions',
  'provider': {
    '@id': `${SITE_URL}/#organization`
  },
  'serviceOutput': 'Responsive web applications, custom user interface design systems, fast e-commerce setups, and SEO optimization.',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'IDR Tech Offerings',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Custom Web Development',
          'description': 'High-performance React/Node.js web application designs optimized for Core Web Vitals.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'UI/UX Design & Prototyping',
          'description': 'Modern, user-centric wireframing, premium color styles, custom layouts, and interactive design systems.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'E-Commerce Engineering',
          'description': 'Tailored shopping carts, secure checkout architectures, payment gateway integrations, and admin backends.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Technical SEO & Audit',
          'description': 'Implementation of modern semantic markup, structured JSON-LD schemas, and tags for Google and AI bot discovery.'
        }
      }
    ]
  }
});

const generateContactSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact/#webpage`,
  'url': `${SITE_URL}/contact`,
  'name': 'Contact IDR Tech',
  'description': 'Reach out to IDR Tech for custom web development estimates, design audits, and consulting support in Bharuch.',
  'mainEntity': {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    'name': 'IDR Tech',
    'email': 'idrtech23@gmail.com',
    'telephone': '+919714833771',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bharuch',
      'addressRegion': 'Gujarat',
      'addressCountry': 'IN'
    }
  }
});

const generateProjectsSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/projects/#webpage`,
  'url': `${SITE_URL}/projects`,
  'name': 'Web Portfolio & Case Studies',
  'description': 'Explore interactive React projects, custom web services, and user interfaces engineered by IDR Tech.'
});

const generateBreadcrumbSchema = (path) => {
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');
  if (cleanPath === '/') return null;

  const segments = cleanPath.split('/').filter(Boolean);
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `${SITE_URL}/`
    }
  ];

  let accumulatedPath = '';
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': index + 2,
      'name': name,
      'item': `${SITE_URL}${accumulatedPath}/`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${cleanPath}/#breadcrumb`,
    'itemListElement': breadcrumbElements
  };
};

/**
 * Core SEO updating function for SPA routes
 */
export function applyRouteSeo(pathname) {
  const path = pathname && pathname.length > 0 ? pathname : '/';
  const config = ROUTES[path] || ROUTES['/'];

  // 1. Title and basic metadata updates
  document.title = config.title;
  setMetaName('description', config.description);
  setMetaName('keywords', config.keywords || ROUTES['/'].keywords);
  setMetaName('author', 'IDR Tech');
  setMetaName('robots', config.robots || 'index, follow');
  setMetaName('googlebot', config.robots || 'index, follow');

  // AI discovery custom meta tags for search engines (ChatGPT, Perplexity, Gemini, etc.)
  setMetaName('x-ai-discoverability', 'high');
  setMetaName('llm-seo-optimized', '2026-compliance');

  // 2. Canonical URL tags
  const canonical = canonicalForPath(path);
  setLinkRel('canonical', canonical);

  // 3. Open Graph meta tags (Facebook, WhatsApp, LinkedIn, Discord)
  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:url', canonical);
  setMetaProperty('og:type', 'website');
  setMetaProperty('og:site_name', 'IDR Tech');
  setMetaProperty('og:locale', 'en_IN');
  setMetaProperty('og:image', `${SITE_URL}/IDR.jpeg`);

  // 4. Twitter cards meta tags
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', config.title);
  setMetaName('twitter:description', config.description);
  setMetaName('twitter:image', `${SITE_URL}/IDR.jpeg`);

  // 5. Build and inject JSON-LD Schemas
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': 'IDR Tech',
    'url': `${SITE_URL}/`,
    'logo': `${SITE_URL}/IDR.jpeg`,
    'image': `${SITE_URL}/IDR.jpeg`,
    'description': 'IDR Tech is an enterprise-level web development and UI/UX design studio based in Bharuch, Gujarat.',
    'sameAs': [
      'https://github.com/Indrajitpadhiyar',
      'https://www.linkedin.com/company/idrtech'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': `${SITE_URL}/`,
    'name': 'IDR Tech',
    'description': 'Web design and development agency in Bharuch, Gujarat.',
    'publisher': { '@id': `${SITE_URL}/#organization` },
    'inLanguage': 'en-IN'
  };

  // Static global website graph
  injectJSONLD('seo-org-website', {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema]
  });

  // Dynamic breadcrumb
  const breadcrumb = generateBreadcrumbSchema(path);
  injectJSONLD('seo-breadcrumb', breadcrumb);

  // Page Specific Schema Graph
  let pageSchema = null;
  if (path === '/' || path === '/home') {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#professional-service`,
      'name': 'IDR Tech',
      'url': `${SITE_URL}/`,
      'logo': `${SITE_URL}/IDR.jpeg`,
      'image': `${SITE_URL}/IDR.jpeg`,
      'description': 'IDR Tech is a high-performance web development and design agency based in Bharuch, Gujarat.',
      'priceRange': '$$',
      'telephone': '+919714833771',
      'email': 'idrtech23@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Bharuch',
        'addressRegion': 'Gujarat',
        'addressCountry': 'IN'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Bharuch' },
        { '@type': 'AdministrativeArea', 'name': 'Gujarat' },
        { '@type': 'Country', 'name': 'India' }
      ],
      'serviceType': [
        'Web development',
        'Website design',
        'UI/UX design',
        'E-commerce development',
        'Website maintenance'
      ]
    };
  } else if (path === '/about') {
    pageSchema = generateAboutSchema();
  } else if (path === '/services') {
    pageSchema = generateServicesSchema();
  } else if (path === '/projects' || path === '/our-work') {
    pageSchema = generateProjectsSchema();
  } else if (path === '/contact') {
    pageSchema = generateContactSchema();
  } else {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}${path}/#webpage`,
      'url': `${SITE_URL}${path}`,
      'name': config.title,
      'description': config.description
    };
  }

  injectJSONLD('seo-page-schema', pageSchema);
}

/**
 * React Hooks Integration for route pages
 */
export function useSEO(pathname) {
  useEffect(() => {
    applyRouteSeo(pathname);
  }, [pathname]);
}

/**
 * Declarative component representation of the SEO updater
 */
export function SEO({ pathname }) {
  useSEO(pathname);
  return null;
}
