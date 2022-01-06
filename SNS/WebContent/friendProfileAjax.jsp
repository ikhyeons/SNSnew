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
		String email = request.getParameter("Email");
		PrintWriter script = response.getWriter();
		String userEmail = null;
		if (session.getAttribute("userEmail") != null){
			userEmail = (String) session.getAttribute("userEmail");
		}
%>
	    {  	 "frInfo" : {"userProfile" : "<%=ppicDAO.loadPpicPath(email)%>",
	         		"userName" : "<%=userDAO.loadMyProfileJsonUserName(email)%>",
	         		"userComment" : "<%=userDAO.loadMyProfileJsonUserComment(email)%>",
	         		"userChangeProfileDate" : "<%=userDAO.loadMyProfileJsonUserChangeProfileDate(email)%>"
	         	}				
		}