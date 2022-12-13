// create function for wrapping functinon before call function check if _socket is not undefined
function _socketCheckWrap(func) {
    return function (...args) {
        if (this.socket) {
            return func.apply(this, args);
        } else {
            throw new Error("Socket is not initialized");
        }
    };
}

const objectMap = (object, mapFn) => Object.fromEntries(Object.entries(object).map(([k, v]) => [k, mapFn(v)]));
// create class for the SDK using socket.io-client
class SDK {
    _debugMode = false;
    _thisType = 0;
    socket = undefined;
    _onInits = []

    constructor(host = "http://localhost:9001", debugMode = false) {
        this.socket = io(host);
        this._debugMode = debugMode;
        this.init();
        this._setMe(2);
    }

    onInit(callback) {
        this._onInits.push(callback);
    }

    init() {
        this.socket.onAny((event, ...args) => {
            if (this._debugMode) {
                console.log(`got ${event}, ${JSON.stringify(args)}`);
            }
        });

        // on connect listener
        this.socket.on("connect", () => {
            if (this._debugMode) {
                console.log("Connected to the server");
            }
            this._onInits.forEach(callback => callback());
        });

        // on error listener throw
        this.socket.on("error", (error) => {
            console.log(error)
            throw new Error(error);
        });

        // DONT FORGOT RETURN SOCKET CHECK

        SDK.prototype.bots = objectMap(bots, fnc => fnc.bind(this));
        SDK.prototype.users = objectMap(users, fnc => fnc.bind(this))
        SDK.prototype.logs = objectMap(logs, fnc => fnc.bind(this));
    }

    _setMe(type) {
        this._thisType = type;
        this.socket.emit("setMe", { type: type });
    }
}

module.exports = SDK;