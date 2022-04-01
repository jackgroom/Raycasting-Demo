class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = new Vector(x1, y1);
        this.b = new Vector(x2, y2);
    }

    show() {
        ctx.strokeStyle = 'white';
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        ctx.stroke();
    }

    render() {
        this.show();
    }
}
