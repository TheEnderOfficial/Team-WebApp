let user = window.Telegram.WebApp.initDataUnsafe.user
let chat = window.Telegram.WebApp.initDataUnsafe.user
document.querySelector("#username").textContent = user.username

let mainState = document.querySelector("#mainState")
let botState = document.querySelector("#botState")

function setMain() {
    mainState.style.display = "block"
    botState.style.display = "none"
    cfgure()
}


function setBot(bot) {
    mainState.style.display = "none"
    botState.style.display = "block"
    window.bot = bot;

    document.querySelector("#botState__username").textContent = bot.username
    document.querySelector("#botState__helloText").value = bot.helloMessage
    document.querySelector("#botState__buttonText").value = bot.buttonText
    document.querySelector("#botState__onAuthComplete").value = bot.onAuthComplete
}

function saveBot() {
    let bot = window.bot;
    bot.helloMessage = document.querySelector("#botState__helloText").value
    bot.buttonText = document.querySelector("#botState__buttonText").value
    bot.onAuthComplete = document.querySelector("#botState__onAuthComplete").value

    sdk.bots.updateBot(bot).then(() => {
        cfgure()
        setBot(bot)
    })
}

const sdk = new SDK("http://7.tcp.eu.ngrok.io:16098", true)

function cfgure () {
    document.querySelector("#botList").innerHTML = ""
    sdk.bots.getBots(user.id).then(botss => {
        let bots = botss.bots;
        let botList = document.querySelector("#botList")

        bots.forEach(bot => {
    
            let botItem = document.createElement("button")
            botItem.classList.add("list-group-item", "list-group-item-action")
            botItem.innerHTML = `
                <div class="botItem__username">@${bot.username}</div>
            `
            botItem.addEventListener("click", () => {
                setBot(bot)
                
            
            })
            botList.appendChild(botItem)
        })
    })
}

sdk.onInit(() => {
    setMain()
})
