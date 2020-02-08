<script>
  let selectedTool = "";
</script>

<style lang="scss">
  .toolbox {
    width: 100%;
    height: 100%;
    background-color: $color_toolbox_background;
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;

    .element {
      cursor: pointer;
      margin: 25px;
      justify-content: center;
      align-items: center;
      display: flex;
      border: 1px solid black;

      &.selected {
        background-color: #F1C232 !important;
      }

      &.rectangle {
        width: 100px;
        height: 50px;
        background-color: white;
      }


      &.button {
        width: 100px;
        height: 50px;
        box-shadow: 2px 2px 2px #525151;
        background-color: white;
      }

      &.text {
        margin: 25px 50px;
        width: 50px;
        height: 50px;
        background-color: white;
      }
    }
  }
</style>

<div class="toolbox">
  <div
    class="element rectangle {selectedTool === 'rectangle' ? 'selected' : ''}"
    on:click={() => (selectedTool = 'rectangle')}>
    Rectangle
  </div>
  <div
    class="element text {selectedTool === 'text' ? 'selected' : ''}"
    on:click={() => (selectedTool = 'text')}>
    Aa
  </div>

</div>
