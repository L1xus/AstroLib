/** @type {import('next').NextConfig} */
const nextConfig = {
 webpack: (config, { isServer }) => {
    // Only add the loader to the server-side Webpack configuration
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
    }

    return config;
 },
};

export default nextConfig;
