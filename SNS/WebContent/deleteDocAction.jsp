<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<% request.setCharacterEncoding("UTF-8");%>
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
		int docNum = Integer.parseInt(request.getParameter("num"));
		DocDAO docDAO = new DocDAO();
			int result = docDAO.deleteDoc(userEmail, docNum);
			
			if (result == 1) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('정상 삭제 되었습니다..')");
				script.println("location.href = 'index.jsp'");
				script.println("</script>");

			}
			else if (result == -2) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('데이터베이스 오류가 발생했습니다.')");
				script.println("location.href = 'index.jsp'");
				script.println("</script>");
			}
	%>
</body>
</html>