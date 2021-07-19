class Slider{

    constructor( paginas){
        this.paginas = paginas;
        this.count = 0;
        this.btnsMenu = document.querySelectorAll(".item__lista__menu");
    }

    next(avance){
        if(typeof avance === "number"){
            this.count = avance
        }else{
            this.count++;
            this.btnsMenu.forEach( btn => btn.classList.remove("active"));
            this.btnsMenu[this.count].classList.add("active");
        };

        if(this.count < this.paginas.length){
            this.paginas[0].style.marginLeft ="-"+ 100 * this.count + "%";
        }else{
            
            btnNext.textContent = "Fin";
            setTimeout(() => {
            window.location.reload();
            }, 2000);
        }
    }
}

export default Slider