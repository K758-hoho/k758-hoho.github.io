const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Pass through static files
    eleventyConfig.addPassthroughCopy("src/assets/images"); // Folder for images
    eleventyConfig.addPassthroughCopy("src/assets/css"); // Folder for css
    eleventyConfig.addPassthroughCopy("src/posts"); // Folder for blog posts

    // Add a filter to format dates, e.g. {{ post.date | date("dd LLLL yyyy") }}
    eleventyConfig.addFilter("date", (dateObj, format) => {
        return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
    });

    // Add a filter to get the current year, e.g. {{ "now" | year }}
    eleventyConfig.addFilter("year", () => {
        return DateTime.now().toFormat("yyyy");
    });

    // Add a filter to get the date of a post, e.g. {{ post.date | post-time }}
    eleventyConfig.addFilter("post-time", (dateObj) => {
        return DateTime.fromJSDate(new Date(dateObj)).toFormat("HH:mm:yyyy");
    });

    // Add a filter to randomize items, e.g. {% for fact in facts | randomItem %}
    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
            return 0.5 - Math.random();
        });
        return arr.slice(0, 1);
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
        templateFormats: ["njk", "md"]
    };
};