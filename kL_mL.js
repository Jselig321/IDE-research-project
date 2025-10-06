const logger = {
    position: { x: 0, y: 0 },
    action: "",
    timerActive: false,
    startTime: null,
    pauseStart: null,
    pausedDuration: 0,
    count: 0,
    arrayTracker: 0,
    intervalId: null,
    lastTime: 0,

    eventLog: [[], [], [], [], [], [],],
    prev30: [[], [], [], [], [], [],],
    fakeProc: [[], [], [], [], [], [],],

    startTimer: function () {
        const now = new Date();
    
        if (!logger.startTime) {
            logger.startTime = now;
        }
    
        if (logger.pauseStart) {
            logger.pausedDuration += (now - this.pauseStart);
            logger.pauseStart = null;
        }
    
        logger.timerActive = true;
    
        if (!logger.intervalId) {
            logger.dataCollectingTimer();
        }
    
        return this;
    },  

    getElapsedTime: function () {
        if (!logger.startTime) return 0;

        const now = new Date();
        const elapsed = (now - logger.startTime - logger.pausedDuration) / 1000;
        return elapsed.toFixed(3);
    },

    logData: function (type, action, details) {
        logger.eventLog[0][logger.arrayTracker] = logger.getElapsedTime();
        logger.eventLog[1][logger.arrayTracker] = type;
        logger.eventLog[2][logger.arrayTracker] = action;
        if (type === "Mouse") {
          logger.eventLog[3][logger.arrayTracker] = logger.position.x;
          logger.eventLog[4][logger.arrayTracker] = logger.position.y;
          logger.eventLog[5][logger.arrayTracker] = "";
        }
        else {
          logger.eventLog[3][logger.arrayTracker] = "";
          logger.eventLog[4][logger.arrayTracker] = "";
          logger.eventLog[5][logger.arrayTracker] = details;
        }
        console.log(`${logger.eventLog[0][logger.arrayTracker]}, ${logger.eventLog[1][logger.arrayTracker]}, ${logger.eventLog[2][logger.arrayTracker]}, X: ${logger.eventLog[3][logger.arrayTracker]}, Y: ${logger.eventLog[4][logger.arrayTracker]}, ${logger.eventLog[5][logger.arrayTracker]}`);
        logger.arrayTracker++;
      },
    

    onMouseMove: function (e) {
        logger.position.x = e.clientX;
        logger.position.y = e.clientY;
    },

    onMouseDown: function (e) {
        const buttonMap = ["Left", "Middle", "Right"];
        logger.action = `${buttonMap[e.button] || "Unknown"} Mouse Click`;
        logger.logData("Mouse", logger.action, "");
    },

    onMouseWheel: function () {
        logger.logData("Mouse", "Mouse Scroll", "");
    },

    onKeyDown: function (e) {
        const keyName = e.key;
        if (["Control", "Shift", "Meta"].includes(keyName)) return;
        logger.logData("Keyboard", "Key Pressed", `Key: ${keyName}`);
    },

    Tracker: function () {
        logger.startTimer();
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('wheel', this.onMouseWheel);
        document.addEventListener('keydown', this.onKeyDown);
        return this;
    },

    pauseTracker: function () {
        if (logger.timerActive) {
            logger.pauseStart = new Date();
            logger.timerActive = false;
        }

        if (logger.intervalId) {
            clearInterval(logger.intervalId);
            logger.intervalId = null;
        }

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('wheel', this.onMouseWheel);
        document.removeEventListener('keydown', this.onKeyDown);
        return this;
    },

    clearTracker: function () {
        logger.timerActive = false;
        logger.startTime = null;
        logger.pauseStart = null;
        logger.pausedDuration = 0;
        logger.eventLog = [[], [], [], [], [], []];
        logger.prev30 = [[], [], [], [], [], []];
        logger.fakeProc = [[], [], [], [], [], []];
        logger.arrayTracker = 0;
        logger.count = 0;
        logger.lastTime = 0;

        if (logger.intervalId) {
            clearInterval(logger.intervalId);
            logger.intervalId = null;
        }

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('wheel', this.onMouseWheel);
        document.removeEventListener('keydown', this.onKeyDown);
        return this;
    },

    transferToPrev: function(){
        for(let i=0;i<logger.eventLog.length;i++){
            logger.prev30[i] = logger.prev30[i].concat(logger.eventLog[i].slice())
        }
        logger.eventLog = [[], [], [], [], [], []];
        logger.arrayTracker = 0;
        console.log(logger.prev30);
        console.log(logger.getElapsedTime());
    },

    transferToProc: function(){
        for(let i=0;i<logger.prev30.length;i++){
            logger.fakeProc[i] = logger.fakeProc[i].concat(logger.prev30[i].slice())
        }
        logger.prev30 = [[], [], [], [], [], []];
        console.log(logger.fakeProc);
    },

    
    dataCollectingTimer: function(){
        if(logger.timerActive){
        logger.intervalId=setInterval(() =>{
            if(parseFloat(logger.getElapsedTime()) - logger.lastTime >= 5){
                logger.lastTime += 5;
                logger.transferToPrev();
                logger.transferToProc();
            }
        }, 100)
        } 
    },

};
