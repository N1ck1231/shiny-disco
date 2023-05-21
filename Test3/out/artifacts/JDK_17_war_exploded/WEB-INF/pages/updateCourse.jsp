<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>更新课程</title>
</head>
<body>
<form action="/Course/updateCourse" method="get">

    <input class="form-control" type="hidden" name="id" value="${Qcourse.id}"/>
    课程名
    <label class="col-sm-10">
        <input class="form-control" type="text" name="name" value="${Qcourse.name}"/>
    </label>
    <br><br>
    课 时
    <label class="col-sm-10">
        <input class="form-control" type="text" name="hours" value="${Qcourse.hours}"/>
    </label>
    <br><br>
    开设学院
    <label class="col-sm-10">
        <input class="form-control" type="text" name="schools" value="${Qcourse.schools }"/>
    </label>
    <br><br>
    <input class="col-sm-11" type="submit" value="确认修改"/>
</form>
<a href="http://localhost:8080/Course/allCourse" target="_blank">取消</a>
</body>
</html>