/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/kioscos', destination: '/demo-kioscos/index.html' },
      { source: '/kioscos/', destination: '/demo-kioscos/index.html' },
      { source: '/kioscos/nuovo-market', destination: '/demo-kioscos/nuovo-market/index.html' },
      { source: '/kioscos/nuovo-market/', destination: '/demo-kioscos/nuovo-market/index.html' },
      { source: '/admin', destination: '/demo-kioscos/nuovo-market/admin.html' },
      { source: '/admin/', destination: '/demo-kioscos/nuovo-market/admin.html' },
    ];
  },
};

module.exports = nextConfig;
