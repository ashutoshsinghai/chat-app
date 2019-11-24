const socket = io('http://localhost:3000')
var form = document.forms[0]
var message = document.querySelector('#message')
var container = document.querySelector('#all')
var online_p = document.querySelector('#people')
form.addEventListener('submit',e=>{
	e.preventDefault()
	socket.emit("send-message",message.value)
	appendMessage("You:"+message.value)
	message.value = ""
})
const name = prompt("What is your name ?")
appendMessage("You joined..")
socket.emit('new-user',name)
socket.emit('show-users',"")
socket.on("chat-message",data=>{
	appendMessage(`${data.name}:${data.message}`)
})

socket.on("user-connected",data=>{
	appendMessage(data+" joined the conversation")
	appendUser(data)
})
socket.on("users",data=>{
	for(let i in data){
		appendUser(data[i])
	}
})
function appendMessage(message){
	const msg = document.createElement('div')
	msg.innerText = message
	container.append(msg)
}
function appendUser(user){
	const usr = document.createElement('li')
	usr.innerText = user
	online_p.append(usr)
}