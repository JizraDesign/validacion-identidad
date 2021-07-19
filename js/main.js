import Camara from "./foto.js";
import Mic from "./recAudio.js";
import Firma from "./Firma.js";
import Slider from "./Slider.js";

// >>>>> -->>>>> ----- instancia de clases ----- <<<<<-- <<<<<

const camDevice = document.querySelector("#camaraDevice"),
    camara = new Camara(camDevice, true);

const micDevice = document.querySelector("#micDevice"),
    mic = new Mic(micDevice);

const canvas = document.querySelector("#canvasFirma"),
   firma = new Firma(canvas, "black", 2); 

const pagsSlider = document.querySelectorAll(".item"),
    slider = new Slider(pagsSlider);

// >>>>> -->>>>> ----- funciones de la camaa ----- <<<<<-- <<<<<
 
const btnCamara = document.querySelector("#btnCamara"),
    contImgPrew = document.querySelector(".fotoPreview"),
    btnFoto = document.querySelector("#btnFoto"),
    btnReload = document.querySelector(".btn__pictur__reload");

btnCamara.onclick = () => {
    contImgPrew.classList.toggle("active");
    if(contImgPrew.classList.contains("active")){
        btnCamara.textContent="Apagar Camara";
        camara.encender();
    }else{
        document.querySelector(".cont__prew").style.display="none";
        btnCamara.textContent="Encender Camara";
        camara.apagar();
    };
};

btnFoto.onclick = () => {
    if(contImgPrew.classList.contains("active")){
        document.querySelector(".cont__prew").style.display="flex";
        let f = camara.foto();
        console.log(f);
    };
    camara.apagar();
};

btnReload.onclick = () => {
    camara.encender();
    document.querySelector(".cont__prew").style.display="none";
};

// >>>>> -->>>>> ----- funcones del microfono ----- <<<<<-- <<<<<

const btnRec = document.querySelector("#btnRec"),
    btnRecText = document.querySelector("#btnRec span");

btnRec.onclick = () => {
    btnRec.classList.toggle("rec");
    if(btnRec.classList.contains("rec")){
        document.querySelector("#micDevice").style.display="none";
        mic.saveRec()
        .then(res => console.log(res))

        btnRecText.textContent="Presiona para detener la grabación.";
    }else{
        document.querySelector("#micDevice").style.display="block";
        mic.stopRec();
        btnRecText.textContent="Presiona para comenzar la grabación.";
    };
};

// >>>>> -->>>>> ----- funciones del canvas(firma) ----- <<<<<-- <<<<<

const btnFirma = document.querySelector("#btnFirma"),
    btnBorrar = document.querySelector("#btnBorrar");

window.addEventListener("resize", () => {
    firma.resizeCanvas();
});

canvas.addEventListener("mousedown", e => {
    firma.init(e)
});
canvas.addEventListener("touchstart", e => {
    firma.init(e);
})

canvas.addEventListener("mousemove", e => {
    firma.mov(e);
});
canvas.addEventListener("touchmove", e => {
    let touch = e.touches[0];
    firma.mov(touch);
})

canvas.addEventListener("mouseup", e => {
    firma.firmar(e)
});
canvas.addEventListener("touchsend", e => {
    firma.firmar(e);
})

btnFirma.onclick = () => {
    const newFirma = firma.getFirma()
    console.log(newFirma);
};

btnBorrar.onclick = () => firma.borrar();


// >>>>> -->>>>> ----- slider ----- <<<<<-- <<<<<
const btnNext = document.querySelector("#btnNext");
btnNext.onclick = () => {
    slider.next();
};

// >>>>> -->>>>> ----- active menu ----- <<<<<-- <<<<<

const btnsMenu = document.querySelectorAll(".item__lista__menu");

btnsMenu.forEach( ( btn, i) => {
    btn.addEventListener("click", () => {
        btnsMenu.forEach( btn => btn.classList.remove("active") );
        btn.classList.add("active");
        slider.next(i);
    })
})
