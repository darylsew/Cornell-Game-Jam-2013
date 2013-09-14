var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');

//constants
var backwidth = 1600;
var deadzonewidth = 200;

//enviornment vars
var mousePos = {x:0,y:0};
var backpos = backwidth/2;
var charPos = {x:400, y:300}
var block = {x:900, y:400};

var down = false;
$(document).mousedown(function(){
    down = true;
}).mouseup(function(){
    down = false;  
});

function draw()
{
    //background
    var newX = backpos + getDbackpos();
    backpos = ((newX<0) ? 0 : ((newX>backwidth/2) ? backwidth/2 : newX));
    $("canvas").drawImage({
        source: "resources/testbackground.jpg",
        x: backpos, y: 300
    });

    //character
    if (down) attractChar();
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

function attractChar()
{
    var dx = (mousePos.x-charPos.x)/5;
    var dy = (mousePos.y-charPos.y)/5;
    if (Math.abs(charPos.x-mousePos.x)<Math.abs(dx)) charPos.x = mousePos.x;
    else { charPos.x += dx; }
    if (Math.abs(charPos.y-mousePos.y)<Math.abs(dy)) charPos.y = mousePos.y;
    else { charPos.y += dy; }
}

function getDbackpos()
{
    if (!$('canvas').data('hover')) return 0;
    var charX = charPos.x;
    charX = (charX<0) ? 0 : ((charX>800) ? 800 : charX);
    if (charX>=300 && charX<=500) return 0;

    var vel;
    if (charX<300)
    {
        vel = charX - 300;
    }

    if (charX>500)
    {
        vel = charX - 500;
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

function dist(a,b)
{
    return Math.sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

window.setInterval(draw, 30);
