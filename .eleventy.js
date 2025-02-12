const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Pass through static files
    eleventyConfig.addPassthroughCopy("src/assets"); // Adjust this if you have static assets

    // Add a filter to format dates
    eleventyConfig.addFilter("date", (dateObj, format) => {
        return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
    });

    // Add a filter to get the current year
    eleventyConfig.addFilter("year", () => {
        return DateTime.now().toFormat("yyyy");
    });

    return {
      dir: {
        input: "src",
        output: "docs",
      },
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      dataTemplateEngine: 'njk',
    };
};