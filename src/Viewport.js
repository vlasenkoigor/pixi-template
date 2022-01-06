import * as PIXI from 'pixi.js'
import {BG_HEIGHT, BG_WIDTH} from "./size";
export class Viewport  extends PIXI.Container {

    constructor(resources) {
        super();
        const [w, h] = Viewport.DEFAULT_VP;

        this.logicalWidth = w;
        this.logicalHeight = h;


        const gr = new PIXI.Graphics();
        gr.clear();
        gr.beginFill(0x1EA200, 0.2);
        gr.lineStyle(1, 0xA2559B, );

        gr.drawRect(0,0, w, h);

        this.addChild(gr);

        window.bg = this.bg;

    }




}


Viewport.LIST = {
    iPhone12Pro : [926, 428],
    iPhoneX : [812, 375],
    iPad10_2 : [1080, 810],
    custom : [1280, 720],
}


Viewport.DEFAULT_VP = Viewport.LIST.custom;
