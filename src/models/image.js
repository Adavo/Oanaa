import GameObject from "./gameObject";

export default class Image extends GameObject {
    src;

    constructor(data){
        super(data);
        if (data) {
            this.src = data.src;
        }
    }
}