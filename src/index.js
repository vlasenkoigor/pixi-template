import * as PIXI from 'pixi.js'

const width = 500, height = 500;


const app = new PIXI.Application({
    width, height, backgroundColor: 0x1099bb, resolution: 1,
});
document.body.appendChild(app.view);

const {stage, loader} = app;


const texts = [];
const  startX = 50, startY = 200;
let a = 0;
for (let i = 0; i <= 5; i++) {

    const t = new PIXI.Text(a);

    t.x = startX + (i * 70);
    t.y = startY;

    stage.addChild(t);
    texts.push(t);
}

setInterval(()=>{
    a+=50;
    texts.forEach(t=>t.text = a)
}, 3000)


window.addEventListener("keydown", event => {
    if (event.keyCode === 32){
        //do something 
    } 

    //
});

        
// Listen for animate update
app.ticker.add(()=>{

});








