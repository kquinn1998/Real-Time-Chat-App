const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const name = initJoin()
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
    appendMessage(`${name} connected !`)
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected !`)
})
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
function initJoin(){
    alert("Welcome to Kevin's live group chat ! No one tracks you here !")
    var name = prompt('What is your name ?')
    appendMessage('You joined !')
    socket.emit('new-user', name)
    return name
}