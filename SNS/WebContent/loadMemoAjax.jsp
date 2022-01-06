<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "memo.MemoDAO"%>
<%@ page import = "mpic.MpicDAO"%>
<%@ page import = "memoThumb.MemoThumbDAO"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import = "java.io.PrintWriter"%>


<% request.setCharacterEncoding("UTF-8");%>
<jsp:useBean id="memo" class = "memo.Memo" scope = "page"/>

<%
		int i;
		int num = Integer.parseInt(request.getParameter("num"));
		MemoDAO memoDAO = new MemoDAO();
		UserDAO userDAO = new UserDAO();
		MemoThumbDAO memoThumbDAO = new MemoThumbDAO();
		PrintWriter script = response.getWriter();
		ArrayList<String> mpicPathList = new ArrayList<String>();
		mpicPathList = new MpicDAO().mpicPathList(num);
		for(i=0;i<mpicPathList.size();i++){
			System.out.printf("%s\n", mpicPathList.get(i));
		}
		int nomemopic = 0;
		if(mpicPathList.size()==0){
			nomemopic = 1;
		}
		String userEmail = null;
		if (session.getAttribute("userEmail") != null) {
	userEmail = (String) session.getAttribute("userEmail");
	System.out.printf("%d\n%s\n", num, userEmail);
		}
%>
	    {  	 "memoData" : {
	    			"memoTitle" :"<%=memoDAO.loadMemoListJsonMemoTitle(num)%>",
	         		"memoContent" : "<%=memoDAO.loadMemoListJsonMemoContent(num)%>",
	         		"memoMakeDate" : "<%=memoDAO.loadMemoListJsonMemoMakeDate(num)%>",
	         		"memoThumb" : "<%=MemoThumbDAO.loadMemoThumb(userEmail, num)%>",
	         		"memopic" : [
	         			<%for(i=0;i<mpicPathList.size();i++){%>
	         				"<%=mpicPathList.get(i)%>"<%if(i!=mpicPathList.size()-1){%>,<%};%>
	         			<%}%>
	         		],
	         		"nomemopic" : "<%=nomemopic%>"
	         }				
		}