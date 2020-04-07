module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: [`/connect/*`] }
    }
  ]
};
