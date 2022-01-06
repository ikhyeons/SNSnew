<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "docRep.DocRepDAO"%>
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
		int repNum = Integer.parseInt(request.getParameter("num"));
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
		DocRepDAO docRepDAO = new DocRepDAO();
		
		DocRepDAO.deleteRep(userEmail, repNum);
	%>
</body>
</html>