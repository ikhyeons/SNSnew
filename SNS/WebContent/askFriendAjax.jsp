<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "sendFriend.SendFriendDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<% request.setCharacterEncoding("UTF-8");%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>sendFriend_Ajax</title>

</head>
<body>
	<%
	String Email = request.getParameter("Email");
	String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	SendFriendDAO sendFriendDAO = new SendFriendDAO();
	if(userEmail == null){
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('먼저 로그인 해주세요.')");
		script.println("location.href = 'index.jsp'");
		script.println("</script>");
	}
	System.out.printf(userEmail);
	System.out.printf(Email);
	
	if (userEmail.equals(Email)){
		System.out.printf("사용자와 동일한 이메일이 입력됨");
	}
	else if (userEmail != Email){
			if(Email == "")
			{
				System.out.printf("이메일이 입력되지 않음");
			} else {
				sendFriendDAO.askFriend(userEmail, Email);
			}
		}
	%>
</body>
</html>