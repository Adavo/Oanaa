<script>
  const { Menu, dialog, app } = window.require("electron").remote;
  const fs = require("fs");
  import { onDestroy } from "svelte";
  import GameStore from "../store/gameStore.js";
  import Game from "../models/game";
  import Scene from "../models/scene";

  let game = GameStore.game;
  let gameFilePath;

  function newGame() {
    GameStore.game.set(
      new Game({
        name: "Untitled Game",
        scenes: [new Scene({ name: "Scene 01" })]
      })
    );
  }

  function loadGame() {
    const options = {
      defaultPath: app.getPath("documents"),
      filters: [{ name: "Game file", extensions: ["json"] }]
    };
    gameFilePath = dialog.showOpenDialogSync(null, options)[0];
    GameStore.game.set(new Game(JSON.parse(fs.readFileSync(gameFilePath))));
  }

  function saveGame() {
    if (!gameFilePath) {
      const options = {
        defaultPath: app.getPath("documents") + "/" + $game.name + ".json"
      };
      gameFilePath = dialog.showSaveDialogSync(null, options);
    }

    fs.writeFileSync(gameFilePath, JSON.stringify($game));
  }

  // build the menu template
  let menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "New Game",
          click: newGame
        },
        {
          id: "SAVE_GAME",
          label: "Save Game",
          enabled: false,
          accelerator: "ctrl+s",
          click: saveGame
        },
        {
          label: "Load Game",
          accelerator: "ctrl+o",
          click: loadGame
        },
        { type: "separator" },
        {
          label: "Exit",
          role: "quit"
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  // watcher to make menu reactive
  const gameWatcher = GameStore.game.subscribe(value => {
    if (value) {
      menu.getMenuItemById("SAVE_GAME").enabled = true;
    }
  });
  onDestroy(gameWatcher);
</script>
