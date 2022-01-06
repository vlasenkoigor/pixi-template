

export function drawCanvas() {

    let c = document.createElement("canvas");
    c.width = 500;
    c.height = 500;
    document.body.appendChild(c);
    let ctx = c.getContext("2d");
    ctx.font = "normal 30px Skranji";
    ctx.fillText("Title", 500 / 2 - 20, 500 / 2- 20);
}
