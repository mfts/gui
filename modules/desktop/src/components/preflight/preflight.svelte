<script lang="ts">
  import "$appcss";
  import { shellOpenExternal } from "@native";
  const openGithub = () => {
    shellOpenExternal("https://github.com/teaxyz");
  };
</script>

<div class="card social-box" style="width: 100%; float:right;">
  <header class="border-b border-gray pb-7 pl-5 pt-7 text-primary">PRE-FLIGHT</header>
  <div class="listbox-item border-b border-gray p-6">
    <a href="/cli">
      <p>Install Tea</p>
    </a>
  </div>
  <div class="listbox-item border-b border-gray p-6">
    <div>
      <p>Authenticate</p>
    </div>
  </div>
  <div class="listbox-item p-6">
    <button on:click={openGithub}>Give tea a star</button>
  </div>
</div>

<style>
  .card {
    border: 2px solid #949494;
    background-color: #1a1a1a;
  }

  .listbox-item {
    height: 75px;
  }
</style>
