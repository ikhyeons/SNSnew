<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@page import="java.util.Enumeration"%>
<%@ page import = "java.io.PrintWriter"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<% request.setCharacterEncoding("UTF-8");%>


<jsp:useBean id="user" class = "user.User" scope = "page"/>
<jsp:setProperty name = "user" property = "userEmail"/>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>changeInfo_Action</title>

</head>
<body>
	
	<%
	String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	%>
	
	<%
	String fileName1 = "";
	String orgfileName1 = "";
	String Comment = "";
	String path="";
	String directory = "s3://snsfile/Zpictures/Ppictures/";
	int sizeLimit = 10*1024*1024;		//10MB 제한
	try {
		PpicDAO ppicDAO = new PpicDAO();
		MultipartRequest multi = new MultipartRequest(request, directory, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
		Comment = multi.getParameter("userComment");
		fileName1 = multi.getFilesystemName("file1"); // name=file1의 업로드된 시스템 파일명을 구함(중복된 파일이 있으면, 중복 처리 후 파일 이름)
		orgfileName1 = multi.getOriginalFileName("file1"); // name=file1의 업로드된 원본파일 이름을 구함(중복 처리 전 이름)
		//업로드 완료
		System.out.printf("\n%s", fileName1);
		path = directory + "/" + fileName1;
		ppicDAO.savePpicPath(userEmail, path);
	} catch (Exception e) {
		e.printStackTrace();
	}
	UserDAO userDAO = new UserDAO();
		int result = userDAO.changeInfo(userEmail, Comment);
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
			script.println("alert('수정 되었습니다.')");
			script.println("location.href = 'index.jsp'");
			script.println("</script>");
		}
		else if (result == 0) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('0리턴 입니다 되었습니다.')");
			script.println("location.href = 'index.jsp'");
			script.println("</script>");
		}
	%>
		
</body>
</html>