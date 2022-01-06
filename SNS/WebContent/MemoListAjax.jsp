<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "memo.MemoDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import="java.util.ArrayList" %>

<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="user" class = "user.User" scope = "page"/>

<% 
		String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	%>

<%
		int i=0;
		MemoDAO memoDAO = new MemoDAO();
		int rs = memoDAO.getMemoNum();
		PrintWriter script = response.getWriter();
		
		int loadNum = Integer.parseInt(request.getParameter("loadNum"));
		ArrayList<Integer> loadMemoList =new ArrayList<Integer>();
		ArrayList<Integer> nextMemoList =new ArrayList<Integer>();
		
		loadMemoList =new MemoDAO().loadMemoList(loadNum, userEmail);
		nextMemoList =new MemoDAO().loadMemoList(loadNum+1, userEmail);
		int isNext = 0;

		if(nextMemoList.size() != 0){
			isNext = 1;
		}
		
%>
{
	"memoList" : [
<%
	for (i=0; i<loadMemoList.size(); i++) {
%>
		         	{
		         		"memoNum" : "<%=memoDAO.loadMemoListJsonMemoNum(loadMemoList.get(i))%>",
		         		"userEmail" : "<%=memoDAO.loadMemoListJsonMemoEmail(loadMemoList.get(i))%>",
		         		"memoTitle" : "<%=memoDAO.loadMemoListJsonMemoTitle(loadMemoList.get(i))%>",
		         		"memoMakeDate" : "<%=memoDAO.loadMemoListJsonMemoMakeDate(loadMemoList.get(i))%>",
		         		"memoDelete" : "<%=memoDAO.loadMemoListJsonMemoDelete(loadMemoList.get(i))%>"
		         	}
					<%if (i!=loadMemoList.size()-1){%>,<%};%>
		         	
<%
	}
 %>
	 ], "moredata" : {"more" : <%=isNext%>}
}