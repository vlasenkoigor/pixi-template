import * as PIXI from 'pixi.js'
import {BG_HEIGHT, BG_WIDTH, HEIGHT, WIDTH} from "./size";

const aspects = [
    [1, 1],
    [4, 3],
    // [3, 2],
    // [16, 10],
    [16, 9],
    // [19.5,9],
    [2.31,1],
    // [3,1],
    [4,1],
]

const colors = [
    0x1EA200,
    0xA22980,
    0xFFE839,
    0x0022A2,
    0xA2A283
]

export class Background  extends PIXI.Container {


    constructor(resources) {
        super();
        this.image = new PIXI.Sprite(resources.bg.texture);
        this.addChild(this.image);

        this.logicalWidth = BG_WIDTH;
        this.logicalHeight = BG_HEIGHT;

        aspects.forEach((aspect, i)=>{
            const color = colors[i % colors.length];
            this.drawAspect(aspect, color)
        })
        Background.printAspects();

        this.currentAspectIndex = 0;
    }

    drawAspect(aspect, color){
        const [w, h] = aspect;


        const g = new PIXI.Graphics();
        g.lineStyle(2, color);

        const [marginLeft, marginTop, width, height] = this.findAspectBoundaries(w /  h);

        g.drawRect(marginLeft,marginTop, width, height);

        const infoText = new PIXI.Text(`${w}x${h}`, {
            fill : PIXI.utils.hex2string(color),
            fontFamily : 'Arial',
            fontSize : 25
        } )
        infoText.anchor.set(0.5, 0);
        infoText.x = marginLeft + (width / 2);
        infoText.y = marginTop ;
        g.addChild(infoText);


        this.addChild(g);


    }


    align(width, height){

        //scale

        // center and middle bg image;
        // assume that
        // console.log(this.width, this.height, this.scale.x)
        this.x = (width - this.width ) / 2;
        this.y = (height - this.height ) / 2;
    }

    changeAspect(aspectRate){

        if (aspectRate < 1 ) return;
        const newAspect = Background.findClosestAspect(aspectRate);

        if (newAspect === this.currentAspectIndex) return;
        this.currentAspectIndex = newAspect;


        const [w, h] = aspects[this.currentAspectIndex];

        const [marginLeft, marginTop, bwidth, bheight] = this.findAspectBoundaries(w / h);

        const height = HEIGHT;



        let scale;


        if (w / h === 1){
            scale = BG_HEIGHT / HEIGHT;
        } else if (bheight >= 720) {
            scale = 1;
        } else {
            scale =  720 / bheight;
        }

        this.scale.set(scale);

        console.log('change aspect', `${w}x${h}`, scale, bheight, height);
        // this.x = -marginLeft;
        // this.y = -marginTop;
        // console.log(scale, height, bheight)
    }


    findAspectBoundaries(aspectRatio){

        const basewidth = 1280;
        const baseHeight = 720;


        // const basewidth = BG_WIDTH;
        // const baseHeight = BG_HEIGHT;

        let width
        let height;

        if (aspectRatio === 1){
            width = height = BG_HEIGHT;
        } else {
            width = basewidth;
            height = basewidth / aspectRatio;

            if (height > BG_HEIGHT) {
                height = baseHeight;
                width = baseHeight * aspectRatio;
            }

        }


        let marginLeft = Math.floor(
            Math.max(0, (BG_WIDTH - width) / 2)
        );
        let marginTop = Math.floor(
            Math.max(0, ( BG_HEIGHT  - height ) / 2)
        );


        return [marginLeft, marginTop, width, height];
    }

}


/**
 * returns aspect index
 * @param aspectRate
 * @return {number}
 */
Background.findClosestAspect = (aspectRate)=>{
    const len = aspects.length;
    let low = 0, high;


    for (let i = 0; i < len; i++){
        const [w, h] = aspects[i];
        const rate = w / h;


        if (aspectRate < rate){
            high = i;
            break;
        }

        low = i;
        high = i;
    }

    if (low === high){
        return low;
    }


    // find closest aspects between 2
    const [lowW, lowH] = aspects[low];
    const [highW, highH] = aspects[high];

    const lowRate = lowW / lowH;
    const highRate = highW / highH;

    const a = aspectRate - lowRate;
    const b = highRate - lowRate;
    const c = a / b < 0.2 ? 0 : 1;

    return [low, high][c]
}



Background.printAspects = ()=>{
    console.table(aspects.map(e => [`${e[0]}x${e[1]}`, e[0]/e[1]]))
}



