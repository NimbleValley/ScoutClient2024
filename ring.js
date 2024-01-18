const canvas = document.getElementById("welcome-canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth, canvas.height = innerHeight;

var rings = [];

class Ring {
    x = 0.5 * window.innerWidth;
    y = document.getElementById("start-button").getBoundingClientRect().top + window.scrollY;
    xVel = 0;
    yVel = (Math.random()+1) * -3;
    scale = Math.random() / 3 + 0.63;

    constructor() {
        this.xVel = (Math.random() - 0.5) * 5;
    }
}

function update() {
    if(onSection != 0) {
        return;
    }

    if (Math.random() < 0.065) {
        rings.push(new Ring());
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rings.length; i++) {
        if (rings[i].y > window.innerHeight) {
            rings.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < rings.length; i++) {
        rings[i].yVel += 0.075;

        rings[i].x += rings[i].xVel;
        rings[i].y += rings[i].yVel;

        ctx.strokeStyle = "#F5B24E";
        ctx.lineWidth = window.innerWidth * 0.015 * rings[i].scale;

        ctx.beginPath();
        ctx.arc(rings[i].x, rings[i].y, window.innerWidth * 0.05 * rings[i].scale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    requestAnimationFrame(update);
}

update();

(window.onresize = e => { canvas.width = innerWidth, canvas.height = innerHeight })()