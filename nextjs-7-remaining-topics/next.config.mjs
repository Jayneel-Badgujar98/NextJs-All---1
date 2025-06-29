/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "s3.amazonaws.com",
                pathname : "/cdn-origin-etr.akc.org/**"
            },
            {
                protocol : "https",
                hostname : "images.unsplash.com",
                pathname : "/**"
            }
        ]
    }
    
};



export default nextConfig;
