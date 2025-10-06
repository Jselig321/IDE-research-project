const logger = {
    position: { x: 0, y: 0 },
    action: "",
    arrayTracker: 0,
    timerActive: false,
    startTime: null,
    pauseStart: null,
    pausedDuration: 0,
    count: 0,

    eventLog: [],

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
        return this;
    },

    getElapsedTime: function () {
        if (!logger.startTime) return 0;

        const now = new Date();
        const elapsed = (now - logger.startTime - logger.pausedDuration) / 1000;
        return elapsed.toFixed(4);
    },

    logData: function (type, action, details) {
        if (!this.timerActive) return;

        const entry = {
            time: logger.getElapsedTime(),
            type: type,
            action: action,
            x: type === "Mouse" ? this.position.x : "",
            y: type === "Mouse" ? this.position.y : "",
            details: details || ""
        };

        logger.eventLog.push(entry);
        logger.arrayTracker++;

        console.log(`${entry.time}s | ${entry.type} | ${entry.action} | X: ${entry.x} | Y: ${entry.y} | ${entry.details}`);
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
        logger.eventLog = [];
        logger.arrayTracker = 0;
        logger.count = 0;

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('wheel', this.onMouseWheel);
        document.removeEventListener('keydown', this.onKeyDown);
        return this;
    },
};
