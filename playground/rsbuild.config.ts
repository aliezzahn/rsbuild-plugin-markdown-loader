import { defineConfig } from '@rsbuild/core';
import { pluginMarkdownLoader } from '../src';

export default defineConfig({
  plugins: [pluginMarkdownLoader()],
});
