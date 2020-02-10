<script>
  import Viewer from "./Viewer.svelte";
  import Toolbox from "./Toolbox.svelte";
  import Explorer from "./Explorer.svelte";
  import Menu from "./Menu.svelte";
  import { onDestroy } from "svelte";
  import AppSettingsStore from "../store/appSettingsStore.js";
  import AppSettings from "../models/appSettings.js";
  const fs = require("fs");

  if (fs.existsSync("./settings.json")) {
    let settings = new AppSettings(JSON.parse(fs.readFileSync("./settings.json")));
    AppSettingsStore.appSettings.set(settings);
  }

  // watcher to save settings as soon as they changed
  const appSettingsWatcher = AppSettingsStore.appSettings.subscribe(value => {
    if (value) {
      fs.writeFileSync("./settings.json", JSON.stringify(value));
    }
  });
  onDestroy(appSettingsWatcher);
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
    width: 300px;
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
  <div class="right">
    <Toolbox />
  </div>
</main>
