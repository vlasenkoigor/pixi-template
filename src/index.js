import * as PIXI from 'pixi.js'

const width = 500, height = 500;


const app = new PIXI.Application({
    width, height, backgroundColor: 0x1099bb, resolution: 1,
});
document.body.appendChild(app.view);

const {stage, loader} = app;


window.addEventListener("keydown", event => {
    if (event.keyCode === 32){
        //do something 
    } 
    
});

        
// Listen for animate update
app.ticker.add(tick);








