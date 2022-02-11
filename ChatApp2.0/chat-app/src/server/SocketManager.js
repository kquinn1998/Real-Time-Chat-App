const io = require('./index.js').io
const {createUser, createMessage, createChat} = require('../Factories')
const {VERIFY_USER, USER_CONNECTED, LOGOUT, USER_DISCONNECTED, COMMUNITY_CHAT} = require('../Events')
let connectedUsers = { }
let communityChat = createChat()


module.exports = function(socket){
    console.log('Socket id: ' + socket.id)
    socket.on(VERIFY_USER, (nickname, callback)=>{
        if(isUser(connectedUsers, nickname)){
            callback({isUser:true, user:null})
        }else{
            callback({isUser:false, user:createUser({name:nickname})})
        }
    })

    socket.on(USER_CONNECTED, (user)=>{
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user
        io.emit(USER_CONNECTED, connectedUsers)
        console.log(connectedUsers);
    })

    socket.on('disconnect', ()=>{
        if("user" in socket){
            connectedUsers = removeUser(connectedUsers, socket.user.name)

            io.emit(USER_DISCONNECTED, connectedUsers)

            console.log("User disconnected !")
        }
    })

    socket.on(LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name)

        io.emit(USER_DISCONNECTED, connectedUsers)

        console.log("User disconnected !")
    })

    socket.on(COMMUNITY_CHAT ,(callback)=> {
        callback(communityChat)
    })
}



function isUser(userList, username){
    return username in userList
}

function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}