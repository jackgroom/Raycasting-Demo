var b;
var r;

function setup() {
    b = new Boundary(300, 100, 300, 300);
    r = new Ray(100, 200);
}

function draw() {
    b.render();
    r.render();

    // r.setDirection(mouseX, mouseY);

    var pt = r.cast(b);
    if (pt) {
        ctx.fillStyle = 'white';
        ellipse(pt.x, pt.y, 3);
        ctx.fill();
    }
}
