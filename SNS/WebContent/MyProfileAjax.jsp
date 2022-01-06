<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "java.io.PrintWriter"%>

<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>

<%
		UserDAO userDAO = new UserDAO();
		PpicDAO ppicDAO = new PpicDAO();
		PrintWriter script = response.getWriter();
		String userEmail = null;
		if (session.getAttribute("userEmail") != null){
			userEmail = (String) session.getAttribute("userEmail");
		}
%>
	    {  	 "myInfo" : {"userProfile" : "<%=ppicDAO.loadPpicPath(userEmail)%>",
	         		"userName" : "<%=userDAO.loadMyProfileJsonUserName(userEmail)%>",
	         		"userComment" : "<%=userDAO.loadMyProfileJsonUserComment(userEmail)%>",
	         		"userChangeProfileDate" : "<%=userDAO.loadMyProfileJsonUserChangeProfileDate(userEmail)%>"
	         	}				
		}