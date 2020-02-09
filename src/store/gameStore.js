import { writable } from 'svelte/store';

class GameStore {
    game = writable(null);
}

export default new GameStore();