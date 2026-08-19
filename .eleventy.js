module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/script.js');
    eleventyConfig.addPassthroughCopy('./src/assets');

    // Recent posts: newest first
    eleventyConfig.addCollection('recent', (c) =>
        c.getFilteredByTag('blog').sort((a, b) => b.date - a.date)
    );

    // Most viewed posts: highest views first
    eleventyConfig.addCollection('popular', (c) =>
        c.getFilteredByTag('blog').sort((a, b) => (b.data.views || 0) - (a.data.views || 0))
    );

    // Human readable date
    eleventyConfig.addFilter('readableDate', (d) =>
        new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    );

    // Take first N items
    eleventyConfig.addFilter('limit', (arr, n) => arr.slice(0, n));

    // Related posts: same category, excluding the current one
    eleventyConfig.addFilter('related', (posts, currentUrl, category) =>
        posts.filter((p) => p.url !== currentUrl && p.data.category === category).slice(0, 3)
    );

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
    };
};
