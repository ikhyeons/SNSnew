<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "sendFriend.SendFriendDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import="java.util.ArrayList" %>

<% request.setCharacterEncoding("UTF-8");%>

<% 
		String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	%>

<%
		int i=0;
		int noAsk = 0;
		SendFriendDAO SendFriendDAO = new SendFriendDAO();
		PpicDAO ppicDAO = new PpicDAO();
		PrintWriter script = response.getWriter();
		
		ArrayList<String> loadSendFriendList =new ArrayList<String>();
		
		loadSendFriendList =new SendFriendDAO().loadAskFriendList(userEmail);
		
		if(loadSendFriendList.size() == 0){
			noAsk=1;
		}
%>
{
	"SendFriendList" : [
<%
	for (i=0; i<loadSendFriendList.size(); i++) {
%>
		         	{	
		         		"askUserProfile" : "<%=ppicDAO.loadPpicPath(loadSendFriendList.get(i))%>",
		         		"userName" : "<%=UserDAO.loadMyProfileJsonUserName(loadSendFriendList.get(i))%>",
		         		"userEmail" : "<%=loadSendFriendList.get(i)%>"
		         	}
					<%if (i!=loadSendFriendList.size()-1){%>,<%};%>
		         	
<%
	}
 %>
	 ], "no" : {"noAsk" : <%=noAsk%>}
}