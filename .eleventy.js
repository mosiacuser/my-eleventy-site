module.exports = function(eleventyConfig) {
  // 复制静态资产：PDF、图片、MP3、MP4等
  eleventyConfig.addPassthroughCopy("src/assets/**");  // ** 表示递归复制所有文件

  // 复制HTML页面（如果不需处理，直接复制）
  eleventyConfig.addPassthroughCopy("src/pages/*.html");

  // 定义集合：扫描所有页面（HTML和MD）
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/*.{html,md}");  // 支持HTML和MD
  });

  // 添加sitemap插件（扫描所有生成的页面）
  const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemapPath: "/sitemap.xml",  // 生成sitemap.xml
    hostname: "https://my-allstudy.netlify.app"  // 替换为你的Netlify域名
  });

  // Markdown配置（内置，无需额外安装，但可自定义）
  eleventyConfig.setLibrary("md", require("markdown-it")({
    html: true,  // 允许HTML标签
    breaks: true,  // 换行转换为<br>
    linkify: true  // 自动链接
  }));

  return {
    dir: {
      input: "src",  // 输入目录
      output: "_site",  // 输出目录（构建后站点文件）
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"]  // 支持的模板格式
  };
};