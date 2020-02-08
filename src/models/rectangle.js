import GameObject from "./gameObject";

export default class Rectangle extends GameObject {
    background;
    border;

    constructor(data){
        super(data);
        if (data) {
            this.background = data.background;
            this.border = data.border;
        }
    }
}