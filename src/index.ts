import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RsbuildPlugin } from '@rsbuild/core';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export type MarkdownLoaderOptions = {
  gfm?: boolean; // Enable GitHub-flavored markdown
};

export const pluginMarkdownLoader = (
  options: MarkdownLoaderOptions = {},
): RsbuildPlugin => ({
  name: 'plugin-markdown-loader',

  setup(api) {
    // Register the custom loader for .md files
    api.modifyRspackConfig((config) => {
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: join(__dirname, './markdown-loader.cjs'),
            options: {
              gfm: options.gfm ?? false,
            },
          },
        ],
        type: 'javascript/auto',
      });

      return config;
    });

    console.log('Markdown loader plugin registered with options:', options);
  },
});
