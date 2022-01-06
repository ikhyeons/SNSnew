<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "docThumb.DocThumbDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>
<jsp:useBean id="doc" class = "doc.Doc" scope = "page"/>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>docThumb_Action</title>
</head>

<body>
	<%
	System.out.printf("%s", request.getParameter("num"));
	int docNum = Integer.parseInt(request.getParameter("num"));
		String userEmail = null;
		if (session.getAttribute("userEmail") != null){
			userEmail = (String) session.getAttribute("userEmail");
		}
		else {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('로그인 먼저 해주세요.')");
			script.println("history.back()");
			script.println("</script>");
		}
		
		DocThumbDAO docThumbDAO = new DocThumbDAO();
		int result = docThumbDAO.doDocThumb(userEmail, docNum);
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
			script.println("alert('종아요!')");
			script.println("location.href = 'index.jsp'");
			script.println("</script>");
		}
	
	%>
</body>
</html>