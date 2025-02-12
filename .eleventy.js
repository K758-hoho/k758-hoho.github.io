module.exports = function (eleventyConfig) {
    // Pass through static files
    eleventyConfig.addPassthroughCopy("src/assets"); // Adjust this if you have static assets

    return {
      dir: {
        input: "src",
        output: "docs",
      },
    };
};