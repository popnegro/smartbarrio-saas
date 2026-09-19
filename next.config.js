/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/kioscos', destination: '/categoria/kioscos' },
      { source: '/kioscos/', destination: '/categoria/kioscos' },
      { source: '/kioscos/nuovo-market', destination: '/comercio/kiosco-la-esquina' },
      { source: '/kioscos/nuovo-market/', destination: '/comercio/kiosco-la-esquina' },
      { source: '/admin', destination: '/admin' },
      { source: '/admin/', destination: '/admin' }
    ];
  }
};
module.exports = nextConfig;