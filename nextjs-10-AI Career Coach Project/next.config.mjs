/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "tse3.mm.bing.net",
            },
            {
                protocol : "https",
                hostname : "zef.plus",
            }
        ]
    }
};

export default nextConfig;
