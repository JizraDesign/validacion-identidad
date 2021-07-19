/**
 * Grabar audio
 */
class Mic{
     /**
      * Constructor de la clase Mic
      * @param {String} audioNode Elemento donde se reproduce el audio
      */
    constructor( audioNode ){
        this.audioNode = audioNode;
    };

    /**
     * Iniciar Grabacion
     */
    initRec(){
        let promesa = new Promise( (resolve, reject) => {
            if( navigator.mediaDevices ){
                navigator.mediaDevices.getUserMedia({
                    audio:true,
                    video:false
                })
                .then( stream => {
                    this.stream = stream;
                    this.rec = new MediaRecorder( stream );
                    this.items = [];
                    this.rec.ondataavailable = e => {
                        this.items.push(e.data);
                        if(this.rec.state == 'inactive'){
                            this.blob = new Blob(this.items, {type : 'audio/webm'});
                            this.audioNode.src=URL.createObjectURL(this.blob);
                            resolve(this.blob);
                        };
                    }
                    this.rec.start(100);
                });
            };
        });
        return promesa
    };

    /**
     * Detener Grabacion
     */
    stopRec(){
        if(this.stream){
            this.rec.stop();
            this.stream.getTracks()[0].stop();
        }
    };

    /**
     * Objener grabacion en base 64
     */
    saveRec(){
        let promesa = new Promise( (resolve, reject) => {
            this.initRec()
            .then(res => {
                this.reader = new FileReader();
                this.reader.readAsDataURL(res);
                this.reader.onloadend = () => {
                    this.audioB64 = this.reader.result;
                    resolve(this.audioB64);
                };
            });
             
        });
        return promesa;
    };
};

export default Mic