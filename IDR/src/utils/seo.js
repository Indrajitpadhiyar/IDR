const SITE_URL = 'https://idrtech.in';

const ROUTES = {
  '/': {
    title: 'IDR Tech | Web Development Company in Bharuch, Gujarat',
    description:
      'IDR Tech is a web development company in Bharuch, Gujarat. We build business websites, UI/UX design, e-commerce, hosting, and maintenance so your brand ranks and converts online.',
  },
  '/about': {
    title: 'About IDR Tech | Web & Design Studio in Bharuch',
    description:
      'Meet IDR Tech — a Bharuch, Gujarat team focused on modern websites, UI/UX, and digital solutions for growing businesses across India.',
  },
  '/projects': {
    title: 'Our Work | Web Development Portfolio | IDR Tech',
    description:
      'Explore IDR Tech projects: websites, interfaces, and digital builds for clients. Web development and design company based in Bharuch, Gujarat.',
  },
  '/services': {
    title: 'Our Services | Web Development, UI/UX & E-commerce Solutions | IDR Tech',
    description:
      'IDR Tech provides modern web development, UI/UX design, e-commerce solutions, SEO optimization, and website maintenance services in Bharuch, Gujarat.',
  },
  '/terms': {
    title: 'Terms of Service | IDR Tech',
    description: 'Terms of service for using IDR Tech websites and digital services.',
  },
  '/privacy': {
    title: 'Privacy Policy | IDR Tech',
    description: 'How IDR Tech collects, uses, and protects your information when you use our website and services.',
  },
  '/refund': {
    title: 'Refund Policy | IDR Tech',
    description: 'Refund policy for IDR Tech web development and related services.',
  },
  '/cancellation': {
    title: 'Cancellation Policy | IDR Tech',
    description: 'Cancellation policy for IDR Tech services and engagements.',
  },
  '/disclaimer': {
    title: 'Disclaimer | IDR Tech',
    description: 'Disclaimer for the IDR Tech website and informational content.',
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

function canonicalForPath(pathname) {
  if (!pathname || pathname === '/') {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${pathname}`;
}

/**
 * Updates document title and meta tags after client navigation (SPA).
 * Initial HTML defaults are set in index.html for non-JS crawlers and first paint.
 */
export function applyRouteSeo(pathname) {
  const path = pathname && pathname.length > 0 ? pathname : '/';
  const config = ROUTES[path] || ROUTES['/'];

  document.title = config.title;
  setMetaName('description', config.description);

  const canonical = canonicalForPath(path === '/' ? '/' : path);
  setLinkRel('canonical', canonical);

  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:url', canonical);

  setMetaName('twitter:title', config.title);
  setMetaName('twitter:description', config.description);
}
