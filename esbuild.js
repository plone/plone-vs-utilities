const esbuild = require('esbuild');
const fs = require('fs/promises');
const path = require('path');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/**
 * A helper function to copy static assets
 * @param {string} src The source folder
 * @param {string} dest The destination folder
 */
async function copyStaticAssets(src, dest) {
  const destPath = path.join(dest, path.basename(src));
  console.log(`[copy] Copying '${src}' to '${destPath}'`);
  await fs.cp(src, destPath, { recursive: true });
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',

  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started');
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(
          `    ${location.file}:${location.line}:${location.column}:`,
        );
      });
      console.log('[watch] build finished');
    });
  },
};

async function main() {
  // List of all static folders to copy from 'src' to 'dist'
  const staticFolders = ['language', 'grammar', 'snippets'];

  // Perform the copy operation
  try {
    for (const folder of staticFolders) {
      // We only copy if the source folder exists
      await fs.access(path.join('src', folder));
      await copyStaticAssets(path.join('src', folder), 'dist');
    }
  } catch (error) {
    // If a folder doesn't exist, we can ignore it (e.g., snippets doesn't exist yet)
    if (error.code !== 'ENOENT') {
      console.error('Error copying static files:', error);
    }
  }

  const ctx = await esbuild.context({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    outfile: 'dist/extension.js',
    external: ['vscode'],
    logLevel: 'silent',
    plugins: [
      /* add to the end of plugins array */
      esbuildProblemMatcherPlugin,
    ],
  });
  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
