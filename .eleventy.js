// Purpose: Eleventy configuration file
// Documentation: https://www.11ty.dev/docs/config/

import eleventyNavigationPlugin from "@11ty/eleventy-navigation"
import pluginRss from "@11ty/eleventy-plugin-rss"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"

import {
  getAllPosts,
  getCategoryList,
  getCategorisedPosts,
} from "/src/config/collections.js"

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Install plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);

    // Pass through static files
    eleventyConfig.addPassthroughCopy("src/assets/images"); // Folder for images
    eleventyConfig.addPassthroughCopy("src/assets/css"); // Folder for css
    eleventyConfig.addPassthroughCopy("src/assets/posts"); // Folder for blog posts

    // Add collections
    eleventyConfig.addCollection("blog", getAllPosts)
    eleventyConfig.addCollection("categoryList", getCategoryList)
    eleventyConfig.addCollection("categorisedPosts", getCategorisedPosts)

    // Add layour aliases
    eleventyConfig.addLayoutAlias("page", "layouts/page")
    eleventyConfig.addLayoutAlias("article", "layouts/article")

    // Add date parsing, e.g. {{ page.date | dateToFormat("yyyy-MM-dd hh:mm:ss location") }} or 2019-08-31 23:59:56 America/New_York
    eleventyConfig.addDateParsing(function(dateValue) {
		return DateTime.fromFormat(dateValue, "yyyy-MM-dd hh:mm:ss z");
	});

    // Add a filter to get the current year, e.g. {{ "now" | year }}
    eleventyConfig.addFilter("year", () => {
        return DateTime.now().toFormat("yyyy");
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