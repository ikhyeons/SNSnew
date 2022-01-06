<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>
<jsp:setProperty name = "user" property = "userEmail"/>
<jsp:setProperty name = "user" property = "userPassword"/>
<jsp:setProperty name = "user" property = "userName"/>
<jsp:setProperty name = "user" property = "userBirth"/>
<jsp:setProperty name = "user" property = "userGender"/>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>join_Action</title>

</head>
<body>
	<%
	String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	
	if(userEmail != null){
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('이미 로그인 되어있는 사용자입니다.')");
		script.println("location.href = 'index.jsp'");
		script.println("</script>");
	}
	
	if(user.getUserEmail() == null || user.getUserPassword() == null || user.getUserName() == null || user.getUserBirth() == null || user.getUserGender() == null)
	{
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('입력되지 않은 항목이 있습니다.')");
		script.println("history.back()");
		script.println("</script>");
	} else {
		UserDAO userDAO = new UserDAO();
		int result = userDAO.join(user);
		if (result == -2) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('데이터베이스 오류')");
			script.println("history.back()");
			script.println("</script>");
		}
		else if (result == 1) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('가입 되었습니다.')");
			script.println("location.href = 'index.jsp#'");
			script.println("</script>");
		}
	}
	%>
</body>
</html>