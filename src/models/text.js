import GameObject from "./gameObject";

export default class Text extends GameObject {
    value;
    
    constructor(data){
        super(data);
        if (data) {
            this.value = data.value;
        }
    }
}