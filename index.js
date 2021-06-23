//####################################################################################################################
//		Paint Application for Rectangle
//		Submitted by : Pallavi Singh
//####################################################################################################################
//Following tasks has been carried in this application using HTML5 Canvas Element

//1.	It lets the user draw rectangles on the canvas by dragging mouse.
//2.	IT automatically fills a different color to every different rectangle.
//3.	A button has been added that clears the canvas.
//4.	Another feature added where user can drag rectangles using mouse.
//5.	On double click of a rectangle deletes it.

//	It has been tested on the following browsers:
//			Google Chrome
//			Mozilla Firefox
//			IE
//			Safari

//	Additionally, the size of the canvas has not been kept fixed, and it varies with the resizing of the browser window.
//	
//	1. Draw : Drag mouse anywhere on the canvas to draw rectangles. (Click on Draw/ Move rectangle button to switch between the modes)
//	2. Move	Manually : Click and drag the rectangle you want to move. (Click on Draw/ Move rectangle button to switch between the modes)
//	3. Delete : Double click on the rectangle you want to delete.
//	4. Clear : Clicking on the clear button deletes all the drawn rectangles and clears the canvas.
//	5. Move Randomly : On click of the last button, the drawn rectangles start moving randomly.
//						It is a toggle button. Clicking it again will stop the movement.
//
//Global variable declaration
								
	var bgColor;
	var canvas;
	var canvasImage;	
	var rectangleCount;
	var rectangles;
	var color;
	var context;
	var draggingDraw;
	var draggingMove;
	var dragX;
	var dragX2;
	var dragY;
	var dragY2;
	var dragIndexDelete;
	var dragIndexMove;
	var dragStartLocation;
	var mouseX;
	var mouseY;
	var targetX;
	var targetY;
	var tempX;
	var tempY;
	var dx;
	var dy;
	var flagRandom= false;
	var tx;
	var ty;
	

window.addEventListener('load', init, false);

//resizing of canvas, based on the window size	(called on: load, resize of window)
window.onload = window.onresize = function() 
	{
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth * 0.6;
		canvas.height = window.innerHeight * 0.8;
		drawrectangles();
	}	

//initialize global variables	(called on: load of window)	
function init() 
	{
		canvas = document.getElementById("canvas");
		context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.lineCap = 'round';
	
		rectangleCount=0;	
		draggingDraw = false;
		bgColor = "#fff";
		rectangles = [];
		ty = [];
		tx = [];
		
		//event listeners to draw rectangles
		canvas.addEventListener('mousedown', dragStart, false);
		canvas.addEventListener('mousemove', drag, false);
		canvas.addEventListener('mouseup', dragStop, false);
		
		//event listener to delete rectangle
		canvas.addEventListener('dblclick', deleteRectangle,false);
	}	

function getRandomInt() {
		return Math.floor(Math.random() * 2);
}

//####################################################################################################################
//		Drawing of rectangles with random colors	
//####################################################################################################################
	
function dragStart(event) {
    draggingDraw = true;
    dragStartLocation = getCanvasCoordinates(event);
	color = "rgb(" + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) +")";
    getImage();
}

function drag(event) {
    var position;
    if (draggingDraw === true) {
        putImage();
        position = getCanvasCoordinates(event);
        drawRectangle(position);
		context.fillStyle = color;
		context.fill();
    }
}
function dragStop(event) {
    draggingDraw = false;
    putImage();
    var position = getCanvasCoordinates(event);
    drawRectangle(position);		
	context.fillStyle = color;
	context.fill();	
	rectangleCount=rectangleCount+1;
	tempRectangle = {x1:tempX, y1:tempY, x2: position.x, y2:position.y , color:color};
	
	tx.push(getRandomInt());
	ty.push(getRandomInt());
	rectangles.push(tempRectangle);
	
}
	
