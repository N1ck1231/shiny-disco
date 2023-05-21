<%--
  Created by IntelliJ IDEA.
  User: 李文
  Date: 2023/4/23
  Time: 20:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
<h1>用户登录</h1>
<form action="/Course/login" method="post">
用户名：<input type="text" name="username">
密 码：<input type="password" name="password">
    <input type="submit" value="登录">
</form>
</body>
</html>
