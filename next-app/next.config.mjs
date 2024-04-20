/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dark-souls-1',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
