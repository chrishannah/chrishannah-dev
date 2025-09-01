const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

const readingTime = require('eleventy-plugin-reading-time');

module.exports = function (eleventyConfig) {

  /* Assets */
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy("src/images/");

  /* Filters */
  eleventyConfig.addNunjucksFilter("date", require("./src/filters/date.js"));

  /* Collections */
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  });

  /* Feeds */
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "chrishannah.dev",
      base: "https://chrishannah.dev",
      author: {
        name: "Chris Hannah",
      }
    }
  });

  /* Plugins */
  eleventyConfig.addPlugin(readingTime);

  /* Debug */
  eleventyConfig.addFilter('dump', obj => {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) return;
          seen.add(value);
        }
        return value;
      };
    };
    return JSON.stringify(obj, getCircularReplacer(), 2);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes"
    }
  };
};
