var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var users=[]
var mysql = require('mysql');
const fs = require("fs");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123123',
    database : 'mybatis'
});
connection.connect();
server.listen(3000,()=>{
    console.log('服务器启动成功')
})
app.use(require('express').static('public'))
app.get('/',function (req,res){
    res.redirected('/index.html')
})

//自定义服务
io.on('connection',socket =>{
    console.log('有用户连接');
    socket.on('login',data=>{
        console.log(data)
        if(users.find(Elm=>Elm.username===data.username)){
            socket.emit('loginFaile',{msg:'该用户已经登录'})
            console.log('该用户已登录')
        }
        else {
            var sql = "SELECT * FROM user where username = " + "\"" + data.username + "\""
            connection.query(sql, (err, result) => {
                if (err) {
                    console.log("查询失败" + err.message);
                    return;
                } else if (result == "") {
                    socket.emit('userAbsent')
                } else if (result[0].password != data.password) {
                    socket.emit('passwordWrong',result[0].password)
                } else {
                    data.Imag=result[0].image;
                    users.push(data)
                    console.log('登录成功')
                    socket.emit('loginSuccess', data)
                    io.emit('User_in', data)
                }
            })
            socket.on('chat_content', content => {
                console.log(content.chatObj);
                if(content.chatObj=='allPage'){
                io.emit('chatView', content)
                }
                else{
                    io.emit('privateChat',content)
                }
                console.log(content)
            })
            socket.on('sendImage',data=>{
                if(data.chatObj=='allPage'){
                    io.emit('receiveImage', data)
                }
                else{
                    io.emit('privateImage',data)
                }
            })

        }
    })
    socket.on('signUp',Signup_Message=>{
        console.log(Signup_Message);
        var signup = "select username from user where username=" + "\"" + Signup_Message.username + "\"";
        connection.query(signup,(err,result)=>{

                if(err) {
                    console.log("查询失败" + err.message);
                    return;
                }
                if(result==""){
                    var signupSuccess = 'INSERT INTO user(`username`,`password`) VALUES (\''+Signup_Message.username+'\',\''+Signup_Message.password+'\')';
                    connection.query(signupSuccess,(err,result)=>{

                    });
                    console.log(signupSuccess)
                    console.log(signup)
                    socket.emit("signUp_success")
                }
                else{
                    socket.emit("user_exit")
                }
            }
        )}
    )
})

