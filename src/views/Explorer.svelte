<script>
  import GameStore from "../store/gameStore.js";
  let game = GameStore.game;
</script>

<style lang="scss">
  .explorer {
    color: white;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="explorer">
  {#if $game}
    <div class="item">+ {$game.name}</div>
    {#each $game.scenes as scene}
      <div class="item">++ {scene.name}</div>
    {/each}
  {/if}
</div>
