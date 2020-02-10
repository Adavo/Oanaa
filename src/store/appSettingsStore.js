import { writable } from 'svelte/store';
import AppSettings from "../models/appSettings.js";

class AppSettingsStore {
    appSettings = writable(new AppSettings());
}

export default new AppSettingsStore();