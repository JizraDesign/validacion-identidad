class Firma{

    constructor(canvas, color, grosor){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.dibujando = false;
        this.color = color;
        this.grosor = grosor

        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
    }

    init(e){
         
        console.log("Vas a inicar a firmar");
        this.rect = this.canvas.getBoundingClientRect();
        this.x = e.clientX - this.rect.left;
        this.y = e.clientY - this.rect.top;
        
        
        this.dibujando=true;
        
    }

    mov(e){
        
        if(this.dibujando === true){
            
            this.dibujar(this.x, this.y, e.clientX - this.rect.left, e.clientY - this.rect.top);
            this.x = e.clientX - this.rect.left;
            this.y = e.clientY - this.rect.top;
            
        };  
    };

    dibujar(x1, y1, x2, y2){
        this.ctx.beginPath();
        this.ctx.strokeStyle=this.color;
        this.ctx.lineWidth=this.grosor;

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    firmar(e){
        if(this.dibujando === true){
            this.dibujar(this.x, this.y, e.clientX - this.rect.left, e.clientY - this.rect.top);
            this.x = 0;
            this.y = 0;
            this.dibujando = false;
        };
    }
    
    borrar(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    getFirma(){
        this.firmaB64 =  this.canvas.toDataURL("image/png");
        return this.firmaB64

        // this.element = document.querySelector("#resfirma");
        // this.element.src=this.firmaB64;
    }
    
    resizeCanvas(){
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
    }
}

export default Firma