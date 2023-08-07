import * as PIXI from 'pixi.js'

const texts = [];

export function textTest(stage){
    const amount = 4000;

    for (let i = 0; i<amount; i++){

        const text = new PIXI.Text('text: ' + i, {
            fill : getRandomColor(),
            fontSize: 27
        });

        texts.push(text);

        stage.addChild(text);
    }
}


export function resizeTexts(width, height){
        texts.forEach(text =>{
            text.x = getRandomInt(width);
            text.y = getRandomInt(height);
        })

}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}