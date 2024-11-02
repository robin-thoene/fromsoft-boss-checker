/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { instrumentationHook: true },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/en/dark-souls-1',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
