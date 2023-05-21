<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>文件上传和下载</title>
</head>
<body>
<table border="1">
    <tr>
        <td width="200" align="center">文件上传${msg}</td>

    </tr>
    <tr>
        <td height="100">
            <form action="/Course/upload"
                  method="post" enctype="multipart/form-data">
                <input type="file" name="files" multiple="multiple"><br/>
                <input type="reset" value="清空"/>
                <input type="submit" value="提交"/>
            </form>
        </td>
        <td id="files"></td>
    </tr>
</table>
</body>

</html>

