/** @type {import('next').NextConfig} */
const nextConfig = {
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
