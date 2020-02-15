<script>
  import GameStore from "../store/gameStore.js";
  let game = GameStore.game;

  let expandedItem = [];
  let selectedItem;

  function selectItem(item) {
    selectedItem = item;
    if (expandedItem.indexOf(item) === -1) {
      expandItem(item);
    }
  }

  function expandItem(item) {
    let searchIndex = expandedItem.indexOf(item);
    if (searchIndex === -1) {
      expandedItem.push(item);
    } else {
      expandedItem.splice(searchIndex, 1);
    }
    expandedItem = expandedItem;
  }
</script>

<style lang="scss">
  .explorer {
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px;

    .item {
      .label.selected {
        color: $color_explorer_selectedItem;
      }

      cursor: pointer;
      .icon {
        margin-right: 10px;
      }

      .item {
        .label.selected {
          color: $color_explorer_selectedItem;
        }
        margin-top: 10px;
        padding-left: 30px;
      }
    }
  }
</style>

<div class="explorer">
  {#if $game}
    <div class="item">
      <div
        class="label {selectedItem === $game ? 'selected' : ''}"
        on:click={selectItem($game)}>
        <i
          on:click|stopPropagation={expandItem($game)}
          class="icon fas {expandedItem.indexOf($game) === -1 ? 'fa-chevron-right' : 'fa-chevron-down'}" />
        {$game.name}
      </div>
      {#if expandedItem.indexOf($game) !== -1}
        <div class="contains">
          {#each $game.scenes as scene}
            <div class="item">
              <div
                class="label {selectedItem === scene ? 'selected' : ''}"
                on:click={selectItem(scene)}>
                <i
                  on:click|stopPropagation={expandItem(scene)}
                  class="icon fas {expandedItem.indexOf(scene) === -1 ? 'fa-chevron-right' : 'fa-chevron-down'}" />
                {scene.name}
              </div>
              {#if expandedItem.indexOf(scene) !== -1}
                <div class="contains">toto</div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
