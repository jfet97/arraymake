import cleanup from "rollup-plugin-cleanup";
import minify from "rollup-plugin-babel-minify";
import pkg from "./package.json";
import multiInput from 'rollup-plugin-multi-input';

export default {
  input: ["src/index.js", "src/functional.js"],
  output: [
    {
      dir: "dist/",
      format: "cjs",
      esModule: false,
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ],
  plugins: [
    multiInput({ relative: 'src/' }),
    cleanup({
      comments: "none",
      extensions: ["js"]
    }),
    minify({}),,
  ]
};
