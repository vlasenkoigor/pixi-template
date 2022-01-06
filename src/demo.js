import {Background} from "./Background";
import {GameArea} from "./GameArea";
import {BG_WIDTH, BG_HEIGHT, WIDTH, HEIGHT} from "./size";
import {apply} from './mixins/resizer'
import {getWindowSize} from "./helpers";
function init(resources, app){
    let viewport, gameArea, bg;
    const {stage, loader} = app;
        bg = new Background(resources);
        stage.addChild(bg);

        gameArea = new GameArea(resources);
        stage.addChild(gameArea);
        apply(bg);
        apply(gameArea);
        resize();

        window.addEventListener('resize', ()=>{
            resize()
        })

        function resize(){
            const {width, height} = getWindowSize();

            const viewportAspect = width / height;
            console.log('viewportAspect',viewportAspect);
            let w, h;

            // horizontal
            if (viewportAspect > 1){
                h =  HEIGHT;
                w = h * viewportAspect;

                if (w < WIDTH){
                    w =  WIDTH;
                    h = w / viewportAspect;
                }
            }
            //  vertical
            else {
                w =  WIDTH;
                h = w / viewportAspect;
            }


            // case 1

            // w = width;
            // h = height;
            // bg.align(w, h);
            // gameArea.resize(w, h);


            //case  2
            bg.changeAspect(viewportAspect);
            bg.align(w, h);
            gameArea.align(w, h);




            app.renderer.resize(w, h);
    }

}



export default init;










