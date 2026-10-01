import type {NextConfig} from 'next';

const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/agent-skills/index.json>; rel="describedby"',
  '</llms.txt>; rel="describedby"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"',
  '</auth.md>; rel="auth"',
  '</.well-known/openid-configuration>; rel="openid-configuration"',
].join(', ');

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Every route is a directory; canonicals, sitemaps and internal links all use the trailing slash.
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  async redirects() {
    return [
      // www -> apex (http -> https is automatic on Vercel)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.doctorsofwhisky.com.au' }],
        destination: 'https://doctorsofwhisky.com.au/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: [...SECURITY_HEADERS, { key: 'Link', value: LINK_HEADER }] },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/.well-known/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
