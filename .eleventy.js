const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const readingTime = require('eleventy-plugin-reading-time');

const getAllPosts = require('./src/config/collections').getAllPosts;
const getCategoryList = require('./src/config/collections').getCategoryList;
const getCategorisedPosts = require('./src/config/collections').getCategorisedPosts;

const DateTime = require('luxon').DateTime;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addLayoutAlias("article", "layouts/article");
  eleventyConfig.addLayoutAlias("post", "layouts/post");
  eleventyConfig.addLayoutAlias("home", "layouts/home");

  eleventyConfig.addDateParsing(function(dateValue) {
    if (typeof dateValue === 'string') {
      return DateTime.fromFormat(dateValue, "yyyy-MM-dd hh:mm:ss z");
    } else {
      return null;
    }
  });

  eleventyConfig.addFilter("year", function() {
    return DateTime.now().toFormat("yyyy");
  });

  eleventyConfig.addFilter("randomItem", function(arr) {
    arr.sort(function() {
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