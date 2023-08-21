/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/events",
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  assetPrefix: "/events",
  async rewrites() {
    return [
      /* for assets */
      {
        source: `/events/_next/:path*`,
        destination: "/_next/:path*",
      },
      /* for images */
      {
        source: `/events/images/:query*`,
        destination: "/_next/image/:query*",
      },
      {
        source: `/api/:path*`,
        destination: "/events/api/:path*",
      },
    ]
  },
}

export default nextConfig
