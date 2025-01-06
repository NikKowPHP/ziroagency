import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { PERFORMANCE_CONFIG } from './src/config/performance';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

// Enable bundle analyzer in development
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  // Image optimization
  images: {
    deviceSizes: PERFORMANCE_CONFIG.images.deviceSizes,
    imageSizes: PERFORMANCE_CONFIG.images.imageSizes,
    minimumCacheTTL: PERFORMANCE_CONFIG.images.minimumCacheTTL,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Optimize fonts
  optimizeFonts: true,

  // Enable SWC minification
  swcMinify: true,

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Cache optimization
  generateEtags: true,

  // Experimental features
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    scrollRestoration: true,
    
    // Configure turbo with proper options
    turbo: {
      loaders: {
        '.png': ['file-loader'],
        '.svg': ['@svgr/webpack'],
        '.jpg': ['file-loader'],
        '.jpeg': ['file-loader'],
      },
      resolveAlias: {
        '@': './src',
      },
    },
    
    optimizePackageImports: [
      '@heroicons/react',
      '@iconify/react',
      'clsx',
      'tailwind-merge',
    ],
    
    // Modern bundling
    webpackBuildWorker: true,
    
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        minimize: true,
      };

      // Split chunks optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },

  // Headers optimization
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirects for optimization
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Power by header removal
  poweredByHeader: false,

  // React strict mode
  reactStrictMode: true,


};

// Apply plugins
export default withNextIntl(withAnalyzer(config));
