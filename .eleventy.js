const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Pass through static files
    eleventyConfig.addPassthroughCopy("src/assets"); //Folder for static assets like images, css, js
    eleventyConfig.addPassthroughCopy("src/posts"); // Folder for blog posts

    // Add a filter to format dates
    eleventyConfig.addFilter("date", (dateObj, format) => {
        return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
    });

    // Add a filter to get the current year
    eleventyConfig.addFilter("year", () => {
        return DateTime.now().toFormat("yyyy");
    });

    // Add a filter to get the post time
    eleventyConfig.addFilter("post-time", (dateObj) => {
        return DateTime.fromJSDate(new Date(dateObj)).toFormat("HH:mm:yyyy");
    });

    return {
      dir: {
        input: "src",
        includes: "_includes",
        output: "docs",
      },
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      dataTemplateEngine: 'njk',
    };
};