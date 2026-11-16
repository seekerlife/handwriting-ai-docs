import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Handwriting AI API",
  description: "Create a handwritten JPEG, PNG, or PDF in one request and download it from a short-lived link.",
  lang: "en-US",
  cleanUrls: true,
  lastUpdated: false,
  sitemap: {
    hostname: "https://docs.handwriting-ai.com",
  },
  head: [
    ["meta", { property: "og:site_name", content: "Handwriting AI API" }],
  ],
  themeConfig: {
    siteTitle: "Handwriting AI API",
    search: { provider: "local" },
    nav: [
      { text: "Guide", link: "/quickstart" },
      { text: "Reference", link: "/reference" },
      { text: "handwriting-ai.com", link: "https://handwriting-ai.com" },
    ],
    sidebar: [
      {
        text: "Start",
        items: [
          { text: "Overview", link: "/" },
          { text: "Quickstart", link: "/quickstart" },
          { text: "Authentication", link: "/authentication" },
        ],
      },
      {
        text: "Create a page",
        items: [
          { text: "Render", link: "/renders" },
          { text: "Page setup", link: "/page-setup" },
          { text: "Handwriting", link: "/handwriting" },
          { text: "Fonts", link: "/fonts" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Request and response", link: "/reference" },
          { text: "Limits", link: "/limits" },
          { text: "Errors", link: "/errors" },
          { text: "Node.js client", link: "/sdk" },
        ],
      },
    ],
    footer: {
      message: "Keys are enabled after you request access.",
      copyright: "Handwriting AI",
    },
  },
});
