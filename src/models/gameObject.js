
export default class GameObject {
    id;
    name;
    top;
    left;
    width;
    height;

    constructor(data) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.top = data.top;
            this.left = data.left;
            this.width = data.width;
            this.height = data.height;
        }
    }
}