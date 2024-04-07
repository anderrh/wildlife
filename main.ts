class Breakout {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor() {
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    document.body.appendChild(this.canvas)
    this.context =this.canvas.getContext("2d") as CanvasRenderingContext2D;
    console.log(this.context);
    this.canvas.width=innerWidth;
    this.canvas.height=innerHeight;
    document.addEventListener("keydown", this.draw.bind(this));
    document.addEventListener("keyup", this.draw.bind(this));
    requestAnimationFrame(this.draw.bind(this));
  }
  private keyreleased(e:KeyboardEvent){
console.log("DOWN",e);
  }
  private keypressed(e:KeyboardEvent){
    console.log("UP",e);
  }
  private draw(){
    console.log(this);
    console.log("HERE")
    const ctx:CanvasRenderingContext2D = this.context;

    console.log(ctx);
    ctx.fillRect(50,50,50,50)
    requestAnimationFrame(this.draw.bind(this));
  }
}



onload=function(){
  new Breakout();
}