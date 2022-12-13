const bots = {
    getBots: function (tgId) {
        return new Promise((resolve, reject) => {
            this.socket.emit("getBots", { tgId: tgId });
            this.socket.once("getBots", (bots) => {
                resolve(bots);
            });
        });
    },
    addBot: function (tgId, botToken, botInfo) {
        return new Promise((resolve, reject) => {
            this.socket.emit("addBot", {
                tgId: tgId,
                botToken: botToken,
                username: botInfo.username,
                name: botInfo.first_name ?? "" + " " + botInfo.last_name ?? "",
            }
            );
            this.socket.once("addBot", (bot) => {
                resolve(bot);
            });
        });
    },
    deleteBot: function (tgId, id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("deleteBot", { tgId: tgId, id: id });
            this.socket.once("deleteBot", (bot) => {
                if (bot.success) {
                    resolve(bot);
                }
                else {
                    reject(bot);
                }
            });
        });
    },
    updateBot(bot) {
        return new Promise((resolve, reject) => {
            this.socket.emit("updateBot", bot);
            this.socket.once("updateBot", (bot) => {
                resolve(bot);

            });
        });
    }
}
