
export function resizer(WORLD_WIDTH, WORLD_HEIGHT) {
    const width = this.logicalWidth;
    const height = this.logicalHeight;

    let scale = getScale(width, height, WORLD_WIDTH, WORLD_HEIGHT)

    if (scale > 1) scale = 1;
    this.scale.set(scale);


    let marginLeft = Math.floor(
        Math.max(0, (WORLD_WIDTH - width  * scale) / 2)
    );
    let marginTop = Math.floor(
        Math.max(0, ( WORLD_HEIGHT  - height * scale) / 2)
    );

    this.x = marginLeft;
    this.y = marginTop;

}



export function getScale(gameWidth, gameHeight, clientWidth, clientHeight) {
    let scaleWidth = clientWidth / gameWidth;
    let scaleHeight = clientHeight / gameHeight;
    let scale = Math.min(scaleHeight, scaleWidth);
    return scale;
}



export function apply(object) {
    object.resizer = resizer.bind(object);
}
