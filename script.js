var canvas = document.getElementById('canvas');
var canvasWidth  = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext('2d');
var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var data = imageData.data;

var slider = document.getElementById("iterSlider");
document.getElementById("btnReset").onclick = reset;

function reset() {
  maxIter = slider.value;
  zoomLevel = 1.2;
  xOffset = -0.5;
  yOffset = 0;
  draw();
}


var maxIter = 50;
var zoomLevel = 1.2;
var xOffset = -0.5;
var yOffset = 0;
var zoomSpeed = 1.6;
var movingSpeed = 0.4;


var plot = function(x, y, color) {
     var index = (y * canvasWidth + x) * 4;
        data[index]   = color;    //R
        data[index+1] = color/2;  //G
        data[index+2] = color;    //B
        data[index+3] = 255;      // alpha        
};

var map = function(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

var draw = function() {
  for (var a = 1; a < canvasWidth; a++) {
    for (var b = 1; b < canvasHeight; b++) {
      var x = map(a, 0, canvasWidth, -zoomLevel, zoomLevel) + xOffset;
      var y = map(b, 0, canvasWidth, -zoomLevel, zoomLevel) + yOffset;
      var startX = x;
      var startY = y;
      var nextX = 0;
      var nextY = 0;

      var currentIter = 0;

      for(currentIter = 0; currentIter < maxIter; currentIter++) {
        nextX = x*x - y*y + startX;
        nextY = 2*x*y + startY;

        x = nextX;
        y = nextY;

        if(x + y > 50) { break; }
      }
      
      if(currentIter == maxIter) {
        plot(a, b, 0);
      } else {
        currentIter = map(currentIter, 0, maxIter, 0, 255);
        plot(a, b, currentIter);
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

draw();

window.onkeypress = function(event) {
  if (event.keyCode == 97) {
    xOffset -= movingSpeed * zoomLevel;
  }

  if (event.keyCode == 100) {
    xOffset += movingSpeed * zoomLevel;
  }
  
  if (event.keyCode == 119) {
    yOffset -= movingSpeed * zoomLevel;
  }

  if (event.keyCode == 115) {
    yOffset += movingSpeed * zoomLevel;
  }

  if (event.keyCode == 113) {
    zoomLevel *= zoomSpeed;
  }

  if (event.keyCode == 101) {
    zoomLevel /= zoomSpeed;
  }

  draw();
 
}




