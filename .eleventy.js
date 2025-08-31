const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

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

  return {
    dir: {
      input: "src",
      includes: "_includes"
    }
  };
};
