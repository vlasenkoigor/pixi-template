import * as PIXI from 'pixi.js'
import {clamp, getWindowSize} from "./helpers";
import {GameArea} from "./GameArea";
import {Background} from "./Background";
import {ORIENTATIONS, SCALE_MODES} from "./constants";
import {resizeTexts, textTest} from "./textTest";
let lastOrientation = '';
const GAME_WIDTH = 1280, GAME_HEIGHT = 720;
const RESOLUTION = 1;
const MAX_SIZE = 1800;

const scaleMode = SCALE_MODES.RESIZE;
let root, app;

document.addEventListener('DOMContentLoaded', init)


function loadResources(){
    return new Promise((resolve)=>{
        app.loader.add('bg', '/bg_m.jpg').load((_, resources)=>{
            resolve(resources)
        })
    })
}
async function init(){


    root = document.querySelector('#root');
    app = new PIXI.Application({
        width: GAME_WIDTH, height: GAME_HEIGHT, backgroundColor: 0x1099bb, resolution : RESOLUTION,
    });

    const resources = await loadResources();

    root.appendChild(app.view);


    const bg = new Background(resources);
    app.stage.addChild(bg);

    const text = new PIXI.Text(`${GAME_WIDTH}x${GAME_HEIGHT}`, {fill : '#fff'});
    text.anchor.set(.5);
    text.x = GAME_WIDTH / 2;
    text.y = GAME_HEIGHT / 2;
    app.stage.addChild(text);

    textTest(app.stage);
    window.renderer = app.renderer;

    const gameArea = new GameArea();
    app.stage.addChild(gameArea)

    window.addEventListener('resize', ()=>{
        resize();
    });

    resize();



    /**
     *
     * @param {ResizeData} resizeData
     */
    function resizeGame(resizeData){
        const { canvasWidth, canvasHeight, clientWidth, clientHeight, orientation, gameAreaRect } = resizeData;

        app.renderer.resize(canvasWidth, canvasHeight);

        text.text =`canvas size: ${canvasWidth} x ${canvasHeight}
canvas aspect: ${canvasWidth / canvasHeight}
clientSize: ${clientWidth} x ${clientHeight}
clientAspect: ${clientWidth / clientHeight}
orientation: ${orientation}`;

        text.x = gameAreaRect.x + gameAreaRect.width / 2;
        text.y = gameAreaRect.y + gameAreaRect.height / 2;

        gameArea.resize(resizeData);
        bg.resize(resizeData);
    }


    function getClientSize(){
        return getWindowSize();
    }

    function getGameSize(orientation){
        let width = GAME_WIDTH,
            height = GAME_HEIGHT;
        if (orientation === 'portrait'){
            width = GAME_HEIGHT;
            height = GAME_WIDTH;
        }

        // add top and bottom safe area

        return {width, height};
    }


    /**
     * get canvas (#GamePanel size) according to scale mode
     * @param clientWidth
     * @param clientHeight
     * @param gameWidth
     * @param gameHeight
     * @private
     */
    function getCanvasSize(clientWidth, clientHeight, gameWidth, gameHeight){
        let width = gameWidth,
            height = gameHeight; // width including reserved top and bottom areas

        // is we in resize mode - canvas aspect should be close to client size
        // but based on game size
        if (scaleMode === SCALE_MODES.RESIZE){
            const clientAspectRatio = clientWidth / clientHeight;
            if (clientAspectRatio > gameWidth / gameHeight){
                width = Math.floor(clamp(height * clientAspectRatio, gameWidth, MAX_SIZE));
            } else {
                height = Math.floor(clamp(width / clientAspectRatio, gameHeight, MAX_SIZE));
            }
        }
        return {width, height}
    }

    /**
     *
     * @param canvasWidth
     * @param canvasHeight
     * @param gameWidth
     * @param gameHeight
     * @return Rect
     */
    function getGameAreaRect(canvasWidth, canvasHeight, gameWidth, gameHeight){

        // fit resize games has game area rect at 0,0
        if (scaleMode === SCALE_MODES.FIT) return {x: 0, y: 0, width : gameWidth, height : gameHeight}

        // resize mode canvas could be bigger than game so game area should be in the middle of canvas
        return {x : (canvasWidth - gameWidth) / 2, y : (canvasHeight -  gameHeight) / 2, width : gameWidth, height : gameHeight};
    }

    function resize(){
        const {width: clientWidth, height: clientHeight} = getClientSize();
        const viewportAspect = clientWidth / clientHeight;
        const orientation = viewportAspect > 1 ? 'landscape' : 'portrait';

        // get game resolution
        let {width : gameWidth, height : gameHeight} = getGameSize(orientation);

        const {width: canvasWidth, height: canvasHeight} = getCanvasSize(clientWidth, clientHeight, gameWidth, gameHeight);

        const orientationChanged = (lastOrientation !== orientation);
        lastOrientation = orientation;

        // scale canvas view via CSS
        let scaleWidth = clientWidth / (canvasWidth * RESOLUTION);
        let scaleHeight = clientHeight / (canvasHeight * RESOLUTION);
        let scale = Math.min(scaleHeight, scaleWidth);
        app.view.style.transform = `scale(${scale})`;
        // set canvas view margins
        const marginLeft = Math.floor(Math.max(0, (clientWidth  - (canvasWidth * RESOLUTION) * scale ) / 2));
        const marginTop = Math.floor(Math.max(0, (clientHeight   - (canvasHeight * RESOLUTION) * scale  ) / 2));
        app.view.style.marginLeft = `${marginLeft}px`;
        app.view.style.marginTop = `${marginTop}px`;


        // create resizeData object
        /**
         * @type {ResizeData}
         */
        let resizeData = {
            gameWidth,
            gameHeight,
            canvasWidth,
            canvasHeight,
            gameAreaRect : getGameAreaRect(canvasWidth, canvasHeight, gameWidth, gameHeight),
            orientation,
            orientationChanged : orientationChanged,
            clientWidth,
            clientHeight
        }

        resizeTexts(canvasWidth, canvasHeight);
        resizeGame(resizeData);

    }

}








