import * as PIXI from 'pixi.js'
import { HEIGHT, WIDTH} from "./size";
import {clamp} from "./helpers";

let ticker = PIXI.Ticker.shared;

export class GameArea  extends PIXI.Container {

    constructor() {
        super();


        this.logicalWidth = WIDTH;
        this.logicalHeight = HEIGHT;

        const gr = new PIXI.Graphics();
        this.addChild(gr);
        this.gr = gr;


        const text = new PIXI.Text(``, {fontFamily: 'Arial', fontSize : 50, fill : '#fff'})
        text.anchor.set(0.5, 0);
        this.text = text;
        this.addChild(text);

        // draw components
        this._draw();

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

            circle.x = clamp(circle.x, 0, this.logicalWidth - 2*r);
            circle.y = clamp(circle.y, 0, this.logicalHeight - 2*r);

            if (circle.x + 2*r >= this.logicalWidth){
                dx = -1;
            }

            if (circle.x <= 0){
                dx = 1;
            }

            if (circle.y <= 0){
                dy = 1;
            }

            if (circle.y + 2*r >= this.logicalHeight){
                dy = -1;
            }


        })
    }

    _draw(orientation = 'landscape'){
        const gr = this.gr;
        gr.clear();
        gr.beginFill(0x2E2B34, 0.2  );
        gr.lineStyle(2, 0xFFFFFF);
        gr.drawRect(0,0, this.logicalWidth, this.logicalHeight);

        const text = this.text;
        text.text = `game area\n${this.logicalWidth}x${this.logicalHeight}`;
        text.x = this.logicalWidth / 2;
        text.y =  10;

    }


    resize({gameWidth, gameHeight, orientationChanged, gameAreaRect}){
        if (orientationChanged){
            this.logicalWidth = gameWidth;
            this.logicalHeight = gameHeight;
            this._draw()
        }

        this._align(gameAreaRect);
    }


    _align(gameAreaRect){
        this.x = gameAreaRect.x;
        this.y = gameAreaRect.y;
    }
}



