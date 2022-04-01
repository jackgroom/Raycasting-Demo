window.onload = start;
var canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

var vectors = [];
var mouseX = 0;
var mouseY = 0;

function start() {
    var fps = 60;
    setup();
    startAnimation(fps);
}

function startAnimation(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    gameLoop();
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - elapsed % fpsInterval;
        for (v of vectors) {
            v.update();
        }
        drawLoop();
    }
}

function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

/**
 *  * Event handlers
 */

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('keypress', (e) => {
    if (typeof onKeyPressed === 'function') {
        onKeyPressed(e);
    }
});

window.addEventListener('keydown', (e) => {
    if (typeof onKeyDown === 'function') {
        onKeyDown(e);
    }
});

window.addEventListener('keyup', (e) => {
    if (typeof onKeyUp === 'function') {
        onKeyUp(e);
    }
});

/**
 *  * Functions for easier functionality
 */

/**
 * * Drawing functions
 */

/**
 * Line
 * * Creates a line with a given x position, y position, x start, and y end
 * @param {int} xPos the x position of the line
 * @param {int} yPos the y position of the line
 * @param {int} xStart the x position where the line will start
 * @param {int} yEnd the y position where the line will end
 */

function line(xPos, yPos, xStart, yEnd) {
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xStart, yEnd);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Ellipse
 * * Creates a full ellipse at a given x position, y position, and with a given radius
 * @param {int} xPos the x position of the ellipse
 * @param {int} yPos the y position of the ellipse
 * @param {int} r the radius of the ellipse
 */

function ellipse(xPos, yPos, r) {
    ctx.beginPath();
    ctx.arc(xPos, yPos, r, 0, Math.PI * 2, false);
    ctx.stroke();
}

/**
 * * Maths
 */

/**
 * Floor
 * * Returns rounded number
 * @param {float} num
 */

function floor(num) {
    return Math.floor(num);
}

/**
 * Random
 * * Returns a random int between two provided values
 * @param {int} min
 * @param {int} max
 */

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp
 * * Returns a clamped number between a min and a max (num cannot go out of these bounds)
 * @param {int} num
 * @param {int} min
 * @param {int} max
 */

function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
}

/**
 *  * Classes
 */

class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;

        this.magnitude = null;
        this.direction = null;
        this.limit = null;

        vectors.push(this);
    }

    update() {
        this.magnitude = this.getMagnitude();
        this.direction = this.getDirection();
    }

    limitMag(num) {
        this.limit = num;
    }

    setMagnitude(num) {
        this.x = this.x * num / this.magnitude;
        this.y = this.y * num / this.magnitude;
    }

    getMagnitude() {
        return this.limit
            ? Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) < this.limit
              ? Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
              : this.limit
            : Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    getDirection() {
        return Math.tan(-1) * (this.y / this.x);
    }

    dot_product(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    distance_between(vector) {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    }

    angle_between(vector) {
        return this.dot_product(vector) / (this.this.magnitude * vector.this.magnitude);
    }

    normalise() {
        this.div(this.magnitude);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    mult(num) {
        this.x *= num;
        this.y *= num;
    }

    div(num) {
        this.x = this.x / num;
        this.y = this.y / num;
    }
}
