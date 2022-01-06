<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "sendFriend.SendFriendDAO"%>
<%@ page import = "friend.FriendDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%
	request.setCharacterEncoding("UTF-8");
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>sendFriend_Ajax</title>

</head>
<body>
	<%
		int answer = Integer.parseInt(request.getParameter("answer"));
		String Email = request.getParameter("Email");
		String userEmail = null;
		if (session.getAttribute("userEmail") != null){
			userEmail = (String) session.getAttribute("userEmail");
		}
		
		SendFriendDAO sendFriendDAO = new SendFriendDAO();
		FriendDAO friendDAO = new FriendDAO();
		
		if(userEmail == null){
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('먼저 로그인 해주세요.')");
			script.println("location.href = 'index.jsp'");
			script.println("</script>");
		}
		System.out.printf(userEmail);
		System.out.printf(Email);
		if(answer == 1){
			//친구 수락
			//1. 친구신청 제거 2. 친구쌍 등록
			sendFriendDAO.delSendFriend(userEmail, Email);
			friendDAO.addFriend(userEmail, Email);
			friendDAO.addFriend(Email, userEmail);
		}
		else if (answer == 2){
			//친구 거절
			//1. 친구신청 제거
			sendFriendDAO.delSendFriend(userEmail, Email);
		}
	%>
</body>
</html>