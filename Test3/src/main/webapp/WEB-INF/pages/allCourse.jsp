<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>所有课程</title>
</head>
<body>
<table border="1">
    <tr>
        <th>课程号</th>
        <th>课程名</th>
        <th>课 时</th>
        <th>开设学院</th>
    </tr>
    <c:forEach var="course" items="${requestScope.get('list')}">
        <tr>
            <td><c:out value="${course.getId()}"></c:out></td>
            <td><c:out value="${course.getName()}"></c:out></td>
            <td><c:out value="${course.getHours()}"></c:out></td>
            <td><c:out value="${course.getSchools()}"></c:out></td>
            <td><img src="${course.getImg()}" width="100" height="100"></td>
            <td>
                <a href="/Course/toupdateCourse?id=${course.id}">修改</a>
            </td>
            <br>
        </tr>
    </c:forEach>
</table>
<form action="/Course/deleteCourse " method="get">
    要删除的课程号<input type="text"  name="id">
    <br/>
    <input type="submit" value="确认删除" />
</form>
<a href="http://localhost:8080/Course/toaddCourse" target="_blank">新增课程</a>
<a href="http://localhost:8080/Course/first" target="_blank">返回首页</a>
</body>
</html>
