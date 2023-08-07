import * as PIXI from 'pixi.js'


export class Background  extends PIXI.Container {


    constructor(resources) {
        super();
        this.image = new PIXI.Sprite(resources.bg.texture);
        this.addChild(this.image);
    }


    resize({canvasWidth, canvasHeight}){
        this._align(canvasWidth, canvasHeight);
    }

    _align(canvasWidth, canvasHeight){
        this.x = (canvasWidth - this.width ) / 2;
        this.y = (canvasHeight - this.height ) / 2;
    }
}