function getCanvasCoordinates(event) {

    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function getImage() {
    canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImage() {
    context.putImageData(canvasImage, 0, 0);
}

function drawRectangle(position) {
	
		tempX=dragStartLocation.x;
		tempY=dragStartLocation.y;
		
		context.beginPath();
		context.rect(tempX, tempY, position.x - tempX , position.y - tempY)
		context.closePath();
}

//####################################################################################################################
//		On click of Erase Button
//####################################################################################################################

function drawScreen() {
		rectangleCount=0;
		rectangles = [];
		tx = [];
		ty = [];
		context.fillStyle = bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);
	}	

//####################################################################################################################
//		On click of Draw / Move Button
//####################################################################################################################
	
function togglebtn(){

		if(document.getElementById("btnMve").name == "Draw Shape")
			{ 	
		
				canvas.removeEventListener("mousedown", mouseDown, false);
				document.getElementById("btnMve").src = "moveButton.jpg";
				document.getElementById("btnMve").name = "Move Shape";		
				document.getElementById("spid").innerHTML="Click here to move the rectangles";
		
				canvas.addEventListener('mousedown', dragStart, false);
				canvas.addEventListener('mousemove', drag, false);
				canvas.addEventListener('mouseup', dragStop, false);				
			}
	  else if(document.getElementById("btnMve").name == "Move Shape")
	  {         
		
				canvas.removeEventListener("mousedown", dragStart, false);
				canvas.removeEventListener("mousemove", drag, false);
				canvas.removeEventListener("mouseup", dragStop, false);
				
				document.getElementById("btnMve").src = "drawButton.jpg";
				document.getElementById("btnMve").name = "Draw Shape";
				document.getElementById("spid").innerHTML="Click here to draw the rectangles";
				
				canvas.addEventListener('mousedown', mouseDown, false);
	   }
 }
	
//####################################################################################################################
//		To Move/ Delete the rectangles 
//####################################################################################################################

	function drawrectangles() {
		var i;
		var x1;
		var x2;
		var y1;
		var y2;
		var color;
		
		context.fillStyle = bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);		
		
		for (i= 0 ; i <= rectangleCount-1 ; i++) {
			x1 = rectangles[i].x1;
			y1 = rectangles[i].y1;
			x2 = rectangles[i].x2;
			y2 = rectangles[i].y2;
			color=rectangles[i].color;
			context.beginPath();
			context.rect( x1, y1, x2-x1 , y2-y1) ;
			context.closePath();
			context.fillStyle = color;
			context.fill();
		}		
	}	
	//To check whether the rectangle was clicked
	function isRectangleClicked(shape,mx,my) {		
		var dx;
		var dy;
		dx1 = shape.x1;
		dy1 = shape.y1;
		dy2 = shape.y2;
		dx2 = shape.x2;
		if(((mx < dx2) && (mx > dx1)) || ((mx < dx1) && (mx > dx2))){
			if(((my < dy2) && (my > dy1)) || ((my < dy1) && (my > dy2)))
				return true ;
		}	
		return false;
	}

//####################################################################################################################
//		To Delete the rectangles	(on double-click)
//####################################################################################################################

function deleteRectangle(event) 
{
		var i;
		var bRect = canvas.getBoundingClientRect();
		dragIndexDelete=-1;
		
		mouseX = (event.clientX - bRect.left);
		mouseY = (event.clientY - bRect.top);
		//To find that which rectangle has been clicked
		for (i = rectangleCount - 1; i >= 0 ; i--) {
			if	(isRectangleClicked(rectangles[i], mouseX , mouseY)) {
				dragIndexDelete = i;
				break;		
			}
		}
		//Remove the rectangle from the array
		if ( dragIndexDelete> -1 ){
			rectangles.splice(dragIndexDelete,1)[0];
			rectangleCount=rectangleCount-1;
		}
		
		if (event.preventDefault) {
			event.preventDefault();
		} 
		else if (event.returnValue) {
			event.returnValue = false;
		} 
		drawrectangles();				
		return false;
}

