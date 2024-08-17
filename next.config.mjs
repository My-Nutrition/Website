import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.services.kitchenstories.io",
            "www.eatingwell.com",
            "www.tasteofhome.com",
            "images.immediate.co.uk",
            "img.taste.com.au",
        ],
    },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
