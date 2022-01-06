<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import = "memo.MemoDAO"%>
<%@ page import = "mpic.MpicDAO"%>
<%@page import="java.util.Enumeration"%>
<%@ page import = "java.io.PrintWriter"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<% request.setCharacterEncoding("UTF-8");%>


<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>writeMemo_Action</title>

</head>
<body>
	<%
	String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	int i;
	int sequence = 0;
	MpicDAO mpicDAO = new MpicDAO();
	MemoDAO memoDAO = new MemoDAO();
	
	String title = "";
	String content = "";
	
	
			
			String fileName = "";
			String orgfileName = "";
			String path="";
			String directory = "C:/Users/ikhye/AppData/Roaming/SPB_Data/git/SNS/SNS/WebContent/Zpictures/Mpictures";
			int sizeLimit = 30*1024*1024;		//30MB 제한
			try {
				MultipartRequest multi = new MultipartRequest(request, directory, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
				title = multi.getParameter("memoTitle");
				content = multi.getParameter("memoContent");
				for(i=1; i<=8; i++){
					if(multi.getFilesystemName("Mimg"+i)==null){
						System.out.printf("없음%d\n", i);
					} else {
						sequence++;
						fileName = multi.getFilesystemName("Mimg"+i); // name=file1의 업로드된 시스템 파일명을 구함(중복된 파일이 있으면, 중복 처리 후 파일 이름)
						orgfileName = multi.getOriginalFileName("Mimg"+i); // name=file1의 업로드된 원본파일 이름을 구함(중복 처리 전 이름)
						//업로드 완료
						System.out.printf("\n%s", fileName);
						path = directory + "/" + fileName;
						mpicDAO.saveMpicPath(memoDAO.getMemoNum()+1, sequence, path);
					}
			} 
		}catch (Exception e) {
			e.printStackTrace();
		}
	
	
	if(userEmail == null){
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('먼저 로그인 해주세요.')");
		script.println("location.href = 'index.jsp'");
		script.println("</script>");
	}
	
	if(title == "" || content == "")
	{
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('입력되지 않은 항목이 있습니다.')");
		script.println("history.back()");
		script.println("</script>");
	} else {
		
		int result = memoDAO.writeMemo(userEmail, title, content);
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
			script.println("alert('작성 되었습니다.')");
			script.println("location.href = 'index.jsp#'");
			script.println("</script>");
		}
	}
	
	
	%>
</body>
</html>