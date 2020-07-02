// 'use strict';
/*
 * Before start chatting you need to follow this steps:
 * 1. Initialize QB SDK ( QB.init() );
 * 2. Create user session (QB.createSession());
 * 3. Connect to the chat in the create session callback (QB.chat.connect());
 * 4. Set listeners;
 */



function App(config) {
    this._config = config;
    this.user = null;
    this.token = null;
    this.isDashboardLoaded = false;
    this.room = null;
    // Elements
    this.page = document.querySelector('#page');
    this.sidebar = null;
    this.content = null;
    this.userListConteiner = null;
    this.init(this._config);
    this.loading = true;
    this.QB = QB;


}
var user = {
    login: "Coach",
    password: '11223344',
    full_name: "coach"
};

// Initializing the QuickBlox

App.prototype.init = function (config) {
    // Step 1. QB SDK initialization.
    QB.init(config.credentials.appId, config.credentials.authKey, config.credentials.authSecret, config.appConfig);



    this.createSession(user)

};

App.prototype.createSession = function (params) {
    let login = params.login;
    let password = params.password
    QB.createSession(params, function (err, result) {
        // callback function

        if (err) {
            console.log(err);

        } else {
            console.log(this.QB);

            QB.login({
                login: params.login,
                password: params.password
            }, (err, resp) => {

                if (err) {
                    console.log(err);

                } else {
                    console.log(resp);

                    QB.chat.connect({ userId: resp.id, password: params.password }, function (error, contactList) {

                        if (error) {
                            console.log(error);

                        }
                        else {

                            console.log(contactList);
                            
                            var filters = {}

                            QB.chat.dialog.list(filters, function (error, dialogs) {
                                if (error) {
                                    console.log(error);

                                }
                                else {
                                    let userArry = dialogs.items
                                    let leftSide = document.getElementById('users-list')
                                    userArry.map((item, key) => {
                                        return leftSide.innerHTML += `<li class="user" >
                                        <div class="user-detail" onclick="getUserMsg('${item._id}' , ${item.user_id})">
                                            <div class="image-outer">
                                                <img src="https://i1.sndcdn.com/avatars-avI8WNqzZkFhR4di-POKrYA-t500x500.jpg"
                                                    alt="" class="user-image">
                                            </div>
                                            <div class="user-name-outer">
                                                <div class="user-name" >
                                                    ${item.name}
                                                </div>
                                                <div class="user-message">
                                                    ${item.last_message}
                                                </div>
                                            </div>
                                        </div>
                                    </li>`

                                    })

                                    // var params = {
                                    //     chat_dialog_id: userArry[0]._id,
                                    //     sort_desc: 'date_sent',
                                    //     limit: 100,
                                    //     skip: 0
                                    // };

                                    getUserMsg(userArry[0]._id, userArry[0].user_id)
                                }

                            });
                        }
                    });
                }
            })
        }

    });
}

function getUserMsg(dialogueID, userID) {
    console.log(userID);
    
    var params = {
        chat_dialog_id: dialogueID,
        sort_desc: 'date_sent',
        limit: 100,
        skip: 0
    };
    let container = document.getElementById('message-container')

    container.innerHTML = `<div class="mine-messages message-box" id="mine-message" style={width: "100%"}>
                                <div class="mine-message-box">
                                    <div class="type-message">
                                        Loading..
                                    </div>
                                </div>
                            </div>`


    QB.chat.message.list(params, function (error, messages) {
        if (error) {
            console.log(error);

        } else {
            container.innerHTML =   ""
            console.log(messages);
            messages.items.map((item, key) => {
                console.log(item);
                
                let btn = document.getElementById("send-button")
                btn.setAttribute("data-dialog-id", item.chat_dialog_id)
                btn.setAttribute("data-recipient_id", item.recipient_id)
                if (item.sender_id == userID) {
                    return container.innerHTML += `<div class="mine-messages message-box" data-dialog-id="${item.chat_dialog_id}" data-recipient_id="${item.recipient_id} id="mine-message">
                                                            <div class="image-outer">
                                                                <img src="https://i1.sndcdn.com/avatars-avI8WNqzZkFhR4di-POKrYA-t500x500.jpg" alt=""
                                                                class="user-pic">
                                                            </div>
                                                        <div class="mine-message-box">
                                                            <div class="type-message">
                                                                ${item.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="time-chat-incoming">
                                                        ${item.created_at.slice(11, 16)}
                                                    </div>
                `
                }
                else {

                    return container.innerHTML += `<div class="your-messages message-box">
                                                        <div class="image-outer">
                                                            <img src="https://i1.sndcdn.com/avatars-avI8WNqzZkFhR4di-POKrYA-t500x500.jpg" alt=""
                                                                class="user-pic">
                                                        </div>
                                                        <div class="mine-message-box">
                                                            <div class="type-message">
                                                            ${item.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="time-chat-sending">
                                                    ${item.created_at.slice(11, 16)}
                                                    </div>`
                }
            })
        }

    });
}

document.getElementById("send-button").addEventListener('click', function (e) {
    e.preventDefault()
    console.log(e);

    let dialog_id = e.target.dataset.dialogId
    let recipient_id = e.target.dataset.recipient_id
    console.log(dialog_id && recipient_id);

    var msg = {
        type: "chat",
        body: "How are you today?",
        extension: {
            save_to_history: 1,
            dialog_id
        },
        markable: 1
    };
    
    console.log(QB.chat.send)
    var jidOrUserId = JSON.parse(recipient_id);
    msg.id = QB.chat.send(jidOrUserId, msg);
    
    console.log(message);
    

    // QB.chat.onMessageListener(function onMessage(userId, message) {
    //     console.log(userId || message);


    // })



}
)



console.log(QB);

// QBconfig was loaded from QBconfig.js file
var app = new App(QBconfig);