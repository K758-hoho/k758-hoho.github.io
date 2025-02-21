// Purpose: Eleventy configuration file
// Documentation: https://www.11ty.dev/docs/config/

import eleventyNavigationPlugin from "@11ty/eleventy-navigation"
import pluginRss from "@11ty/eleventy-plugin-rss"

import {
  getAllPosts,
  getCategoryList,
  getCategorisedPosts,
} from "./src/config/collections.js"

import { DateTime } from "luxon";

export default function (eleventyConfig) {
    // Install plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss);

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
    eleventyConfig.addLayoutAlias("post", "layouts/post")
    eleventyConfig.addLayoutAlias("home", "layouts/home")

    eleventyConfig.addDateParsing(function(dateValue) {
        if (typeof dateValue === 'string') {
          return DateTime.fromFormat(dateValue, "yyyy-MM-dd hh:mm:ss z");
        } else {
          // Handle the case where dateValue is not a string
          // You can return a default value or throw an error, depending on your needs
          return null;
        }
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