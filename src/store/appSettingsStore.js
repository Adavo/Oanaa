import { writable } from 'svelte/store';
import AppSettings from "../models/appSettings.js";

export let appSettings = writable(new AppSettings());