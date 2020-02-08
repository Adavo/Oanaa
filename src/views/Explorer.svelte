<script>
  import Game from "../models/game";
  import Scene from "../models/scene";

  let game = new Game({
    name: "test",
    scenes: [new Scene({ name: "Scene 01" })]
  });
</script>

<style lang="scss">
  .explorer {
    color: white;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="explorer">
  <div class="item">+ {game.name}</div>
  {#each game.scenes as scene}
    <div class="item">++ {scene.name}</div>
  {/each}
</div>
