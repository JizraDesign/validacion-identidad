
/**
 * Activar camara tomar foto
 */
class Camara{
    /**
     * Constructor de la calse Camara
     * @param {String} videoNode Elemento donde se ve el video capturado
     */
    constructor( videoNode, mirror ){
        this.videoNode = videoNode;
        this.mirror = mirror;
        this.mod = 1;
        this.tempo = null;
        this.predictedAges = [];
    };

    /**
     * Encender la camara
     */
    encender(){
        
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('js/face-api/weights/'),
            faceapi.nets.faceLandmark68Net.loadFromUri('js/face-api/weights/'),
            faceapi.nets.faceRecognitionNet.loadFromUri('js/face-api/weights/'),
            faceapi.nets.faceExpressionNet.loadFromUri('js/face-api/weights/'),
            faceapi.nets.ageGenderNet.loadFromUri('js/face-api/weights/')

        ])
        .then(this.startVideo())
        
    };
    /**
     * 
     */
    startVideo(){
        if( navigator.mediaDevices ){
            navigator.mediaDevices.getUserMedia({
                audio:false,
                video:{
                    width: { min: 776, ideal: 720, max: 1080 },
                    height: { min: 1024, ideal: 1280, max: 1920 }
                }
            })
            .then( stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;

                this.videoNode.onplay = async () => {

                    this.canvasSize = faceapi.createCanvasFromMedia(this.videoNode);
                    document.body.append(this.canvasSize);
                    this.canvasSize.remove();
                    
                    console.log(this.canvasSize.width, this.canvasSize.height);

                    let contenedor = this.videoNode.parentNode,
                        contWidth = contenedor.clientWidth,
                        contHeight = contenedor.clientHeight;

                    document.querySelector("#camaraDevice").width = contWidth;
                    document.querySelector("#camaraDevice").height = contHeight;

                    const displaySize = { width: contWidth, height: contHeight };
                    console.log(displaySize);
                    this.canvasIA = faceapi.createCanvasFromMedia(this.videoNode);
                    this.canvasIA.setAttribute("id", "canvasIA");
                    this.canvasIA.setAttribute("class", "canvas__ia");
                    contenedor.append(this.canvasIA);
                    faceapi.matchDimensions(this.canvasIA, displaySize);

                    this.tempo = setInterval( async() => {

                        const detection = await faceapi.detectAllFaces(
                            this.videoNode, 
                            new faceapi.TinyFaceDetectorOptions()
                        )
                        .withFaceLandmarks()
                        .withFaceExpressions()
                        .withAgeAndGender();

                        const resizeDetections = faceapi.resizeResults(detection, displaySize);

                        this.contextIA = this.canvasIA.getContext("2d");
                        this.contextIA.clearRect(0, 0, this.canvasIA.width, this.canvasIA.height);
                        
                        faceapi.draw.drawDetections(this.canvasIA, resizeDetections);
                        faceapi.draw.drawFaceLandmarks(this.canvasIA, resizeDetections);
                        faceapi.draw.drawFaceExpressions(this.canvasIA, resizeDetections);
                        
                        try {

                            // console.log(resizeDetections[0]);
                            // console.log(resizeDetections[0].age);
                            // console.log(resizeDetections[0].gender);

                            const age = resizeDetections[0].age;
                            const interpolatedAge = this.interpolatedAgePredictions(age);
                            const bottomRight = {

                                x: resizeDetections[0].detection.box.bottomRight.x,
                                y: resizeDetections[0].detection.box.bottomRight.y

                            }

                            new faceapi.draw.DrawTextField(
                                [
                                    `${faceapi.utils.round(interpolatedAge, 0)} years `, 
                                    resizeDetections[0].gender
                                ],
                                bottomRight
                            ).draw(this.canvasIA)

                        }catch (error) {


                        }
                        
                    }, 500);

                };
            });
        };
    };


    interpolatedAgePredictions(age){
        
        this.predictedAges = [age].concat(this.predictedAges).slice(0, 30);
        
        const avgPredictedAge = this.predictedAges.reduce((total, a) => total + a) / this.predictedAges.length;
        
        return avgPredictedAge;
    }


    /**
     * Apagar la camara
     */
    apagar(){
        this.videoNode.pause();

        if( this.stream ){
            this.stream.getTracks()[0].stop();
        };
        this.clearAI();
    };

    /**
     * Tomar foto
     * @param {Number} mW Ancho maximo
     * @param {Nomber} mH Alto maximo
     * @returns Regresa el objeto en base 64
     */
    foto(mW, mH){

        // >>>>> -->>>>> ----- base 64 files ----- <<<<<-- <<<<<  
        if(!mW){
            mW=this.canvasSize.width,
            mH=this.canvasSize.height
        };

        let canvas = document.body.appendChild(document.createElement('canvas'));
            canvas.setAttribute("width", mW);
            canvas.setAttribute("height", mH);

        let ctx = canvas.getContext("2d");

        if(this.mirror === true){
            ctx.scale(-1, 1);
            this.mod = -1;
        }
        ctx.drawImage(this.videoNode, 0, 0, canvas.width * this.mod, canvas.height);

        this.fotoB64 = canvas.toDataURL("image/png");
        document.querySelector("#resFoto").src=this.fotoB64;
        canvas.remove();  
        
        return this.fotoB64;
    };

    clearAI(){
        console.log("log");
        clearInterval(this.tempo);
        this.contextIA.clearRect(0, 0, this.canvasIA.width, this.canvasIA.height);
        this.canvasIA.remove();
    }

};

export default Camara