<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "friend.FriendDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import="java.util.ArrayList" %>

<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>

<%		
		String userEmail = null;
		if (session.getAttribute("userEmail") != null){
			userEmail = (String) session.getAttribute("userEmail");
		}
		int loadNum = Integer.parseInt(request.getParameter("loadNum"));
		int i=0;
		int noFriendNum = 0;
		DocDAO docDAO = new DocDAO();
		PpicDAO ppicDAO = new PpicDAO();
		FriendDAO friendDAO = new FriendDAO();
		PrintWriter script = response.getWriter();
		ArrayList<String> friendEmailList = new ArrayList<String>();
		friendEmailList = new FriendDAO().friendList(userEmail);
		if(friendEmailList.size()==0){
			noFriendNum = 1;
		}
		
		ArrayList<Integer> loadDocList =new ArrayList<Integer>();
		ArrayList<Integer> nextDocList =new ArrayList<Integer>();
		
		loadDocList =new DocDAO().loadDocList(loadNum, friendEmailList, userEmail);
		nextDocList =new DocDAO().loadDocList(loadNum+1,  friendEmailList, userEmail);
		int isNext = 0;
		if(nextDocList.size() != 0){
			isNext = 1;
		}
%>
{
	"docList" : [
<%
	for (i=0; i<loadDocList.size(); i++) {
%>
		         	{	
		         		"docProfile" : "<%=ppicDAO.loadPpicPath(docDAO.loadDocListJsonDocEmail(loadDocList.get(i)))%>",
		         		"docNum" : "<%=docDAO.loadDocListJsonDocNum(loadDocList.get(i))%>",
		         		"userEmail" : "<%=docDAO.loadDocListJsonDocEmail(loadDocList.get(i))%>",
		         		"userName" : "<%=docDAO.loadDocListJsonDocName(loadDocList.get(i))%>",
		         		"docTitle" : "<%=docDAO.loadDocListJsonDocTitle(loadDocList.get(i))%>",
		         		"docMakeDate" : "<%=docDAO.loadDocListJsonDocMakeDate(loadDocList.get(i))%>",
		         		"docDelete" : "<%=docDAO.loadDocListJsonDocDelete(loadDocList.get(i))%>"
		         	}
					<%if (i!=loadDocList.size()-1){%>,<%};%>
<%
	}
 %>
	 ], "moredata" : {"more" : <%=isNext%>}
}