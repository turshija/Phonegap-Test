var keyboard = [],
    ball = [];

ball.x = 10;
ball.y = 10;
ball.velX = 1;
ball.velY = 1;
ball.size = 3;
ball.angle = 0;
ball.speed = 1;
ball.angularSpeed = 7;

window.onload = function() {
    animate();
    $(".controls").find('li').each(function() {
        var $this = $(this),
            action = $this.data('action');

        $this.bind('touchstart mousedown', function(e) {
            keyboard[ action ] = true;
        });
        $this.bind('touchend mouseup', function(e) {
            keyboard[ action ] = false;
        });
    });
};

// Paul Irish teh pro
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

window.onkeydown = function(e) {
    if (e.keyCode == 39) keyboard.right = true;
    else if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 38) keyboard.up = true;
    else if (e.keyCode == 40) keyboard.down = true;
};

window.onkeyup = function(e) {
    if (e.keyCode == 39) keyboard.right = false;
    else if (e.keyCode == 37) keyboard.left = false;
    if (e.keyCode == 38) keyboard.up = false;
    else if (e.keyCode == 40) keyboard.down = false;
};


function animate() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    getP1Input();
    movePlayers();

    // clear
    // context.clearRect(0, 0, canvas.width, canvas.height);

    // draw
    context.beginPath();

    drawBall(context, ball);

    // request new frame
    requestAnimFrame(function() {
        animate();
    });
}

function movePlayers() {
    ball.x += ball.velX;
    ball.y += ball.velY;

    ball.velX = Math.cos(ball.angle) * ball.speed;
    ball.velY = Math.sin(ball.angle) * ball.speed;
    // console.log( Math.cos(ball.angle)*ball.speed );
    // console.log( Math.sin(ball.angle)*ball.speed );
}
function getP1Input() {
    if (keyboard.up) {
        // ball.velY -= 0.1;
    } else if (keyboard.down) {
        // ball.velY += 0.1;
    } else if (keyboard.left) {
        // ball.velX -= 0.1;
        ball.angle -= ball.angularSpeed/100;
    } else if (keyboard.right) {
        // ball.velX += 0.1;
        ball.angle += ball.angularSpeed/100;
    }
}

function drawBall(context, ball) {
    context.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI, false);
    context.fillStyle = "#8ED6FF";
    context.fill();
    // context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
}