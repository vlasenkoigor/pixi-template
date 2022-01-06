import {Background} from "./Background";

function init(resources, app){
    const {stage} = app;
    const bg = new Background(resources);
    stage.addChild(bg);
}



export default init;










