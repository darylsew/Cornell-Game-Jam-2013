var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');

//constants
var backwidth = 1600;
var deadzonewidth = 200;

//enviornment vars
var mousePos = {x:0,y:0};
var backpos = backwidth/2;
var charPos = {x:400, y:300, rad:50};
var block = {x:900, y:380, rad:50};
var v = {x:0,y:0};

var down = false;
var dragging = false;
$(document).mousedown(function(){
    down = true;
    if (dist(charPos,mousePos)<50)
    {
        v.x = charPos.x - mousePos.x;
        v.y = charPos.y - mousePos.y;
        dragging = true;
    }
}).mouseup(function(){
    down = false;
    dragging = false;
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
    if (down) dragChar();
    $("canvas").drawArc({
        strokeStyle: "#000",
        fillStyle: "red",
        strokeWidth: 2,
        x: charPos.x+backpos-backwidth/2, y: charPos.y,
        radius: charPos.rad
    });

    // Draw a polygon
    $("canvas").drawPolygon({
      fillStyle: "#589",
      strokeStyle: "#000",
      x: block.x+backpos-backwidth/2, y: block.y,
      radius: block.rad,
      sides: 4,
      rotate: 0
    });
    if (
	isPixelCollision(context.getImageData(block.x+backpos-backwidth/2,block.y,block.rad,block.rad), block.x+backpos-backwidth/2, block.y, 
			 context.getImageData(charPos.x,charPos.y,charPos.rad,charPos.rad),charPos.x,charPos.y,
			false)
	) 
	alert("Collision!"); 
}

function dragChar()
{
    if (dragging)
    {
        charPos.x = mousePos.x-backpos+backwidth/2 + v.x;
        charPos.y = mousePos.y + v.y;
    }
    /*
    var d = dist(mousePos,charPos);
    if (d<50)
    {
        var dx = (mousePos.x-charPos.x)/5;
        var dy = (mousePos.y-charPos.y)/5;
        if (Math.abs(charPos.x-mousePos.x)<Math.abs(dx)) charPos.x = mousePos.x;
        else { charPos.x += dx; }
        if (Math.abs(charPos.y-mousePos.y)<Math.abs(dy)) charPos.y = mousePos.y;
        else { charPos.y += dy; }
    }
    */
}

function getDbackpos()
{
    if (!$('canvas').data('hover')) return 0;
    var charX = charPos.x+backpos-backwidth/2;
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

/**
 * @author Joseph Lenton - PlayMyCode.com
 *
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */
function isPixelCollision( first, x, y, other, x2, y2, isCentred )
{
    // we need to avoid using floats, as were doing array lookups
    x  = Math.round( x );
    y  = Math.round( y );
    x2 = Math.round( x2 );
    y2 = Math.round( y2 );

    var w  = first.width,
        h  = first.height,
        w2 = other.width,
        h2 = other.height ;

    // deal with the image being centred
    if ( isCentred ) {
        // fast rounding, but positive only
        x  -= ( w/2 + 0.5) << 0
        y  -= ( h/2 + 0.5) << 0
        x2 -= (w2/2 + 0.5) << 0
        y2 -= (h2/2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    var xMin = Math.max( x, x2 ),
        yMin = Math.max( y, y2 ),
        xMax = Math.min( x+w, x2+w2 ),
        yMax = Math.min( y+h, y2+h2 );

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if ( xMin >= xMax || yMin >= yMax ) {
        return false;
    }

    var xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    var pixels  = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if ( xDiff < 4 && yDiff < 4 ) {
        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                        ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                ) {
                    return true;
                }
            }
        }
    } else {
        /* What is this doing?
         * It is iterating over the overlapping area,
         * across the x then y the,
         * checking if the pixels are on top of this.
         *
         * What is special is that it increments by incX or incY,
         * allowing it to quickly jump across the image in large increments
         * rather then slowly going pixel by pixel.
         *
         * This makes it more likely to find a colliding pixel early.
         */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        var incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);

        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                        if (
                                ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}
