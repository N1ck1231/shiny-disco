var socket = io('http://localhost:3000');
var user_name;
var pass_word;
var RightPassword;
var head_image;
var signUser_name;
var signPass_word;
var signPass_word_again;
var date = new Date;
var userContent;
var Hassend=[];
var Hasadd=[];
var lastUserContent="allPage";
date = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()+"/"+date.getHours()+":"+date.getMinutes()
$("#loginBtn").on('click',function (){
    user_name=$('#username').val().trim()
    pass_word=$('#password').val().trim()
    /*obj_Imag=document.getElementById("headImage");
    head_image = obj_Imag.src;*/
    if(!user_name){
        alert('请输入用户名')
        return
    }
    if(!pass_word){
        alert('请输入密码')
        return
    }

    socket.emit('login',{username: user_name,password:pass_word,Imag:head_image})
})
$("#upSign").on('click',function () {
    $('.form-wrapper').fadeOut();
    $('.signUp-form-wrapper').fadeIn();
})
$("#sign_Submit").on('click',function () {
    signUser_name = $('#signUsername').val().trim()
    signPass_word = $('#signPassword').val().trim()
    signPass_word_again = $('#password_again').val().trim()
    if (!signUser_name) {
        alert('请设置用户名');
        return
    } else if (!signPass_word) {
        alert('请设置密码')
        return;
    } else if (!signPass_word_again) {
        alert('请确认密码')
        return;
    } else if (signPass_word != signPass_word_again) {
        alert('两次密码不一致，请重新输入')
        return;
    }

    socket.emit('signUp',{username: signUser_name,password:signPass_word})
})
$("#signup_Cancel").on('click',function () {
    $('.form-wrapper').fadeIn();
    $('.signUp-form-wrapper').fadeOut();
})
socket.on('loginSuccess',data=>{
    head_image=data.Imag;
    $('.container').fadeOut();
    $('.chat_container').fadeIn();
    $('.user_list').append(`
       <div class="user_message" id="message_user">
            <div class="user_imag"><img class ="user_imag_inside" src="${data.Imag}" id="userHead_Image"></div>
            <div class="user_content" id="content_user">${data.username}</div>
       </div> 
`)
})
socket.on('loginFaile',function (){
    alert('该用户已经登录')
})
socket.on('signUp_success',function (){
    $('.form-wrapper').fadeIn();
    $('.signUp-form-wrapper').fadeOut();
})
socket.on('user_exit',function (){
    alert('该用户名已经被使用')
})
socket.on('userAbsent',function (){
    alert('用户不存在')
})
socket.on('passwordWrong',rightPassword=>{
    alert('密码错误')
})

socket.on('User_in',data=>{
    //document.getElementById("content_user").innerHTML=data.username+"加入群聊"
        $('.chatList').append(`
           <div class="User_in" id="in_user">
               ${data.username} 加入了群聊
           </div> `)
    })