//####################################################################################################################
//		To Move the rectangles Manually
//####################################################################################################################
	
function mouseDown(event) 
{
		var i;		
		var highestIndex = -1;
		var bRect = canvas.getBoundingClientRect();

		mouseX = (event.clientX - bRect.left);
		mouseY = (event.clientY - bRect.top);
		
		//To find that which rectangle has been clicked
		for (i=0; i <=rectangleCount-1 ; i++) {
			if	(isRectangleClicked(rectangles[i], mouseX, mouseY)) {
				draggingMove = true;
				if (i > highestIndex) {
					dragX = mouseX - rectangles[i].x1;
					dragY = mouseY - rectangles[i].y1;
					dragX2 = mouseX - rectangles[i].x2;
					dragY2 = mouseY - rectangles[i].y2;
					dragIndexMove = i;
					highestIndex = i;
				}				
			}
		}
		if (draggingMove) {
			window.addEventListener("mousemove", mouseMove, false);
			//Remove the rectangle and then push it to the top of the array
			rectangles.push(rectangles.splice(dragIndexMove,1)[0]);
			
		}
		canvas.removeEventListener("mousedown", mouseDown, false);
		window.addEventListener("mouseup", mouseUp, false);
		
		if (event.preventDefault) {
				event.preventDefault();
			} 
		else if (event.returnValue) {
				event.returnValue = false;
			} 
		return false;
}
	
	function mouseUp(event) {

		canvas.addEventListener("mousedown", mouseDown, false);
		window.removeEventListener("mouseup", mouseUp, false);
		if (draggingMove) {
			draggingMove = false;
			window.removeEventListener("mousemove", mouseMove, false);
		}
	}

	function mouseMove(event) {
		
		var bRect = canvas.getBoundingClientRect();
		mouseX = (event.clientX - bRect.left);
		mouseY = (event.clientY - bRect.top);
		
		rectangles[rectangleCount-1].x1 = mouseX - dragX;
		rectangles[rectangleCount-1].y1 = mouseY - dragY;
		rectangles[rectangleCount-1].x2 = mouseX - dragX2;
		rectangles[rectangleCount-1].y2 = mouseY - dragY2;
		
		drawrectangles();
	}
	
//####################################################################################################################
//		To Move the rectangles Randomly
//####################################################################################################################

function moveRandomly(){

	if(document.getElementById("btnMove").name=="Move Random")
		{		
			flagRandom=true;
			document.getElementById("btnMove").name="Stop Random";
			moveRandom();
		}
		
	else{
		
			flagRandom=false;
			document.getElementById("btnMove").name="Move Random";
			clearInterval();
		}		
}
	
function moveRandom(){

	if(flagRandom==true)
	{	
		for (i=0; i < rectangleCount; i++) {
			
			dx=Math.floor(Math.random()*10);
			dy=Math.floor(Math.random()*10);

			context.clearRect(0,0,canvas.width,canvas.height);
			context.beginPath();
			context.fillStyle=rectangles[i].color;

			context.rect(rectangles[i].x1, rectangles[i].y1, rectangles[i].x2, rectangles[i].y2 );
			context.closePath();
			context.fill();

			if( tx[i]===0 || rectangles[i].x1>canvas.width || rectangles[i].x2>canvas.width){
				dx=-dx;
				tx[i] = 0;
			}
			if( ty[i] == 0 || rectangles[i].y1>canvas.height || rectangles[i].y2>canvas.height){
				dy=-dy;
				ty[i] = 0;
			}
			if(rectangles[i].x1<0 || rectangles[i].x2<0)
				tx[i] = 1
			if(rectangles[i].y1<0 || rectangles[i].y2<0)
				ty[i]=1;
				
			rectangles[i].x1+=dx;
			rectangles[i].y1+=dy;
			rectangles[i].x2+=dx;
			rectangles[i].y2+=dy;
		}
	
		drawrectangles();
	}
	
	else
	{
		clearInterval();
	}
}

setInterval(moveRandom,10); 