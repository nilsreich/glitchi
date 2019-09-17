import purgeCss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import tailwind from 'tailwindcss'


const production = !process.env.ROLLUP_WATCH
const removeUnusedCss = purgeCss({
  content: ['./public/*.js','./views/*.html','./public/*.css'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

export default {
  input: 'public/client.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    postcss({
      plugins: [
        postcssImport,
        tailwind(),
        autoprefixer,
        production && removeUnusedCss,
      ].filter(Boolean),
      extract: 'public/bundle.css',
      minimize:true
    }),
    resolve(),
    commonjs(),
    production && terser(),
  ],
}