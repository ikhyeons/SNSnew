<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "docRep.DocRepDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import="java.util.ArrayList" %>

<% request.setCharacterEncoding("UTF-8");%>

<%
		int num = Integer.parseInt(request.getParameter("num"));
		String repContent = request.getParameter("repContent");
		DocDAO docDAO = new DocDAO();
		UserDAO userDAO = new UserDAO();
		DocRepDAO DocRepDAO = new DocRepDAO();
		PrintWriter script = response.getWriter();
		String userEmail = null;
		if (session.getAttribute("userEmail") != null) {
	userEmail = (String) session.getAttribute("userEmail");
		}
		
		DocRepDAO.writeRep(userEmail, repContent, num);
%>