//发送消息函数
function send(){
    var content =  $("#"+"_text_view"+lastUserContent).html();
    if(!content){
        alert('不能发送空消息')
    }
    socket.emit('chat_content',{
        message:content,
        username:user_name,
        Imag:head_image,
        chatObj:lastUserContent
    })
    $("#"+"_text_view"+lastUserContent).html('');
    //$('#_text_view').value="";
}
//接受图片
$('#_picture').on('change',function (){
    var file = this.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function (){
        socket.emit('sendImage',{
            username:user_name,
            chatObj:lastUserContent,
            Imag:head_image,
            img:fr.result
        })
    }
})
//接受到群聊文字消息
socket.on('chatView',content=>{

    if(content.username===user_name){
        $('#groupChat').append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $('#groupChat').append(`
            <!--<div class = "my_Chat_cotainer ">-->
            <div class="my_Chatbox" id = "Chatbox_my">
                <div class = "my_Chat" id = "Chat_my">${content.message}</div>
            </div>
             <div class = "my_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
             <!--</div>-->
            `)
    }
    else{
        $('#groupChat').append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $('#groupChat').append(`
            <div class="others_Chatbox" id = "Chatbox_others">
                <div class = "others_Chat" id = "Chat_others">${content.username}:${content.message}</div>
            </div>
            <div class = "other_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
            `)
        if(!Hassend.find(Elm=>Elm===content.username)){ console.log(content.username)
            Hassend.push(content.username);
            $('.user_list').append(`
       <div class="other_user_message" id="message_user">
            <div class="user_imag"><img class ="user_imag_inside" src="${content.Imag}" id="userHead_Image"></div>
            <div class="user_content" id="content_user">${content.username}</div>
       </div> `)}
    }
})
//接收到群聊图片消息
socket.on('receiveImage',content=>{
    if(content.username===user_name){
        $('#groupChat').append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $('#groupChat').append(`
            <div class = "my_Chat_cotainer ">
            <div class="my_Chatbox" id = "Chatbox_my">
                <div class = "my_Chat" id = "Chat_my"><img class="sendImage" src="${content.img}"></div>
            </div>
             <div class = "my_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
             </div>
            `)
    }
    else{
        $('#groupChat').append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $('#groupChat').append(`
            <div class = "my_Chat_cotainer ">
            <div class="others_Chatbox" id = "Chatbox_others">
                <div class = "others_Chat" id = "Chat_others">${content.username}:<img class="sendImage" src="${content.img}"></div>
            </div>
            <div class = "other_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
            </div>
            `)
        if(!Hassend.find(Elm=>Elm===content.username)){ console.log(content.username)
            Hassend.push(content.username);
            $('.user_list').append(`
       <div class="other_user_message" id="message_user">
            <div class="user_imag"><img class ="user_imag_inside" src="${content.Imag}" id="userHead_Image"></div>
            <div class="user_content" id="content_user">${content.username}</div>
       </div> `)}

    }
})

//接受到私聊文字消息
socket.on('privateChat',content=>{
    console.log(lastUserContent);
    console.log(content.chatObj);
    if(content.username===user_name){
        $("#"+"_chatList"+lastUserContent).append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $("#"+"_chatList"+lastUserContent).append(`
            <!--<div class = "my_Chat_cotainer ">-->
            <div class="my_Chatbox" id = "Chatbox_my">
                <div class = "my_Chat" id = "Chat_my">${content.message}</div>
            </div>
             <div class = "my_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
             <!--</div>-->
            `)
    }
    else{
        $("#"+"_chatList"+content.username).append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $("#"+"_chatList"+content.username).append(`
            <div class="others_Chatbox" id = "Chatbox_others">
                <div class = "others_Chat" id = "Chat_others">${content.username}:${content.message}</div>
            </div>
            <div class = "other_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
            `)
        if(!Hassend.find(Elm=>Elm===content.username)){ console.log(content.username)
            Hassend.push(content.username);
            $('.user_list').append(`
       <div class="other_user_message" id="message_user">
            <div class="user_imag"><img class ="user_imag_inside" src="${content.Imag}" id="userHead_Image"></div>
            <div class="user_content" id="content_user">${content.username}</div>
       </div> `)}
    }
})
//私聊图片消息
socket.on('privateImage',content=>{
    if(content.username===user_name){
        $("#"+"_chatList"+lastUserContent).append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $("#"+"_chatList"+lastUserContent).append(`
            <div class = "my_Chat_cotainer ">
            <div class="my_Chatbox" id = "Chatbox_my">
                <div class = "my_Chat" id = "Chat_my"><img class="sendImage" src="${content.img}"></div>
            </div>
             <div class = "my_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
             </div>
            `)
    }
    else{
        $("#"+"_chatList"+content.username).append(`
             <div class="User_in" id="date">
              ${date}
           </div> 
            `)
        $("#"+"_chatList"+content.username).append(`
            <div class = "my_Chat_cotainer ">
            <div class="others_Chatbox" id = "Chatbox_others">
                <div class = "others_Chat" id = "Chat_others">${content.username}:<img class="sendImage" src="${content.img}"></div>
            </div>
            <div class = "other_Chat_image" ><img class ="chat_my_Image" src="${content.Imag}" id="userHead_Image"></div>
            </div>
            `)
        if(!Hassend.find(Elm=>Elm===content.username)){ console.log(content.username)
            Hassend.push(content.username);
            $('.user_list').append(`
       <div class="other_user_message" id="message_user">
            <div class="user_imag"><img class ="user_imag_inside" src="${content.Imag}" id="userHead_Image"></div>
            <div class="user_content" id="content_user">${content.username}</div>
       </div> `)}

    }
})
//点击用户列表切换聊天对象
$('.user_list').click(function (e){
    if(e.target.tagName==='DIV'){
        var $div=$(e.target)
        userContent=$div.text().trim()
        console.log(userContent);
    }
    if(!Hasadd.find(Elm=>Elm===userContent)&&user_name!=userContent) {
        $('.chat_wrapper').append(`
    <div class="main" style="display: none;" id="${userContent}">
                <div class="user_name" id="name_user">私聊:${userContent}</div>
                <div class="chatList" id="_chatList${userContent}"></div>
                <div class="application">
                    <button class="emoji_btn" id="btn_emoji"></button>
                    <label for="_picture" class="picture"></label>
                    <input type="file" id="_picture" style="display:none;" multiple accept="image/*">
                    <!--<button class="download" onclick="getHistory()"></button>
                    <label for="_history" class="history"></label>
                    <input type="file" id="_history" style="display:none;" onchange="readHistory()">-->
                </div>
                <div class="textview"   id="text_view">
                <div class="text_view" contenteditable="true" tabindex="0" id="_text_view${userContent}">
                </div>
                <div class="send_block">
                    <button class="send" onclick="send()">发送</button>
                </div>
                </div>
                </div>
    `)
        Hasadd.push(userContent);
    }
        if(user_name!=userContent) {
            $('#' + lastUserContent).hide();
            $('#' + userContent).fadeIn();
            lastUserContent = userContent;
        }
        else if(userContent==user_name){
            $('#' + lastUserContent).hide();
            $('#allPage').fadeIn();
            lastUserContent = "allPage";
        }
        console.log(Hasadd);
    })

