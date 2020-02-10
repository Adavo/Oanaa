<script>
  const { Menu, dialog, app } = window.require("electron").remote;
  const fs = require("fs");
  import { onDestroy } from "svelte";
  import GameStore from "../store/gameStore.js";
  import AppSettingsStore from "../store/appSettingsStore.js";
  import Game from "../models/game";
  import Scene from "../models/scene";
  import AppSettings from "../models/appSettings.js";

  let game = GameStore.game;
  let appSettings = AppSettingsStore.appSettings;

  // load default project if exists
  if (
    $appSettings.previousProjectFilePath &&
    fs.existsSync($appSettings.previousProjectFilePath)
  ) {
    GameStore.game.set(
      new Game(
        JSON.parse(fs.readFileSync($appSettings.previousProjectFilePath))
      )
    );
  }

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
      defaultPath: $appSettings.previousProjectFilePath
        ? $appSettings.previousProjectFilePath
        : app.getPath("documents"),
      filters: [{ name: "Game file", extensions: ["json"] }]
    };
    $appSettings.previousProjectFilePath = dialog.showOpenDialogSync(
      null,
      options
    )[0];
    GameStore.game.set(
      new Game(
        JSON.parse(fs.readFileSync($appSettings.previousProjectFilePath))
      )
    );
  }

  function saveGame() {
    if (!$appSettings.previousProjectFilePath) {
      const options = {
        defaultPath: $appSettings.previousProjectFilePath
          ? $appSettings.previousProjectFilePath
          : app.getPath("documents") + "/" + $game.name + ".json"
      };
      $appSettings.previousProjectFilePath = dialog.showSaveDialogSync(
        null,
        options
      );
    }
    fs.writeFileSync(
      $appSettings.previousProjectFilePath,
      JSON.stringify($game)
    );
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
