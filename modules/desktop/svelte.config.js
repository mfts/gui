import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    })
  ],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "app.html"
    }),
    alias: {
      "@tea/ui/*": "../ui/src/*"
    }
    // ssr: false,
    // hydrate the <div id="svelte"> element in src/app.html
    // target: '#svelte'
  }
};

export default config;
