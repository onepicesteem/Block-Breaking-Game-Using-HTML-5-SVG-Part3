$(function(){

    var speed=2;

    var circleX=550;
    var circleY=500;

    //starting points for arc
    var arcX=500;
    var arcY=700;

    var block1;
    var flag1=1;

    //for blocks
    var blockArray=new Array();

    //width and height and radius
    var h=25;
    var w=85;
    var r=10;

    var groundX1=0;
    var groundY1=0;
    var groundX2=1100;
    var groundY2=750;

    var direction=[+1,-1];
    var directionX=direction[Math.floor(Math.random() * 2)];//index 0 or 1
    var directionY=direction[Math.floor(Math.random() * 2)];//index 0 or 1
    console.log(directionX);
    console.log(directionY);



    //console.log(directionX);
    //console.log(directionY);

    var svg = Pablo('#ground').svg({ //create svg with height and width
        width: 1100,
        height: 750
    });

    var ball=svg.circle({
        cx: circleX,
        cy: circleY,
        r: 10,
        fill:  '#060'
    });

    //arc drawing
    var arc=svg.rect({
        x:arcX,
        y:arcY,
        width:240, height:40,
        fill:  '#FF7A4D',
    });

    //draw blocks
    for (var bY = 50; bY < 350 ; bY=bY+45) {//for loop for columns.
      for (var bX = 35; bX < 1065; bX=bX+105) {//for loop for row
        var randomDraw=Math.floor(Math.random() * 2);//Generate 0 or 1
        if (randomDraw==1) {
            blockBuilder(bX,bY);//function that draws blocks
        }

      }
    }
    console.log(blockArray);
    setInterval(function(){

      ball.attr({cx:circleX,cy:circleY});// draw the ball with cx and cy

      circleX=circleX+directionX;
      circleY=circleY+directionY;



      if(circleX ==groundX1+10||circleX == groundX2-10){//the ball hit the wall x
        directionX=directionX*-1;//change direction
      }
      if(circleY == groundY1+10||circleY == groundY2-10){//the ball hit the wall y
        directionY=directionY*-1;//change direction
      }
      //we move the rectangle according to x coordinates.
      $(document).mousemove(function(e){

            arcX=e.clientX;
            arc.attr({x:arcX});

      });

      //the moment the ball hit the arc
      if(circleY==690&&(circleX>arcX-10&&circleX<arcX+250)){
        directionY=directionY*-1;
      }

      //collision moments according to array blocks
      for (var i = 0; i < blockArray.length; i++) {
        if((blockArray[i].flag)&&((circleY==blockArray[i].y+h+r&&(circleX>blockArray[i].x-r&&circleX<blockArray[i].x+w+r))||(circleY==blockArray[i].y-r&&(circleX>blockArray[i].x-r&&circleX<blockArray[i].x+w+r)))){
          directionY=directionY*-1;//change direction
          blockArray[i].v.remove();//delete block
          blockArray[i].flag=0;//set flag

        }
        if((blockArray[i].flag)&&((circleX==blockArray[i].x-r&&(circleY>blockArray[i].y-r&&circleY<blockArray[i].y+h+r))||(circleX==blockArray[i].x+w+r&&(circleY>blockArray[i].y-r&&circleY<blockArray[i].y+h+r)))){
          directionX=directionX*-1;//change direction
          blockArray[i].v.remove();//delete block
          blockArray[i].flag=0;//set flag
        }
      }




    },speed);

    //Draw block with x and y coordinates
    function blockBuilder(bx,by){
      var virtualBlock=svg.rect({
          x:bx,
          y:by,
          width:w, height:h,
          fill:  '#FF2626',
      });

      var block={
        x:bx,//x coordinate
        y:by,//x coordinate
        flag:1,//knowledge of whether or not it exists
        v:virtualBlock//knowledge of rectangle
      }

      blockArray.push(block);//add object to array
      //console.log(block1.attr().x);

    }

});
