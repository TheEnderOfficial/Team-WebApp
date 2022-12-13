const users = {
    checkUser: function (tgId) {
        return new Promise((resolve, reject) => {
            this.socket.emit("checkUser", { tgId: tgId });
            this.socket.once("checkUser", (user) => {
                resolve(user);
            });
        });
    },
    setUserConfig: function (tgId, config) {
        return new Promise((resolve, reject) => {
            this.socket.emit("setUserConfig", { tgId: tgId, config: config });
            this.socket.once("setUserConfig", (data) => {
                resolve(data);
            });
        });
    },
    // create functions for using sendRequest and acceptRequest using tgId and acceptConfig
    sendRequest: function (tgId, acceptUserConfig) {
        return new Promise((resolve, reject) => {
            this.socket.emit("sendRequest", { tgId: tgId, acceptUserConfig: acceptUserConfig });
            this.socket.once("sendRequest", (data) => {
                resolve(data);
            });
        });
    },
    acceptRequest: function (tgId, type = 1) {
        return new Promise((resolve, reject) => {
            this.socket.emit("acceptRequest", { tgId: tgId, type });
            this.socket.once("acceptRequest", (data) => {
                resolve(data);
            });
        });
    },
    subscribeForAcceptingRequest: function (tgId, callback) {
        console.log("subscribing for accepting request");
        this.socket.on("acceptRequest", (data) => {
            console.log("accepting request", data);
            if (data.tgId === tgId) {
                callback(data);
            }
        });
    },
    subscribeForStartBot: function (callback) {
        this.socket.on("startBot", callback);
    },
    subscribeForSendPhoneNumber: function (callback) {
        this.socket.on("sendPhoneNumber", callback);
    },
    getAll() {
        return new Promise((resolve, reject) => {
            this.socket.emit("getAllUsers");
            this.socket.once("getAllUsers", (users) => {
                resolve(users);
            });
        });
    }

}