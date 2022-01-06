<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>
<jsp:setProperty name = "user" property = "userEmail"/>
<jsp:setProperty name = "user" property = "userPassword"/>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>login_Action</title>
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
	
		UserDAO userDAO = new UserDAO();
			int result = userDAO.login(user.getUserEmail(), user.getUserPassword());
			if (result == 1) {
				session.setAttribute("userEmail", user.getUserEmail());
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("location.href = 'index.jsp#'");
		script.println("</script>");
			}
			else if (result == 0) {
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('비밀번호가 틀립니다.')");
		script.println("history.back()");
		script.println("</script>");
			}
			else if (result == -1) {
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('아이디가 존재하지 않습니다.')");
		script.println("history.back()");
		script.println("</script>");
			}
			
			else if (result == -2) {
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('데이터베이스 오류가 발생했습니다.')");
		script.println("history.back()");
		script.println("</script>");
			}
	%>
</body>
</html>