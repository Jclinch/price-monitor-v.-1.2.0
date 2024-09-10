/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ng.jumia.is'], // Add your domains here
      },
};

export default nextConfig;


// next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'ng.jumia.is',
//         port: '', // Leave empty if not using a specific port
//         pathname: '/**', // Allow all paths
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
