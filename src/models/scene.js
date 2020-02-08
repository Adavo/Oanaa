import GameObject from "./gameObject";

export default class Scene {
    id;
    name;
    width;
    height;
    fitCamera;
    gameObjects = [];

    constructor(data) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.width = data.width;
            this.height = data.height;
            this.fitCamera = data.fitCamera;
            
            for(let i in data.gameObjects) {
                this.gameObjects.push(new GameObject(data.gameObjects[i]));
            }
        }
    }
}