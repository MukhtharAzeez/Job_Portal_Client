/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      "images.pexels.com",
      "1.bp.blogspot.com",
      "img.freepik.com",
      "thumbs.dreamstime.com",
      "myawsbucketforaddpost.s3.ap-south-1.amazonaws.com",
      "m.media-amazon.com",
      "www.essenzlovo.com",
      "www.hrinasia.com",
      "cdn.pixabay.com",
      "static.vecteezy.com",
      "www.recruiter.com",
      "res.cloudinary.com"
    ],
  },
};

module.exports = nextConfig;
