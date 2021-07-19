class Device{
    constructor(){
        this.movil = false;
        this.tablet = false;
        this.android = false;
        this.iPhone = false;
        this.iPad = false;
        this.ordenador = false;
        this.windows = false;
        this.linux = false;
        this.mac = false;
    }

    /*------------ getter ------------*/
    get getMovil(){
        return this.movil;
    }
    get getTablet(){
        return this.tablet;
    }
    get getAndroid(){
        return this.android;
    }
    get getIphone(){
        return this.iPhone;
    }
    get getIpad(){
        return this.iPad;
    }
    get getOrdenador(){
        return this.ordenador;
    }
    get getWindows(){
        return this.windows;
    }
    get getLinux(){
        return this.linux;
    }
    get getMac(){
        return this.mac;
    }
    get getArray(){
        return {
            movil:this.movil,
            tablet:this.tablet,
            android:this.android,
            iphone:this.iPhone,
            ipad:this.iPad,
            ordenador:this.ordenador,
            windows:this.windows,
            linux:this.linux,
            mac:this.mac
        };
    }

    /*------------ setter ------------*/
    set setMovil(boolean){
        this.movil = boolean;
    }
    set setTablet(boolean){
        this.tablet = boolean;
    }
    set setAndroid(boolean){
        this.android = boolean;
    }
    set setIphone(boolean){
        this.iPhone = boolean;
    }
    set setIpad(boolean){
        this.iPad = boolean;
    }
    set setOrdenador(boolean){
        this.ordenador = boolean;
    }
    set setWindows(boolean){
        this.windows = boolean;
    }
    set setLinux(boolean){
        this.linux = boolean;
    }
    set setMac(boolean){
        this.mac = boolean;
    }

    static get(){
        const device = new Device;
        /*------tipo de dispositivo------- */
        if(navigator.userAgent.toLowerCase().match(/mobile/)){
            
            device.setMovil = true;

        }else if(navigator.userAgent.toLowerCase().match(/tablet/)){
            
            device.setTablet = true;

        }else{

            device.setOrdenador = true;
        };

        if(this.movil === true){
            if(navigator.userAgent.toLowerCase().match(/android/)){
                
                device.setAndroid = true;

            }else if(navigator.userAgent.toLowerCase().match(/ipad/)){
                
                device.setIpad = true;

            }else{
                device.setIphone = true;
            };

        }else if(this.tablet === true){
            
            device.setTablet = true;

        }else{
            if(navigator.userAgent.toLowerCase().match(/mac/)){
                
                device.setMac = true;

            }else if(navigator.userAgent.toLowerCase().match(/linux/)){
                
                device.setLinux = true;

            }else if(navigator.userAgent.toLowerCase().match(/windows/)){
                
                device.setWindows = true;

            }
        }

        return device.getArray

    }

}

export default Device