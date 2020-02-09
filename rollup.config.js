import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import babel from "rollup-plugin-babel";
import builtins from "@joseph184/rollup-plugin-node-builtins";

const production = !process.env.ROLLUP_WATCH;
const preprocess = sveltePreprocess({
    scss: {
        data: `@import 'src/styles/color.scss';`,
        includePaths: ["src"]
    },
    postcss: {
        plugins: [autoprefixer]
    }
});

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js"
    },
    plugins: [
        svelte({
            dev: !production, // enable run-time checks when not in production
            preprocess, // execute method for SaSS
            css: css => {
                css.write("public/build/bundle.css");
            } // improve perf
        }),
        builtins(),
        babel({
            extensions: [".js", ".mjs", ".html", ".svelte"],
            include: ["src/**", "node_modules/svelte/**"],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "usage",
                        corejs: 3
                    }
                ]
            ],
            plugins: ["@babel/plugin-proposal-class-properties"]
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;
    return {
        writeBundle() {
            if (!started) {
                started = true;
                require("child_process").spawn(
                    "npm",
                    ["run", "electron"],
                    {
                        stdio: ["ignore", "inherit", "inherit"],
                        shell: true
                    }
                );
                /*
                require("child_process").spawn(
                    "npm",
                    ["run", "start", "--", "--dev"],
                    {
                        stdio: ["ignore", "inherit", "inherit"],
                        shell: true
                    }
                );
                */
            }
        }
    };
}
