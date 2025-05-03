// Loader wrapper for the Neon module
const { processMarkdown } = require('rs-markdown-parser');

module.exports = function (content, map, meta) {
  const callback = this.async();
  const options = this.getOptions();
  const filePath = this.resourcePath;

  try {
    // Call the Rust function via Neon
    const result = processMarkdown(filePath, options.gfm || false);
    callback(null, result, map, meta);
  } catch (err) {
    callback(err);
  }
};
