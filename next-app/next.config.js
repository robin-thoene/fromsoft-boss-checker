// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [],
    },
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
