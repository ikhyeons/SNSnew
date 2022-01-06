<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "dpic.DpicDAO"%>
<%@ page import = "docThumb.DocThumbDAO"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import = "java.io.PrintWriter"%>

<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="doc" class = "doc.Doc" scope = "page"/>

<%
		int i;
		int num = Integer.parseInt(request.getParameter("num"));
		UserDAO userDAO = new UserDAO();
		PpicDAO ppicDAO = new PpicDAO();
		DocDAO docDAO = new DocDAO();
		DpicDAO dpicDAO = new DpicDAO();
		DocThumbDAO docThumbDAO = new DocThumbDAO();
		ArrayList<String> dpicPathList = new ArrayList<String>();
		dpicPathList = new DpicDAO().dpicPathList(num);
		for(i=0;i<dpicPathList.size();i++){
			System.out.printf("%s\n", dpicPathList.get(i));
		}
		int nodocpic = 0;
		if(dpicPathList.size()==0){
			nodocpic = 1;
		}
		PrintWriter script = response.getWriter();
		String userEmail = null;
		if (session.getAttribute("userEmail") != null) {
	userEmail = (String) session.getAttribute("userEmail");
	System.out.printf("%d\n%s\n", num, userEmail);
		}
%>
	    {  	 "docData" : {
	    			"docTitle" :"<%=DocDAO.loadDocListJsonDocTitle(num)%>",
	    			"docProfile" : "<%=ppicDAO.loadPpicPath(DocDAO.loadDocListJsonDocEmail(num))%>",
	         		"userName" : "<%=DocDAO.loadDocListJsonDocName(num)%>",
	         		"docContent" : "<%=DocDAO.loadDocListJsonDocContent(num)%>",
	         		"docMakeDate" : "<%=DocDAO.loadDocListJsonDocMakeDate(num)%>",
	         		"docThumb" : "<%=DocThumbDAO.loadDocThumb(userEmail, num)%>",
	         		"docpic" : [
	         		<%for(i=0;i<dpicPathList.size();i++){%>
	         				"<%=dpicPathList.get(i)%>"<%if(i!=dpicPathList.size()-1){%>,<%};%>
	         		<%}%>
	         		],
	         		"nodocpic" : "<%=nodocpic%>"
			}
		}