module.exports = function (eleventyConfig) {
    // Pass through static files
    eleventyConfig.addPassthroughCopy("src"); // Adjust this if you have static assets

    return {
      dir: {
        input: "src",
        output: "docs",
      },
    };
};