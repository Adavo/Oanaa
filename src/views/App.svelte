<script>
  import Viewer from "./Viewer.svelte";
  import Toolbox from "./Toolbox.svelte";
  import Explorer from "./Explorer.svelte";
  import Menu from "./Menu.svelte";

  let rightWidth = 300;
  let isResizing = false;

  function resize(event) {
    if (isResizing) {
      //rightWidth-=event.movementX;
    }
  }
</script>

<style lang="scss">
  .left {
    background-color: $color_Vulcan;
    display: flex;
    width: 200px;
    height: 100%;
  }

  .middle {
    height: 100%;
    display: flex;
    flex: 1;
  }

  .right {
    display: flex;
    height: 100%;
    position: relative;
    .resizer {
      display: none;
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 10px;
      background-color: grey;
      cursor: col-resize;
    }
  }
</style>

<main>
  <Menu />
  <div class="left">
    <Explorer />
  </div>
  <div class="middle">
    <Viewer />
  </div>
  <div class="right" style={'width:' + rightWidth + 'px;'}>
    <div
      class="resizer"
      on:mousemove={resize}
      on:mousedown={() => (isResizing = true)}
      on:mouseup={() => (isResizing = false)}
      on:mouseleave={() => (isResizing = false)} />
    <Toolbox />
  </div>
</main>
