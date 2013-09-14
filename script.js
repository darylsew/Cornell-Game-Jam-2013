var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');

//enviornment vars
var mousePos = {x:0,y:0};
var backwidth = 1600;
var backpos = backwidth/2;
var charPos = {x:400, y:300}
var block = {x:900, y:400};
var objects = [block];

function draw()
{
    var newX = backpos + getDbackpos();
    backpos = ((newX<0) ? 0 : ((newX>backwidth/2) ? backwidth/2 : newX));
    $("canvas").drawImage({
        source: "resources/testbackground.jpg",
        x: backpos, y: 300
    });

    $("canvas").drawArc({
        strokeStyle: "#000",
        fillStyle: "red",
        strokeWidth: 2,
        x: charPos.x, y: charPos.y,
        radius: 50
    });

    // Draw a polygon
    $("canvas").drawPolygon({
      fillStyle: "#589",
      strokeStyle: "#000",
      x: block.x+backpos-backwidth/2, y: block.y,
      radius: 50,
      sides: 4,
      rotate: 25
    });
}

function getDbackpos()
{
    if (!$('canvas').data('hover')) return 0;
    var mouseX = mousePos.x;
    mouseX = (mouseX<0) ? 0 : ((mouseX>800) ? 800 : mouseX);
    if (mouseX>=300 && mouseX<=500) return 0;

    var vel;
    if (mouseX<300)
    {
        vel = mouseX - 300;
    }

    if (mouseX>500)
    {
        vel = mouseX - 500;
    }

    return -vel/10;

}

$('canvas').hover(
    function() { $.data(this, 'hover', true); },
    function() { $.data(this, 'hover', false); }
).data('hover', false);

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
