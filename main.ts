
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
    this.snakeX=[width/2,width/2+10,width/2+20];
    this.snakeY=[height/2,height/2+10,height/2+20];
    this.bodyWidth=[10,8,7];
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
  private draw(){
    this.canvas.width=width;
    this.canvas.height=height;
    if (this.leftPressed){
      this.snakeX[0]-=this.bodySpeed;
    }
    if (this.rightPressed){
      this.snakeX[0]+=this.bodySpeed;
    }
    if (this.downPressed){
      this.snakeY[0]+=this.bodySpeed;
    }
    if (this.upPressed){
      this.snakeY[0]-=this.bodySpeed;
    }
    for(var i = 0,len = this.snakeX.length; i+1 < len; i+=1) {
      var currentIndex = i + 1;
      var previousIndex = i;
      var previousX = this.snakeX[previousIndex];
      var previousY = this.snakeY[previousIndex];
      var currentX = this.snakeX[currentIndex];
      var currentY = this.snakeY[currentIndex];
      var dist = Math.sqrt(square(previousX-currentX)+square(previousY-currentY));
      var nextDistance = (this.bodyWidth[previousIndex]+this.bodyWidth[currentIndex])/2;
      var dirX = (currentX-previousX)/dist;
      var dirY = (currentY-previousY)/dist;
      var biggerDirX = dirX * nextDistance;
      var biggerDirY = dirY * nextDistance;
      this.snakeX[currentIndex] = previousX + biggerDirX;
      this.snakeY[currentIndex] = previousY + biggerDirY;

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
    ctx.fillStyle=`rgb(128,128,0)`;

    /////////ctx.fillRect(this.snakeX,this.snakeY,this.bodyWidth,this.bodyWidth);
    for(var i = 0,len = this.snakeX.length;i < len;i+=1) {
      ctx.beginPath();
      ctx.ellipse(this.snakeX[i],this.snakeY[i],this.bodyWidth[i],this.bodyWidth[i],0,0, 2*Math.PI);
      ctx.stroke();
    }
  }
}



onload=function(){
  new Wildlife();
}