<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "user.UserDAO"%>
<%@ page import = "doc.DocDAO"%>
<%@ page import = "ppic.PpicDAO"%>
<%@ page import = "docRep.DocRepDAO"%>
<%@ page import = "java.io.PrintWriter"%>
<%@ page import="java.util.ArrayList" %>

<% request.setCharacterEncoding("UTF-8");%>

<%
		int num = Integer.parseInt(request.getParameter("num"));
		int i=0;
		DocDAO docDAO = new DocDAO();
		PpicDAO ppicDAO = new PpicDAO();
		UserDAO userDAO = new UserDAO();
		DocRepDAO DocRepDAO = new DocRepDAO();
		PrintWriter script = response.getWriter();
		String userEmail = null;
		if (session.getAttribute("userEmail") != null) {
	userEmail = (String) session.getAttribute("userEmail");
	System.out.printf("%d\n%s\n", num, userEmail);
		}
		ArrayList<Integer> loadDocRepList =new ArrayList<Integer>();
		loadDocRepList =new DocRepDAO().loadDocRepList(num);
		
		if(loadDocRepList != null){
			for (i=0;i<loadDocRepList.size();i++){
					System.out.printf("%d", num);
				}
		}
		System.out.printf("\n%d\n", loadDocRepList.size());
%>

	    {  	 
	    	"docRepData" : [
	    	<%
				for (i=0; i<loadDocRepList.size(); i++) {
			%>
			
	    			{
		    			"repProfile" : "<%=ppicDAO.loadPpicPath(DocRepDAO.loadDocListJsonRepUserEmail(loadDocRepList.get(i)))%>",
		         		"userName" : "<%=UserDAO.loadMyProfileJsonUserName(DocRepDAO.loadDocListJsonRepUserEmail(loadDocRepList.get(i)))%>",
		         		"repMakeDate" : "<%=DocRepDAO.loadDocListJsonRepDate(loadDocRepList.get(i))%>",
		         		"repContent" : "<%=DocRepDAO.loadDocListJsonRepContent(loadDocRepList.get(i))%>",
		         		"repNum" : "<%=loadDocRepList.get(i)%>"
	         		}
	         		<%if (i!=loadDocRepList.size()-1){%>,<%};%>	
	       <%
				}
 			%>
	       ]		
		}
