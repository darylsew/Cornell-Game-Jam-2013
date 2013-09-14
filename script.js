var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');

//enviornment vars
var mousePos = {x:150,y:300};

function draw()
{
    $("canvas").drawImage({
        source: "resources/testbackground.jpg",
        x: mousePos.x, y: 300
    });
}

function getMousePos(canvas, evt)
{
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function(evt)
{
    mousePos = getMousePos(canvas, evt);
}, false);

window.setInterval(draw, 30);
