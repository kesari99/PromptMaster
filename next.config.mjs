/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        domains: ['lh3.googleusercontent.com'], // Correct domain
    },
    webpack(config, { isServer }) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                child_process: false,
                fs: false,
                net: false,
                tls: false,
                dns: false, // Add fallback for dns module
            };
        }

        return config;
    },
    reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  output: 'export',
};

export default nextConfig;
