var io = require("socket.io")(process.env.PORT||3000)
users = {}
io.on("connection",socket=>{
	console.log("new user")
	socket.on("send-message",data=>{
		socket.broadcast.emit('chat-message',{message:data,name:users[socket.id]})
	})

	socket.on('new-user',data=>{
		users[socket.id] = data
		socket.broadcast.emit('user-connected',data)
	})

	socket.on('show-users',()=>{
		socket.emit('users',users)
	})
})