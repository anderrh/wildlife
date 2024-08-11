
function square (a:number) {
  return a * a;
}

const width = 1024;
const height = 768;

class Wildlife {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  leftPressed:boolean;
  rightPressed:boolean;
  snakeX: number[];
  snakeY: number[];
  bodyWidth: number[];
  downPressed: boolean;
  upPressed: boolean;
  bodySpeed: number;
  dirSnakeX: number[];
  dirSnakeY: number[];
  turnspeed: number;

  constructor() {
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    document.body.appendChild(this.canvas)
    this.context =this.canvas.getContext("2d") as CanvasRenderingContext2D;
    console.log(this.context);
    this.canvas.width=innerWidth;
    this.canvas.height=innerHeight;
    this.canvas.style.position="absolute";
    this.canvas.style.top="0";
    this.canvas.style.left="0";
    this.leftPressed=false;
    this.rightPressed=false;
    this.upPressed=false;
    this.downPressed=false;
    this.turnspeed=0.03;
    this.snakeX=[];
    this.snakeY=[];
    this.dirSnakeX=[];
    this.dirSnakeY=[];
    var animalSize = 0.50;
    this.bodyWidth=[9,10,10,9,9,9,7,7,7,7,6,6,6,7,7,7,7,7,7,8,9,10,10,9,9,8,7,7,7,7,7,8,10,9,9,8,7,7,7,7,6,6,6,7,7,7,7,7,7,8,9,10,10,9,9,8,7,7,7,8,9,10,10,9,9,8,7,7,7,7,6,6,6,7,7,7,7,7,7,8,9,10,10,9,9,8,7,7,7,7,7,8,10,9,9,8,7,7,7,7,6,6,6,7,7,7,7,7,7,8,9,10,10,9,9,8,7,7,6,5];
    var numSegments = this.bodyWidth.length;
    for (var i = 0; i < numSegments; i++) {
      this.bodyWidth[i]*=animalSize;
      this.snakeX.push(width/2+i);
      this.snakeY.push(height/2+i);
      this.dirSnakeX.push(0);
      this.dirSnakeY.push(1);
      
    }
    this.bodySpeed=2;
    document.addEventListener("keydown", this.keypressed.bind(this));
    document.addEventListener("keyup", this.keyreleased.bind(this));
    requestAnimationFrame(this.draw.bind(this));
  }
  private keyreleased(e:KeyboardEvent){
    if (e.key==="ArrowLeft"){
      this.leftPressed=false;
    }
    if (e.key==="ArrowRight"){
      this.rightPressed=false;
    }
    if (e.key==="ArrowUp"){
      this.upPressed=false;
    }
    if (e.key==="ArrowDown"){
      this.downPressed=false;
    }  
  }
  private keypressed(e:KeyboardEvent){
    if (e.key==="ArrowLeft"){
      this.leftPressed=true;
    }
    if (e.key==="ArrowRight"){
      this.rightPressed=true;
    }  
    if (e.key==="ArrowUp"){
      this.upPressed=true;
    }
    if (e.key==="ArrowDown"){
      this.downPressed=true;
    }    
  }
  private segmentLeft(index:number) {
    var leftx = this.dirSnakeY[index];
    var lefty = 0-this.dirSnakeX[index];
    return [leftx,lefty];
  }
  private segmentRight(index:number) {
    var rightx = 0-this.dirSnakeY[index];
    var righty = this.dirSnakeX[index];
    return [rightx,righty];
  }
  private draw(){
    this.canvas.width=width;
    this.canvas.height=height;
    if (this.leftPressed&&this.upPressed){
      var leftx = this.dirSnakeY[0];
      var lefty = 0-this.dirSnakeX[0];
      this.dirSnakeX[0] += leftx * this.turnspeed;
      this.dirSnakeY[0] += lefty * this.turnspeed;
      
    }
    if (this.rightPressed&&this.upPressed){
      var rightx = 0-this.dirSnakeY[0];
      var righty = this.dirSnakeX[0];
      this.dirSnakeX[0] += rightx * this.turnspeed;
      this.dirSnakeY[0] += righty * this.turnspeed;
      
      
    }
    var dist = Math.sqrt(square(this.dirSnakeX[0])+square(this.dirSnakeY[0]));
    if (dist) {
      this.dirSnakeX[0] /= dist;
      this.dirSnakeY[0] /= dist;
    }
    if (this.downPressed){
      
    }
    if (this.upPressed){
      this.snakeX[0]+=(this.dirSnakeX[0]*this.bodySpeed);
      this.snakeY[0]+=(this.dirSnakeY[0]*this.bodySpeed);
    }
    for(var i = 0,len = this.snakeX.length; i+1 < len; i+=1) {
      var currentIndex = i + 1;
      var previousIndex = i;
      var previousX = this.snakeX[previousIndex];
      var previousY = this.snakeY[previousIndex];
      var currentX = this.snakeX[currentIndex];
      var currentY = this.snakeY[currentIndex];
      var dist = Math.sqrt(square(previousX-currentX)+square(previousY-currentY));
      var nextDistance = (this.bodyWidth[previousIndex]+this.bodyWidth[currentIndex]);
      var dirX = (currentX-previousX)/dist;
      var dirY = (currentY-previousY)/dist;
      var biggerDirX = dirX * nextDistance;
      var biggerDirY = dirY * nextDistance;
      this.snakeX[currentIndex] = previousX + biggerDirX;
      this.snakeY[currentIndex] = previousY + biggerDirY;
      this.dirSnakeX[currentIndex] = -dirX;
      this.dirSnakeY[currentIndex] = -dirY;
    }
    requestAnimationFrame(this.draw.bind(this));
    const ctx:CanvasRenderingContext2D = this.context;
    ctx.fillStyle=`rgb(56,155,195)`;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle=`rgb(0,0,0)`;
    ctx.fillRect(0,0,10,height);
    ctx.fillRect(0,0,width,10);
    ctx.fillRect(width-10,0,10,height);
    ctx.fillRect(0,height-10,width,10);
    ctx.fillStyle=`rgb(30,200,30)`;
    ctx.strokeStyle=`rgb(10,60,10)`;

    /////////ctx.fillRect(this.snakeX,this.snakeY,this.bodyWidth,this.bodyWidth);
    for(var i = 0,len = this.snakeX.length;i < len;i+=1) {
      //ctx.beginPath();
      var nextI = i;
      var prevI = i;
      if (i + 1 < len) {
        nextI = i+1;
      }
      if (i > 0) {
        prevI = i - 1;
      }
      var radius = this.bodyWidth[i];
      radius +=(this.bodyWidth [prevI] + this.bodyWidth [nextI])/2;
      //if (this.snakeX.length != i+1)
        //var curRadius = this.bodyWidth[i];
        //var prevRadius = this.bodyWidth[i+1];
        //ctx.beginPath(); // Start a new path
        //ctx.moveTo(this.snakeX[i] + this.segmentLeft(i)[0]*curRadius,this.snakeY[i] + this.segmentLeft(i)[1]*curRadius); // Move the pen to (30, 50)
        //ctx.lineTo(this.snakeX[i+1] + this.segmentLeft(i+1)[0]*prevRadius,this.snakeY[i+1] + this.segmentLeft(i+1)[1]*prevRadius); // Draw a line to (150, 100)
        //ctx.moveTo(this.snakeX[i] + this.segmentRight(i)[0]*curRadius,this.snakeY[i] + this.segmentRight(i)[1]*curRadius); // Move the pen to (30, 50)
        //ctx.lineTo(this.snakeX[i+1] + this.segmentRight(i+1)[0]*prevRadius,this.snakeY[i+1] + this.segmentRight(i+1)[1]*prevRadius); // Draw a line to (150, 100)
        //ctx.stroke();
      //}
      ctx.beginPath()
      ctx.ellipse(this.snakeX[i],this.snakeY[i],radius,radius,0,0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }
}



onload=function(){
  new Wildlife();
}