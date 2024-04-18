module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so'
      },
      {
        hostname: 'lh5.googleusercontent.com'
      },
      {
        hostname: 's3-us-west-2.amazonaws.com'
      },
    ],
  },
}
