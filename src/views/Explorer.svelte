<script>
  import Game from "../models/game";
  import Scene from "../models/scene";
  const Electron = window.require("electron");
  import GameStore from "../store/gameStore.js";
  import { onDestroy } from "svelte";

  Electron.ipcRenderer.on("NEW_GAME", (event, message) => {
    GameStore.game.set(
      new Game({
        name: "Untitled Game",
        scenes: [new Scene({ name: "Scene 01" })]
      })
    );
  });

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
