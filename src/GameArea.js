import * as PIXI from 'pixi.js'
import {BG_HEIGHT, BG_WIDTH, HEIGHT, WIDTH} from "./size";

let ticker = PIXI.Ticker.shared;

export class GameArea  extends PIXI.Container {

    constructor(resources) {
        super();

        const gr = new PIXI.Graphics();
        gr.clear();
        gr.beginFill(0x2E2B34, 0.2  );
        gr.lineStyle(2, 0xFFFFFF);

        const [w, h] = GameArea.SIZE;
        this.logicalWidth = w;
        this.logicalHeight = h;

        gr.drawRect(0,0, w, h);

        this.addChild(gr);


        const text = new PIXI.Text(`game area\n${GameArea.SIZE[0]}x${GameArea.SIZE[1]}`, {fontFamily: 'Arial', fontSize : 50, fill : '#fff'})

        text.anchor.set(0.5);

        text.x = w / 2;
        text.y = h / 2;
        this.addChild(text);


        const r = 20;
        const circle = new PIXI.Graphics();
        circle.beginFill(0xffffff);

        circle.drawCircle(r,r,r);
        this.addChild(circle);

        let dx = 1, dy = 1;
        ticker.add(()=>{
            const speed = 10;
            circle.x += dx * speed;
            circle.y += dy * speed;
            if (circle.x + 2*r >= this.logicalWidth){
                dx = -1;
            }

            if (circle.x < 0){
                dx = 1;
            }

            if (circle.y < 0){
                dy = 1;
            }

            if (circle.y + 2*r >= this.logicalHeight){
                dy = -1;
            }


        })
    }

    align(width, height){
        this.x = (width - WIDTH) / 2;
        this.y = (height - HEIGHT) / 2;
    }


    resize(width, height){
        this.resizer(width, height);
    }


}



GameArea.SIZE = [
    1280, 720
]

