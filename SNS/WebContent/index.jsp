<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ page import = "java.io.PrintWriter" %>
<%@ page import = "user.UserDAO"%>
<html lang="ko">
<head>
<!--확인용-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNS_Index</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
	<link href="./css/indexzzu.css" rel="stylesheet" type="text/css" >
	<script defer type="text/javascript" src="./js/indexzzzc.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
</head>
<body>
	<% 
		String userEmail = null;
	if (session.getAttribute("userEmail") != null){
		userEmail = (String) session.getAttribute("userEmail");
	}
	UserDAO UserDAO = new UserDAO();
	%>
	<div class="bodywrap">
		<header> <!-- 헤더 -->
			<i class="fas fa-dharmachakra curl" id="topni"></i> <!-- 헤더 토글버튼 -->
			<h1><a href="./index.jsp">Main!</a></h1> <!-- 헤더 문구 -->
		</header>
		<div class="outH">
		<div class="sidebar" id='sidebar'> <!-- 사이드바 -->
            <nav class="buttons" id="buttons"> <!-- 사이드바 버튼들 -->
            <%
            	if(userEmail == null) {
            %>
				<div class="sidebar_btn login_btn1" id="login_btn"><i class="fas fa-lock" id="login_btni"></i></div> <!-- 자물쇠아이콘 -->
			
			<%
            	} else {
            %>
                <div class="login_hide">
                    <div class="profilediv">
                        <div class="sidebar_btn profile_btn" id="profile_btn"><i class="fas fa-user"></i></div> <!-- 프로필 -->
                    </div>
                    <div class="sidebar_btn documents_btn" id="document_btn"><i class="fas fa-file-alt" id="login_btni"></i></div> <!-- 문서 -->
                    <div class="sidebar_btn memos_btn" id="memo_btn"><i class="fas fa-calendar" id="login_btni"></i></div> <!-- 메모 -->
                    <div class="sidebar_btn friends_btn" id="friend_btn"><i class="fas fa-user-friends" id="login_btni"></i></div> <!-- 프렌드 -->
                </div>
            <% 
            	}
			%>
            </nav>

			<%
            	if(userEmail != null) {
            %>
            <div class="sidebar_list" id="sidebar_list"> <!-- 사이드바 리스트 목록 -->
            	<div class="listcover">
	            	<ol class="sidebar_list_inner doc_list bactive" id="doc_list">
						<!--Ajax로 받아온 글 내용이 들어감-->
						<!--Ajax로 받아온 글 내용이 들어감-->
						<!--Ajax로 받아온 글 내용이 들어감-->
						<!--Ajax로 받아온 글 내용이 들어감-->
		            </ol>
		                
		            <ol class="sidebar_list_inner memo_list" id="memo_list">
		                <!--Ajax로 받아온 메모 내용이 들어감-->
						<!--Ajax로 받아온 메모 내용이 들어감-->
						<!--Ajax로 받아온 메모 내용이 들어감-->
						<!--Ajax로 받아온 메모 내용이 들어감-->
		            </ol>
		            
		            <ol class="sidebar_list_inner friend_list" id="friend_list">
		            	<div class="askfriendlist" id="askfriendlist">
		            		<!-- Ajax로 받아온 친구신청 내용이 들어감 -->
		            		<!-- Ajax로 받아온 친구신청 내용이 들어감 -->
		            		<!-- Ajax로 받아온 친구신청 내용이 들어감 -->
		            		<!-- Ajax로 받아온 친구신청 내용이 들어감 -->
		            	</div>

		                <div class="realfriendlist" id="realfriendlist">
		                	<!-- Ajax로 받아온 친구목록 내용이 들어감 -->
		                	<!-- Ajax로 받아온 친구목록 내용이 들어감 -->
		                	<!-- Ajax로 받아온 친구목록 내용이 들어감 -->
		                	<!-- Ajax로 받아온 친구목록 내용이 들어감 -->
		                </div>
			                
		            </ol>
		         </div>
		         <div class="undersidebar">
				        <div class="addconts" id="writesomething">+</div>
						<div class="filter" id="filter">
							<input type="text" id="filterv" placeholder="필터링">
						</div>
				 </div>
            </div>
            <% 
            	}
			%>

            <div class="page loginpage" id='loginpage'> <!-- 로그인창 -->
                <div class="loginpagewrap">
                    <form action="./loginAction.jsp" method="post"> <!-- 로그인 이메일, 비번 입력 -->
                        <input class="email" type="email" placeholder="이메일" name='userEmail' required>
                        <input class="password" type="password" placeholder="비밀번호" name='userPassword' required autocomplete>
                        <div>
                            <button type="submit" class="lpbtn log_btn">로그인</button>
                            <div class="lpbtn add_btn" id="add_btn">회원가입</div>
                        </div>
                    </form>
                </div>
           
                <div class="loginclose" id='loginclose'>Close</div>
            </div>
            
            <div class="page myprofilepage" id='myprofilepage'> <!-- 프로필 창 -->
                    <div class="myprofilepagewrap" id = "myprofilepagewrap">
							<div class="myprofile">
								<img class="myprofilepic" id = "myprofilepic" alt="이미지" src=""><!-- ajax로 받은 프로필이 들어감 -->
								<span class="myprofilename" id = "myprofilename">
									<!-- ajax로 받은 이름이 들어감 -->
								</span>
							</div>
							<div class="myprofilecomment" id = "myprofilecomment">
								<!-- ajax로 받은 코멘트가 들어감 -->
							</div>
							<div class="myprofilemodifydate" id = "myprofilemodifydate">
								<!-- ajax로 받은 정보 변경날이 들어감 -->
							</div>
                            <div>
                                <button class="changemyprofile" id="changemyprofile_btn">정보수정</button>
                                <form action="./logoutAction.jsp">
                                	<button class="changemyprofile" id="logout_btn" type="submit">로그아웃</button>
                                </form>
                            </div>
                            <div id="profileclose">close</div>
                    </div>

                </div>
                
                <div class="page frprofilepage" id='frprofilepage'> <!-- 친구 프로필 창 -->
                    <div class="frprofilepagewrap">
							<div class="infrprofile">
								<img class="frprofilepic" id = 'frinfoprofile' alt="이미지" src=""><!-- ajax로 받은 프로필이 들어감 -->
								<span class="frprofilename" id='frinfoName'><!-- ajax로 받은 친구이름 --></span>
							</div>
							<div class="frprofilecomment" id='frinfoComment'><!-- ajax로 받은 친구코멘트 --></div>
							<div class="frprofilemodifydate" id='frinfoChangeDate'><!-- ajax로 받은 친구 코멘트 변경일 --></div>
                            <div>
                                <button class="chatfr_btn" id="chatfr_btn">채팅</button>
                            </div>
                            <div class="frprofileclose" id='frprofileclose'>Close</div>
                    </div>

                </div>
                <div class="page chatpage" id='chatpage'> <!-- 채팅 창 -->
                	<div class="chathead">
                		<span class="chatwith"> 홍길동 채팅</span>
                		<span class="chatclose" id="chatclose">close</span>
                	</div>
					<div class="chatlog">
						<div class="sendbyme">
							<span class="chatdate">몇월 몇일</span>
							<span class="chattext">ㅎㅇ</span>
						</div>
						
						<div class="sendbyyou">
							<span class="chattext">ㅎㅇ</span>
							<span class="chatdate">몇월 몇일</span>
						</div>
						
						<div class="sendbyme">
							<span class="chatdate">몇월 몇일</span>
							<span class="chattext">ㅎㅇ</span>
						</div>
					
					</div>
					<div class="chatinput">
						<input type="text">
						<button type="submit" class="chatsend">전송</button>
					</div>
                </div>

        </div>

	<%
           if(userEmail != null) {
    %>
		<section class="sebu">

         <div class="forms docform bactive" id="docform">
            <div class="docsectionwrap">
                <div class="titlebar" id="docformtitlebar">
                	<span id="docformtitle"></span>
                	<form action="./docThumbAction.jsp" id="doDocThumb" class= "docThumb doDocThumb">
                    	<input type="text" name = "num" style="display: none;" id="docthumbA">
                    	<button type="submit" method="get" class="doclikebtn"><i class="far fa-star"></i></button>
                    </form>
                    <form action="./deldocThumbAction.jsp" id="delDocThumb" class= "docThumb delDocThumb">
                    	<input type="text" name = "num" style="display: none;" id="docthumbB">
                    	<button type="submit" method="get" class="doclikebtn"><i class="fas fa-star"></i></button>
                    </form>
                </div>
                <div class="imgline">
                    <ul class="imglist" id="imglist">
                        <!-- ajax로 받은 이미지가 들어감 -->
                        <!-- ajax로 받은 이미지가 들어감 -->
                        <!-- ajax로 받은 이미지가 들어감 -->
                        <!-- ajax로 받은 이미지가 들어감 -->
                    </ul>
                </div>
            </div>

			<button class="before_btn" id="beforebutton"><</button>
			<button class="after_btn" id="afterbutton">></button>
			
			<article class="underbar" id="underbar">
				<div class="underbarwrap">
					<div class="maker">
						<div class="left">
							<img class="docprofile" id='docinprofile' alt="프로필사진" src=""><!-- ajax로 받은 프로필이 들어감 -->
							<div class="makeinfo">
								<div class="makernamebox">
									<p class="makername" id= "docformmakername"></p>
									<form action="./deleteDocAction.jsp" method="get">
										<input type="text" class="deldocnum" id="deldocnum" name="num">
										<button type="submit">글 지우기</button>
									</form>
								</div>
								
								<p class="makingdate" id = "docformmakingdate"></p>
							</div>
						</div>

					</div>
					<div class="main_document" id="main_document"></div>
				</div>
			</article>
		</div> 


			<div class="forms memoform" id="memoform">
				<div class="titlebar">
					<div class="left">
	                    <span class="title" id = "memoformtitlebar">교내 풍경 메모</span>
	                    <span class="mdate" id = "memoformmakingdate">8월 31일</span>
                    </div>
                    <form action="./deleteMemoAction.jsp" class="delmemo">
                    	<input class="delmemonum" name="num" id="delmemonum">
                    	<button type="submit">메모 지우기</button>
                    </form>
                    <form action="./memoThumbAction.jsp" id="doMemoThumb" class= "memoThumb doMemoThumb">
                    	<input type="text" name = "num" style="display: none;" id="memothumbA">
                    	<button type="submit" method="get" class="memolikebtn"><i class="far fa-star"></i></button>
                    </form>
                    <form action="./delmemoThumbAction.jsp" id="delMemoThumb" class= "memoThumb delMemoThumb">
                    	<input type="text" name = "num" style="display: none;" id="memothumbB">
                    	<button type="submit" method="get" class="memolikebtn"><i class="fas fa-star"></i></button>
                    </form>
                   
                </div>
			
				<div class="memodoc" id= "memo_document">
					8월 31일 교내 풍경입니다.
				</div>
				
				<div class="memopic" id="memopic">
					<ul class="memopicline" id="memopicline">
						<!-- ajax로 받아올 메모 사진 -->
						<!-- ajax로 받아올 메모 사진 -->
						<!-- ajax로 받아올 메모 사진 -->
						<!-- ajax로 받아올 메모 사진 -->
					</ul>
				</div>	
			</div>
			
			<% 
            	}
			%>
			
			<%
           	if(userEmail == null) {
    		%>

			<div class="forms joinform" id="joinform">
				<div class="titlebar">회원가입</div>
				<form class="joinpage" action="./joinAction.jsp" method="post">
					<input type="email" placeholder="이메일" name="userEmail" required>
					<input type="password" placeholder="비밀번호" name="userPassword" autocomplete required>
					<input class="joinname" type="name" placeholder="이름" required name = "userName">
					<input type="date" min="1900-01-01" max="2030-01-01" placeholder="생일" required name = "userBirth">
					<div class="joingender">
						<input type="radio" name="userGender" id="radiomale" value="0" required><span>남</span>
						<input type="radio" name="userGender" id="radiefemale" value="1" required><span>여</span>
					</div>
					<button type="submit">가입하기</button>
				</form>
			</div>
			
			<% 
            	}
			%>

			<%
           		if(userEmail != null) {
    		%>
    		
			<div class="forms changeprofileform" id="changeprofile_form">
				<div class="titlebar">프로필 변경</div>
				<form class="profilechangepage" action="./changeMyProfileAction.jsp" method="post" enctype="multipart/form-data">
					<div class="changeprofilepic">
						<img class="changeprofileimg" alt="선택된 프로필 사진" src="">
						<div class="aboutchangeprofilepic">
							<span class="proname"><%=UserDAO.loadMyProfileJsonUserName(userEmail)%></span>
							<input type="file" name = "file1" accept="image/*">
						</div>

					</div>	
					<textarea class="changecomment" rows="4" cols="5" name = "userComment"></textarea>
					<button type="submit">변경하기</button>
				</form>
			</div>
		</section>
		<% 
            	}
		%>

		<%
           if(userEmail != null) {
   		 %>
        <div class="rsidebar out" id="rsidebar">
        	<div class="rsidebar_btn" id="rsidebar_btn">></div>
        	<div class="realrep">
        		<div class="realrepcover" id="realrepcover">
		            <!-- ajax 내용을 받아서 넣을 자리  -->
		            <!-- ajax 내용을 받아서 넣을 자리  -->
		            <!-- ajax 내용을 받아서 넣을 자리  -->
		            <!-- ajax 내용을 받아서 넣을 자리  -->
		            <!-- ajax 내용을 받아서 넣을 자리  -->
	        	</div>
	        	<div class="writerep" id="writerep">
        			<input type="text" id="repContent">
        			<button id="writerepbtn">작성</button>
        		</div>
        	</div>
		</div>
		<% 
            	}
		%>
	</div>
	<div class="writedocpage" id="writedocpage">
			<div class="writedocpagewrap">
				<form action="writedocAction.jsp" class="writedocform" method="post" encType = 'multipart/form-data'>
					<input class="writedoctitle" placeholder="글 제목을 입력하세요" name="docTitle">
					<textarea class="writedoccontent summernote" placeholder="내용을 입력하세요" name="docContent" maxlength="800"></textarea>
					<div class="Dinputimg" id="Dinputimg"></div>
					<button type="button" class="Dmorefile" id = "DmorefileBtn">파일 추가하기</button>
					<button type="submit" id = "docWriteBtn">작성</button>
				</form>
				<button class="writedocpageclose" id="writedocpageclose">닫기</button>
			</div>
		</div>

		<div class="writememopage" id="writememopage">
			<div class="writememopagewrap">
				<form action="writememoAction.jsp" class="writememoform" method="post" encType = 'multipart/form-data'>
					<input class="writememotitle" placeholder="메모 제목을 입력하세요" name="memoTitle">
					<textarea class="writememocontent summernote" placeholder="내용을 입력하세요" name="memoContent" maxlength="800"></textarea>
					<div class="Minputimg" id = "Minputimg"></div>
					<button type="button" class="Mmorefile" id = "MmorefileBtn">파일 추가하기</button>
					<button type="submit">작성</button>
				</form>
				<button class="writememopageclose" id="writememopageclose">닫기</button>
			</div>
		</div>
	
		<div class="askfriendpage" id="askfriendpage" method="post">
			<p>추가할 이용자의 이메일을 입력하세요</p>
			<input type="email" class="askFriendEmail" id="askFriendEmail">
			<button class="askFriendBtn" id="askFriendBtn">추가</button>
			<button class="askfriendpageclose" id="askfriendpageclose">close</button>
		</div>
	<!-- 폰트어섬 키트코드 -->
	<script src="https://kit.fontawesome.com/5862ea0e27.js" crossorigin="anonymous"></script>
	<script>
        $('.summernote').summernote({
        	placeholder : 'blog',
        	tabsize : 2,
        	height : 300
        });
  </script>
</body>
</html>