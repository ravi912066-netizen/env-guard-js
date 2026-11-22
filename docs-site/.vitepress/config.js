// .vitepress/config.js
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'env-guard-js',
  description: 'Lightweight environment variable validation for Node.js',
  base: '/env-guard-js/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/reference/api' },
      { text: 'GitHub', link: 'https://github.com/ravi912066-netizen/env-guard-js' }
    ],
    sidebar: {
      '/guide/': [
        { text: 'Guide', items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Custom Validation', link: '/guide/custom-validation' },
          { text: 'Error Handling', link: '/guide/error-handling' },
          { text: 'Security', link: '/guide/security' },
          { text: 'Express Integration', link: '/examples/express' }
        ]}
      ],
      '/reference/': [
        { text: 'API Reference', link: '/reference/api' },
        { text: 'Schema Reference', link: '/reference/schema' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravi912066-netizen/env-guard-js' }
    ]
  }
});
