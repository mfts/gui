<script lang="ts">
  export let coverUrl = "";
  let clazz = "";
  export { clazz as class };
</script>

<figure class="relative mb-8 h-32 w-full uppercase {clazz}">
  {#if coverUrl}
    <img src={coverUrl} class="absolute z-0 h-32 w-full object-cover" alt="cover" />
  {/if}
  <div class="absolute bottom-0 text-6xl leading-[32px] text-primary">
    <slot />
  </div>
</figure>
