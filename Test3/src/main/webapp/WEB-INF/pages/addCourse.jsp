<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>新增课程</title>
</head>
<body>

<form action="/Course/addCourse" method="get">

    <b><strong>课 程 号:</strong></b><input type="text"  name="id">
  <br/>
    <b><strong>课 程 名:</strong> </b><input type="text" name="name">
  <br />
    <b><strong>课    时:</strong></b> <input type="text" name="hours" />
  <br/>
    <b><strong>开设学院 :</strong></b> <input type="text" name="schools">
  <br/>
  <input type="submit" value="提交" />

</form>
<a href="http://localhost:8080/Course/allCourse" target="_blank">取消</a>
</body>
</html>
