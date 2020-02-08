import Scene from "./scene";

export default class Game {
    name;
    version;
    author;
    website;
    scenes = [];

    constructor(data) {
        if (data) {
            this.name = data.name;
            this.version = data.version;
            this.author = data.author;
            this.website = data.website;
            for(let i in data.scenes) {
                this.scenes.push(new Scene(data.scenes[i]));
            }
        }
    }
}