<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "friend.FriendDAO"%>
<%
	request.setCharacterEncoding("UTF-8");
%>

<%
	int i=0;
		int noFriend=0;
		
		FriendDAO friendDAO = new FriendDAO();
		UserDAO userDAO = new UserDAO();
		PpicDAO ppicDAO = new PpicDAO();
%>

<%
		String userEmail = null;
		
		if (session.getAttribute("userEmail") != null) {
			userEmail = (String) session.getAttribute("userEmail");
		}
		PrintWriter script = response.getWriter();
%>
<%
		ArrayList<String> loadFriendList =new ArrayList<String>();
		loadFriendList = new FriendDAO().friendList(userEmail);
		if (loadFriendList.size()==0){
			noFriend=1;
		}
%>

{
	"friendList" : [
<%
	for (i=0; i<loadFriendList.size(); i++) {
%>
		         	{
		         		"profile" : "<%=ppicDAO.loadPpicPath(loadFriendList.get(i))%>",
		         		"userEmail" : "<%=loadFriendList.get(i)%>",
		         		"userName" : "<%=UserDAO.loadMyProfileJsonUserName(loadFriendList.get(i))%>"
		         	}
					<%if (i!=loadFriendList.size()-1){%>,<%};%>
<%
	}
 %>
	 ], "noFriend" : {"noFriend" : <%=noFriend%>}
}