//发送表情
var options = {
    button : document.getElementById('btn_emoji'),
    showTab: true,
    animation: 'fade',
    position:'top',
    icons: [{
        name: "表情",
        path: "./images/tieba/",
        maxNum: 50,
        file: ".png",
        placeholder: ":{alias}:",
        alias: {
            1: "hehe",
            2: "haha",
            3: "tushe",
            4: "a",
            5: "ku",
            6: "lu",
            7: "kaixin",
            8: "han",
            9: "lei",
            10: "heixian",
            11: "bishi",
            12: "bugaoxing",
            13: "zhenbang",
            14: "qian",
            15: "yiwen",
            16: "yinxian",
            17: "tu",
            18: "yi",
            19: "weiqu",
            20: "huaxin",
            21: "hu",
            22: "xiaonian",
            23: "neng",
            24: "taikaixin",
            25: "huaji",
            26: "mianqiang",
            27: "kuanghan",
            28: "guai",
            29: "shuijiao",
            30: "jinku",
            31: "shengqi",
            32: "jinya",
            33: "pen",
            34: "aixin",
            35: "xinsui",
            36: "meigui",
            37: "liwu",
            38: "caihong",
            39: "xxyl",
            40: "taiyang",
            41: "qianbi",
            42: "dnegpao",
            43: "chabei",
            44: "dangao",
            45: "yinyue",
            46: "haha2",
            47: "shenli",
            48: "damuzhi",
            49: "ruo",
            50: "OK"
        },
        title: {
            1: "呵呵",
            2: "哈哈",
            3: "吐舌",
            4: "啊",
            5: "酷",
            6: "怒",
            7: "开心",
            8: "汗",
            9: "泪",
            10: "黑线",
            11: "鄙视",
            12: "不高兴",
            13: "真棒",
            14: "钱",
            15: "疑问",
            16: "阴脸",
            17: "吐",
            18: "咦",
            19: "委屈",
            20: "花心",
            21: "呼~",
            22: "笑脸",
            23: "冷",
            24: "太开心",
            25: "滑稽",
            26: "勉强",
            27: "狂汗",
            28: "乖",
            29: "睡觉",
            30: "惊哭",
            31: "生气",
            32: "惊讶",
            33: "喷",
            34: "爱心",
            35: "心碎",
            36: "玫瑰",
            37: "礼物",
            38: "彩虹",
            39: "星星月亮",
            40: "太阳",
            41: "钱币",
            42: "灯泡",
            43: "茶杯",
            44: "蛋糕",
            45: "音乐",
            46: "haha",
            47: "胜利",
            48: "大拇指",
            49: "弱",
            50: "OK"
        }
    }]
}
var ParseOptions={
    icons:options.icons
}
$("#"+"_text_view"+lastUserContent).emoji(options);

