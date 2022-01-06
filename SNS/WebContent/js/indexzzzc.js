'use strict';
let i=0;
let j=0;
let slidePX = 478.5;
let widthsum = 0;
let dos=0;
let memo_JsonData;
let memo_ListInnerData="";
let friendask_ListInnerData="";
let friend_ListInnerData="";
let loadMNum=0;
let now_doc;
//-------------------------------------------------------------------------------------------------------

//nav에 있는 모든 버튼을 배열에 담음
let btn = document.getElementsByClassName('sidebar_btn');
//버튼들 위에서부터 [0] 로그인 버튼 [1] 프로필 버튼 [2] 글 목록 버튼 [3] 메모 목록 버튼 [4] 친구 목록 버튼

//--------------------------------------------------------------------------------------------------------
//로딩이 완료 되엇을 시 실행 doc 상세 창의 이미지 정리
		
		
window.addEventListener('load', function(){
		let inimg = document.getElementsByClassName('inimg'); // 이미지들
		let imgboxn = document.getElementsByClassName('imgbox'); // 이미지 박스
		//모든 배열의 가로, 세로길이를 조사하여 큰 길이를 456.5로 지정
		for(i=0 ; i<inimg.length; i++){
			if(inimg[i].width>=inimg[i].height){
				inimg[i].style.width = '456.5px';
				//만약 width 값이 더 클경우 이미지를 중간에 노출하기 위하여 이미지 상단에 마진값을 줌
				let hmoves = 30;
				console.log(hmoves);
				imgboxn[i].style.marginTop = `${hmoves}px`;
			}
			else{
				inimg[i].style.height = '456.5px';
				//만약 height 값이 더 클경우 이미지를 중간에 노출하기 위하여 이미지 양 사이드에 마진값을 줌
				let moves =	(481-inimg[i].width)/2;
				console.log(moves);
				imgboxn[i].style.margin = `0 ${moves}px`;
			}
		}
})

//글 상세 창 이벤트 초기화 함수
	function doc_reset() {
	document.getElementById('underbar').classList.remove('uped');
	dos=0;
	let range = dos*478.5;
	console.log(range);
	document.getElementById('imglist').style.transform = `translateX(${range}px)`;
	document.getElementById('beforebutton').style.display = 'none';
	document.getElementById('afterbutton').style.display = 'none';
	}

//--------------------------------------------------------------------------------------------------------

//로그인 버튼을 클릭했을 경우 로그인 페이지를 토글함
if(btn.length == 1){
btn[0].addEventListener('click', function(){
		document.getElementById('loginpage').classList.toggle('bactive');
		//만약 bactive가 있을경우 자물쇠 모양을 열림으로 변경하고 없을경우 닫힘으로 변경
		if(document.getElementById('loginpage').classList.contains('bactive')){
			//bactive가 포함되어 있을 경우
			this.innerHTML = '<i class="fas fa-unlock" id="login_btni"></i>';
		}
		else {
			this.innerHTML = '<i class="fas fa-lock" id="login_btni"></i>';
		}
	})
	
//로그인 페이지의 close 버튼을 클릭했을 경우 로그인 페이지를 닫음
	document.getElementById('loginclose').addEventListener('click', function(){
		document.getElementById('loginpage').classList.toggle('bactive');
		btn[0].innerHTML = '<i class="fas fa-lock" id="login_btni"></i>';
	})
	}
	
//---------------------------------------------------------------------------------------------------------
let loadNum = 0;
let doc_ListInnerData = "";
if(btn.length == 4){
//시작했을 때 리스트를 글로 가져옴
fetch(`http://localhost:8080/SNS/DocListAjax.jsp?loadNum=${loadNum}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    let srcin = "";
			    for (i = 0; i < data.docList.length; i++){
			    	if (data.docList[i].docProfile.substr(63)==""){
				    	srcin = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	srcin = `./${data.docList[i].docProfile.substr(63)}`;
				    }
			    	doc_ListInnerData += `<li class="inner_cont doc_cont con${i+1}">
		                    <img class="docprofile" alt="프로필사진" src="${srcin}">
		                    <div class="makeinfo">
		                        <p class="info_namebar">
		                        	<span class="makerName">${data.docList[i].userName}</span>
		                        	<span class="docNum">${data.docList[i].docNum}</span>
		                        </p>
		                        <p class="contenttitle">${data.docList[i].docTitle}</p>
		                        <p class="makingdate">${data.docList[i].docMakeDate}</p>
		                    </div>
		        </li>`
			    }
			    doc_ListInnerData = doc_ListInnerData.replace('<li class="docmores" id="docmores">더보기</li>')
				if(data.moredata.more == 1){
					doc_ListInnerData += '<li class="docmores" id="docmores">더보기</li>';
				}
		                
			    document.getElementById('doc_list').innerHTML = doc_ListInnerData;
			    loadNum++;
			  })
			  
//시작했을 때 메모리스트에 내용을 받아옴
	fetch(`http://localhost:8080/SNS/MemoListAjax.jsp?loadNum=${loadMNum}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    memo_JsonData=data;
			    for (i = 0; i < data.memoList.length; i++){
			    	memo_ListInnerData += `<li class="inner_cont memo_cont memo${i+1}">
		                	<div></div>
		                    <div class="makeinfo">

		                        <p class="contenttitle">${data.memoList[i].memoTitle}</p>
		                        <p class="memoNum" id="memoNum">${data.memoList[i].memoNum}</p>
		                        <p class="makingdate">${data.memoList[i].memoMakeDate}</p>
		                    </div>
		                </li>`
			    }
			    
			    memo_ListInnerData = memo_ListInnerData.replace('<li class="memomores" id="memomores">더보기</li>', null);
			    if(data.moredata.more == 1){
					memo_ListInnerData += '<li class="memomores" id="memomores">더보기</li>'
		        }	    
			    document.getElementById('memo_list').innerHTML = memo_ListInnerData;
			    loadMNum++;
			    })		  
//시작햇을 때 상세 창을 비움

//시작했을 때 내정보를 내 프로필 페이지로 가져옴
fetch('http://localhost:8080/SNS/MyProfileAjax.jsp') // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let srcin = "";
			    if (data.myInfo.userProfile == ""){
				    	srcin = "https://snsfile.s3.ap-northeast-2.amazonaws.com/Zpictures/Ppictures/cat.jpg";
				    } else {
				    	srcin = `./${data.myInfo.userProfile.substr(63)}`;
				    }
			    document.getElementById('myprofilepic').src = `${srcin}`;
		        document.getElementById('myprofilename').innerHTML = `${data.myInfo.userName}`;
		        document.getElementById('myprofilecomment').innerHTML = `${data.myInfo.userComment}`;
		        document.getElementById('myprofilemodifydate').innerHTML = `${data.myInfo.userChangeProfileDate}`;
			  })			 
	
//프로필 버튼을 클릭했을 경우 프로필 페이지를 토글 함
btn[0].addEventListener('click', function(){
		document.getElementById('myprofilepage').classList.toggle('bactive');
	})
//프로필 페이지의 close 버튼을 클릭했을 경우 로그인 페이지를 닫음
	document.getElementById('profileclose').addEventListener('click', function(){
		document.getElementById('myprofilepage').classList.toggle('bactive');
	})
//프로필 버튼 말고 다른 버튼들을 눌렀을 경우 열려있던 프로필 페이지 닫기
document.getElementById('buttons').addEventListener('click', function(eventa){
	console.log(eventa.target.classList);
	//버튼 [2, 3, 4]를 눌렀을 경우 프로필 페이지 닫기
	if(eventa.target.classList.contains('documents_btn')||eventa.target.classList.contains('memos_btn')||eventa.target.classList.contains('friends_btn')){
		document.getElementById('myprofilepage').classList.remove('bactive');
	}
})
}
//----------------------------------------------------------------------------------------------------------

//list 의 구분을 배열에 담음
let lists = document.getElementsByClassName('sidebar_list_inner')
//리스트들 [0] 글 목록 [1] 메모 목록 [2] 친구 목록

//----------------------------------------------------------------------------------------------------------
let doc_JsonData;
//각 리스트들을 클릭하였을 경우 해당 리스트목록을 제외한 다른 리스트목록 제거
if(btn.length == 4){
	//글 목록을 클릭했을 경우
		btn[1].addEventListener('click', function(){
			//모든 리스트 배열에 active를 삭제한 후 각 배열을 검사하여 글 목록의 배열에만 block를 줌
			for(i=0; i<lists.length; i++){
				//모든 배열에 active를 삭제
				lists[i].classList.remove('bactive');
			}
			//글 목록 리스트에 active를 추가
			lists[0].classList.add('bactive');
		})
	
		
	//메모 목록을 클릭했을 경우
		btn[2].addEventListener('click', function(){
			
			//모든 리스트 배열에 active를 삭제한 후 각 배열을 검사하여 친구 목록의 배열에만 block를 줌
			for(i=0; i<lists.length; i++){
				//모든 배열에 active를 삭제
				lists[i].classList.remove('bactive');
			}
			//메모 목록 리스트에 active를 추가
			lists[1].classList.add('bactive');
		})
		
	//친구 목록을 클릭했을 경우
		btn[3].addEventListener('click', function(){
			//모든 리스트 배열에 active를 삭제한 후 각 배열을 검사하여 친구 목록의 배열에만 block를 줌
			for(i=0; i<lists.length; i++){
				//모든 배열에 active를 삭제
				lists[i].classList.remove('bactive');
			}
			//친구 목록 리스트에 active를 추가
			lists[2].classList.add('bactive');
			
			friend_ListInnerData="";
			friendask_ListInnerData="";
			
			//친구 신청 리스트를 받아옴
			fetch(`http://localhost:8080/SNS/loadAskFriendAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let sfpic="";
			    for (i = 0; i < data.SendFriendList.length; i++){
				    if(data.SendFriendList[i].askUserProfile==""){
				    	sfpic = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	sfpic = `./${data.SendFriendList[i].substr(63)}`;
				    }
			    	friendask_ListInnerData += `<li class="inner_cont askfriend_cont askfriend${i}">
			                    <img class="frprofile" alt="프로필사진" src="${sfpic}">
			                    <div class="makeinfo">
			                    	<p class="askname">"${data.SendFriendList[i].userName}"님의 친구신청</p>
			                    	<p class="askUserEmail" id="askUserEmail">${data.SendFriendList[i].userEmail}</p>
			                        <button class="askfriendYes" id="askfriendYesBtn" value="${data.SendFriendList[i].userEmail}">수락</button>
			                        <button class="askfriendNo" id="askfriendNoBtn" value="${data.SendFriendList[i].userEmail}">거절</button>
			                    </div>
			                </li>`
			    }
			       
			    document.getElementById('askfriendlist').innerHTML = friendask_ListInnerData;
			    })
			    
			 //친구 목록을 받아옴	
			 fetch(`http://localhost:8080/SNS/friendListAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let fl="";
			    for (i = 0; i < data.friendList.length; i++){
			    if (data.friendList[i].profile==""){
			    	fl = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	fl = `./${data.friendList[i].profile.substr(63)}`;
			    }
			    	friend_ListInnerData += `<button class="inner_cont friend_cont friend0" value="${data.friendList[i].userEmail}">
			                    <img class="frprofile" alt="프로필사진" src="${fl}">
			                    <div class="makeinfo">
			                        <p class="makername">${data.friendList[i].userName}</p>
			                        <p class="friendstatus">미접속</p>
			                    </div>
			                </button>`
			    }
			       
			    document.getElementById('realfriendlist').innerHTML = friend_ListInnerData;
			    })
		})
	}
//----------------------------------------------------------------------------------------------------------

//상세 창의 모든 형식을 배열에 담음
let main_win = document.getElementsByClassName('forms');
if(main_win != null){
console.log(main_win);
//상세 창들 [0] 글 상세 창 [1] 메모 상세 창 [0] 회원가입 상세 창 [2] 프로필 변경 상세 창 
//시작 시 모든 상세 창 닫은 상태로 보이기
for(i=0; i<main_win.length;i++){
	main_win[i].classList.remove('bactive');
}
//-----------------------------------------------------------------------------------------------------------
//conts들을 클릭했을 경우 해당 conts가 doc_cont, memo_cont, friend_cont인지 검사하고 각각의 이벤트 실행
//이벤트 위임 필요 (추가된 것에도 이벤트가 발생할 필요가 있음)
if(document.getElementById('sidebar_list')!=null){
document.getElementById('sidebar_list').addEventListener('click', function(eventa){
	console.log(eventa.target);
	doc_reset();
	if(eventa.target.classList.contains('doc_cont')){
		document.getElementById('underbar').style.display = "none";
		document.getElementById('imglist').innerHTML = "";
		document.getElementById('docformtitle').innerHTML = `로드중!`;
			    document.getElementById('docinprofile').src = ``;
		        document.getElementById('docformmakername').innerHTML = ``;
		        document.getElementById('docformmakingdate').innerHTML = ``;
		        document.getElementById('main_document').innerHTML = ``;
		doc_reset();
		now_doc = `${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`;
		//챗글창 초기화
		let rep_ListInnerData = "";
		//doc_cont를 클릭했을 경우 상세 창을 doc_form으로 변경
		//모든 상세창의 active를 없애고 doc_form에만 active를 넣음
		for(i=0; i<main_win.length; i++){
			//모든 배열에 active를 삭제
			main_win[i].classList.remove('bactive');
		}
		console.log(`${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`);
		fetch(`http://localhost:8080/SNS/loadDocAjax.jsp?num=${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    if(data.docData.docpic.length==0){
			    	document.getElementById('underbar').style.height = "94.5%";
			    	document.getElementById('afterbutton').style.display = "none";
			    	document.getElementById('beforebutton').style.display = "none";
			    	
			    } else {
			    	if (data.docData.docpic.length==1){
				    	document.getElementById('afterbutton').style.display = "none";
				    	document.getElementById('beforebutton').style.display = "none";
				    	document.getElementById('underbar').style.height = "";
			    	let dinimg = "";
			    	for(i=0; i<data.docData.docpic.length;i++){
			    		dinimg += `<li class="imgbox"><img class="inimg" alt="이미지1" src="./${data.docData.docpic[i].substr(63)}"></li>`;
			    	}
			    	document.getElementById('imglist').innerHTML = dinimg;
			    	let inimg = document.getElementsByClassName('inimg'); // 이미지들
					let imgboxn = document.getElementsByClassName('imgbox'); // 이미지 박스
			    	for(i=0 ; i<inimg.length; i++){
			    	//모든 이미지의 가로 세로크기를 검사하여 큰쪽을 456.5로 고정함
						if(inimg[i].width>=inimg[i].height){
							inimg[i].style.width = '456.5px';
							console.log(inimg[i].style.height);
							let hmoves = 30;
							console.log(hmoves);
							imgboxn[i].style.marginTop = `${hmoves}px`;
						}
						else{
							inimg[i].style.height = '456.5px';
							let moves =	(481-inimg[i].style.width)/2;
							console.log(moves);
							imgboxn[i].style.margin = `0 ${moves}px`;
						}
					}
			    	} else {
			    		document.getElementById('afterbutton').style.display = "block";
				    	document.getElementById('beforebutton').style.display = "none";
			    	document.getElementById('underbar').style.height = "";
			    	let dinimg = "";
			    	for(i=0; i<data.docData.docpic.length;i++){
			    		dinimg += `<li class="imgbox"><img class="inimg" alt="이미지1" src="./${data.docData.docpic[i].substr(63)}"></li>`;
			    	}
			    	document.getElementById('imglist').innerHTML = dinimg;
			    	let inimg = document.getElementsByClassName('inimg'); // 이미지들
					let imgboxn = document.getElementsByClassName('imgbox'); // 이미지 박스
			    	for(i=0 ; i<inimg.length; i++){
			    	//모든 이미지의 가로 세로크기를 검사하여 큰쪽을 456.5로 고정함
						if(inimg[i].width>=inimg[i].height){
							inimg[i].style.width = '456.5px';
							let hmoves = 30;
							console.log(hmoves);
							imgboxn[i].style.marginTop = `${hmoves}px`;
						}
						else{
							inimg[i].style.height = '456.5px';
							let moves =	(481-inimg[i].width)/2;
							console.log(moves);
							imgboxn[i].style.margin = `0 ${moves}px`;
						}
					}
				}
			  }
			    let dip="";
			    if(data.docData.docProfile==""){
			    	dip="https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	dip = `./${data.docData.docProfile.substr(63)}`;
			    }
			    document.getElementById('underbar').style.display = "block";
			    document.getElementById('docformtitle').innerHTML = `${data.docData.docTitle}`;
			    document.getElementById('docinprofile').src = `${dip}`;
		        document.getElementById('docformmakername').innerHTML = `${data.docData.userName}`;
		        document.getElementById('docformmakingdate').innerHTML = `${data.docData.docMakeDate}`;
		        document.getElementById('main_document').innerHTML = `${data.docData.docContent}`;
		        document.getElementById('docthumbA').value = `${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`;
		        document.getElementById('docthumbB').value = `${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`;
		        document.getElementById('deldocnum').value = `${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`;
		        if(data.docData.docThumb==1){
		        	document.getElementById('delDocThumb').classList.add('bactive');
		        	document.getElementById('doDocThumb').classList.remove('bactive');
		        }
		        else if(data.docData.docThumb==0){
		       	 	document.getElementById('doDocThumb').classList.add('bactive');
		        	document.getElementById('delDocThumb').classList.remove('bactive');
		        }
			    })
		//글 상세창에 active를 추가
		main_win[0].classList.add('bactive');
		//댓글 사이드바에 factive를 추가
		document.getElementById('rsidebar').classList.add('factive');

		//댓글 로드하기
		fetch(`http://localhost:8080/SNS/loadDocRepAjax.jsp?num=${eventa.target.childNodes[3].childNodes[1].childNodes[3].innerHTML}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let rpp="";
			    for (i = 0; i < data.docRepData.length; i++){
				    if (data.docRepData[i].repProfile==""){
				    	rpp = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	rpp = `./${data.docRepData[i].repProfile.substr(63)}`;
				    }
				    	rep_ListInnerData += `<div class="replistline ${data.docRepData[i].repNum}" >
			                <div class="innerrep">
			                    <img class="repprofile" alt="프로필사진" src="${rpp}">
		                    <div class="makeinfo">
		                        <span class="friendname">${data.docRepData[i].userName}</span>
		                        <span class="repdate">${data.docRepData[i].repMakeDate}</span>
		                	</div>
		            	</div>
		                    <p class="innerrepcont">${data.docRepData[i].repContent}</p>
		                    <span class="deleterep ${data.docRepData[i].repNum}" id="deleterep">Delete</span>
		        	</div>`
			    }
			    document.getElementById('realrepcover').innerHTML= rep_ListInnerData;
			    })
	}
	else if(eventa.target.classList.contains('docmores')){
		document.getElementById('docmores').style.pointerEvents='none';
		document.getElementById('docmores').innerHTML = "로딩 중...";
		fetch(`http://localhost:8080/SNS/DocListAjax.jsp?loadNum=${loadNum}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let srcin = "";
			    for (i = 0; i < data.docList.length; i++){
			    	if (data.docList[i].docProfile.substr(63)==""){
				    	srcin = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	srcin = `./${data.docList[i].docProfile.substr(63)}`;
				    }
			    	doc_ListInnerData += `<li class="inner_cont doc_cont con${i+1}">
		                    <img class="docprofile" alt="프로필사진" src="${srcin}">
		                    <div class="makeinfo">
		                        <p class="info_namebar">
		                        	<span class="makerName">${data.docList[i].userName}</span>
		                        	<span class="docNum">${data.docList[i].docNum}</span>
		                        </p>
		                        <p class="contenttitle">${data.docList[i].docTitle}</p>
		                        <p class="makingdate">${data.docList[i].docMakeDate}</p>
		                    </div>
		        </li>`
			    } 
			    doc_ListInnerData = doc_ListInnerData.replace('<li class="docmores" id="docmores">더보기</li>', "");
			    if(data.moredata.more == 1){
					doc_ListInnerData += '<li class="docmores" id="docmores">더보기</li>'
		        }
			    document.getElementById('doc_list').innerHTML = doc_ListInnerData;
			    loadNum++;
			    if(document.getElementById('docmores')!=null){
			    	document.getElementById('docmores').style.pointerEvents='';
					document.getElementById('docmores').innerHTML = "더보기";
				}
			  })
	}
	else if(eventa.target.classList.contains('memomores')){
		document.getElementById('memomores').style.pointerEvents='none';
		document.getElementById('memomores').innerHTML = "로딩 중...";
		fetch(`http://localhost:8080/SNS/MemoListAjax.jsp?loadNum=${loadMNum}`) // ajax 가져오기
				  .then(res => {
				    // response 처리
				    console.log(res);
				    // 응답을 JSON 형태로 파싱
				    return res.json();
				  })
				  .then(data => {
				    // json 출력
				    memo_JsonData=data;
				    for (i = 0; i < data.memoList.length; i++){
				    	memo_ListInnerData += `<li class="inner_cont memo_cont memo${i+1}">
			                	<div></div>
			                    <div class="makeinfo">
	
			                        <p class="contenttitle">${data.memoList[i].memoTitle}</p>
			                        <p class="memoNum" id="memoNum">${data.memoList[i].memoNum}</p>
			                        <p class="makingdate">${data.memoList[i].memoMakeDate}</p>
			                    </div>
			                </li>`
				    }
				    
				    memo_ListInnerData = memo_ListInnerData.replace('<li class="memomores" id="memomores">더보기</li>', "");
				    if(data.moredata.more == 1){
						memo_ListInnerData += '<li class="memomores" id="memomores">더보기</li>'
			        }
				    document.getElementById('memo_list').innerHTML = memo_ListInnerData;
				    if(document.getElementById('memomores')!= null){
				    	document.getElementById('memomores').style.pointerEvents='';
						document.getElementById('memomores').innerHTML = "더보기";
				    }
				    document.getElementById('memo_list').innerHTML = memo_ListInnerData;
				    loadMNum++;
				    })	
	}

	else if(eventa.target.classList.contains('memo_cont')){
		//memo_cont를 클릭했을 경우 상세 창을 memo_form으로 변경
		for(i=0; i<main_win.length; i++){
			//모든 배열에 active를 삭제
			main_win[i].classList.remove('bactive');
		}
		fetch(`http://localhost:8080/SNS/loadMemoAjax.jsp?num=${eventa.target.childNodes[3].childNodes[3].innerHTML}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    document.getElementById('memoformtitlebar').innerHTML = `${data.memoData.memoTitle}`;
		        document.getElementById('memoformmakingdate').innerHTML = `${data.memoData.memoMakeDate}`;
		        document.getElementById('memo_document').innerHTML = `${data.memoData.memoContent}`;
		        document.getElementById('memothumbA').value = `${eventa.target.childNodes[3].childNodes[3].innerHTML}`;
		        document.getElementById('memothumbB').value = `${eventa.target.childNodes[3].childNodes[3].innerHTML}`;
		        document.getElementById('delmemonum').value = `${eventa.target.childNodes[3].childNodes[3].innerHTML}`;
		        if(data.memoData.memoThumb==1){
		        	document.getElementById('delMemoThumb').classList.add('bactive');
		        	document.getElementById('doMemoThumb').classList.remove('bactive');
		        }
		        else if(data.memoData.memoThumb==0){
		       	 	document.getElementById('doMemoThumb').classList.add('bactive');
		        	document.getElementById('delMemoThumb').classList.remove('bactive');
		        }
		        let inmemopic="";
		        for(i=0; i<data.memoData.memopic.length;i++){
		        	inmemopic+=`<li class="mpic"><img class="mpicimg" alt="메모이미지1" src="${data.memoData.memopic[i].substr(63)}"></li>`;
		        }
		        document.getElementById('memopicline').innerHTML = inmemopic;
			    }).then(function(){
		//메모 상세창에 active를 추가
		main_win[1].classList.add('bactive');
		//댓글 사이드바에 factive를 제거
		document.getElementById('rsidebar').classList.remove('factive');
		//모든 이미지의 가로 세로크기를 검사하여 큰쪽을 296.46로 고정함
		let memopictures = document.getElementsByClassName('mpicimg');
		let mpicbox = document.getElementsByClassName('mpic');
		
		for(i=0 ; i<memopictures.length; i++){
			if(memopictures[i].width / memopictures[i].height > 1.1783){
				memopictures[i].style.width = '296.46px';
				let hmoves = (251.6-memopictures[i].height)/2;
				console.log(hmoves);
				memopictures[i].style.marginTop = `${hmoves}px`;
			}
			else {
				memopictures[i].style.height = '251.6px';
				let moves =	(296.46-memopictures[i].width)/2;
				console.log(moves);
			}
		}
		//memo_cont의 형식 초기화
		memopicline.style.left = `0px`;
		memopicline.style.transform = `translate(0px)`;})
	}
	else if(eventa.target.classList.contains('friend_cont')){
		//friend_cont를 클릭했을 경우
		console.log(eventa.target.value);
		//친구 정보 Ajax 요청
			fetch(`http://localhost:8080/SNS/friendProfileAjax.jsp?Email=${eventa.target.value}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let frip = "";
			    if (data.frInfo.userProfile == ""){
			    	frip = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	frip = data.frInfo.userProfile.substr(63);
			    }
			    document.getElementById('frinfoprofile').src = `${frip}`;
		        document.getElementById('frinfoName').innerHTML = `${data.frInfo.userName}`;
		        document.getElementById('frinfoComment').innerHTML = `${data.frInfo.userComment}`;
		        document.getElementById('frinfoChangeDate').innerHTML = `${data.frInfo.userChangeProfileDate}`;
			  })
		//친구 프로필 페이지을 열었다가 닫음
		document.getElementById('frprofilepage').classList.toggle('bactive');
	}
	//친구 수락 or 거절
	else if(eventa.target.classList.contains('askfriendYes')){
		eventa.target.parentNode.parentNode.innerHTML = "";
		fetch(`http://localhost:8080/SNS/answerFriendAjax.jsp?answer=1&Email=${eventa.target.value}`) // ajax 가져오기
			  .then(res => {
			    console.log(res);
			  }).then(function(){
			  	fetch(`http://localhost:8080/SNS/loadAskFriendAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    friendask_ListInnerData="";
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let sfpic="";
			    for (i = 0; i < data.SendFriendList.length; i++){
				    if(data.SendFriendList[i].askUserProfile==""){
				    	sfpic = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	sfpic = `./${data.SendFriendList[i].substr(63)}`;
				    }
			    	friendask_ListInnerData += `<li class="inner_cont askfriend_cont askfriend${i}">
			                    <img class="frprofile" alt="프로필사진" src="${sfpic}">
			                    <div class="makeinfo">
			                    	<p class="askname">"${data.SendFriendList[i].userName}"님의 친구신청</p>
			                    	<p class="askUserEmail" id="askUserEmail">${data.SendFriendList[i].userEmail}</p>
			                        <button class="askfriendYes" id="askfriendYesBtn" value="${data.SendFriendList[i].userEmail}">수락</button>
			                        <button class="askfriendNo" id="askfriendNoBtn" value="${data.SendFriendList[i].userEmail}">거절</button>
			                    </div>
			                </li>`
			    }
			       
			    document.getElementById('askfriendlist').innerHTML = friendask_ListInnerData;
			    })
			    
			 //친구 목록을 받아옴	
			 fetch(`http://localhost:8080/SNS/friendListAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    friend_ListInnerData="";
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let fl="";
			    for (i = 0; i < data.friendList.length; i++){
			    	if (data.friendList[i].profile == ""){
			    		fl = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    	} else {
			    		fl = `./${data.friendList[i].profile.substr(63)}`
			    	}
			    	friend_ListInnerData += `<button class="inner_cont friend_cont friend0" value="${data.friendList[i].userEmail}">
			                    <img class="frprofile" alt="프로필사진" src="${fl}">
			                    <div class="makeinfo">
			                        <p class="makername">${data.friendList[i].userName}</p>
			                        <p class="friendstatus">미접속</p>
			                    </div>
			                </button>`
			    }
			       
			    document.getElementById('reallist').innerHTML = friend_ListInnerData;
			    })
			  })
		
		
	}
	else if(eventa.target.classList.contains('askfriendNo')){
		eventa.target.parentNode.parentNode.innerHTML = "";
		
		fetch(`http://localhost:8080/SNS/answerFriendAjax.jsp?answer=2&Email=${eventa.target.value}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			  }).then(function(){
			  fetch(`http://localhost:8080/SNS/loadAskFriendAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    friendask_ListInnerData="";
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let sfpic="";
			    for (i = 0; i < data.SendFriendList.length; i++){
				    if(data.SendFriendList[i].askUserProfile==""){
				    	sfpic = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
				    } else {
				    	sfpic = `./${data.SendFriendList[i].substr(63)}`;
				    }
			    	friendask_ListInnerData += `<li class="inner_cont askfriend_cont askfriend${i}">
			                    <img class="frprofile" alt="프로필사진" src="${sfpic}">
			                    <div class="makeinfo">
			                    	<p class="askname">"${data.SendFriendList[i].userName}"님의 친구신청</p>
			                    	<p class="askUserEmail" id="askUserEmail">${data.SendFriendList[i].userEmail}</p>
			                        <button class="askfriendYes" id="askfriendYesBtn" value="${data.SendFriendList[i].userEmail}">수락</button>
			                        <button class="askfriendNo" id="askfriendNoBtn" value="${data.SendFriendList[i].userEmail}">거절</button>
			                    </div>
			                </li>`
			    }
			       
			    document.getElementById('askfriendlist').innerHTML = friendask_ListInnerData;
			    })
			    
			 //친구 목록을 받아옴	
			 fetch(`http://localhost:8080/SNS/friendListAjax.jsp`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    friend_ListInnerData="";
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let fl="";
			    for (i = 0; i < data.friendList.length; i++){
			    if (data.friendList[i].profile==""){
			    	fl="https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	fl=`./${fl}`
			    }
			    	friend_ListInnerData += `<button class="inner_cont friend_cont friend0" value="${data.friendList[i].userEmail}">
			                    <img class="frprofile" alt="프로필사진" src=${fl}>
			                    <div class="makeinfo">
			                        <p class="makername">${data.friendList[i].userName}</p>
			                        <p class="friendstatus">미접속</p>
			                    </div>
			                </button>`
			    }
			       
			    document.getElementById('realfriendlist').innerHTML = friend_ListInnerData;
			    })
			  })	
	}
})
}
}
//------------------------------------------------------------------------------------------------------
//rsidebar 클릭에 대한 이벤트 위임
if(btn.length == 4){
document.getElementById('realrepcover').addEventListener('click', function(event){
	if(event.target.classList.contains('deleterep')){
		let rep_ListInnerData = "";
		fetch(`http://localhost:8080/SNS/deleteRepAjax.jsp?num=${event.target.classList[1]}`) // ajax페이지 실행
		fetch(`http://localhost:8080/SNS/loadDocRepAjax.jsp?num=${now_doc}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let rpp="";
			    for (i = 0; i < data.docRepData.length; i++){
			    if (data.docRepData[i].repProfile==""){
			    	rpp = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	rpp = `./${data.docRepData[i].repProfile.substr(63)}`;
			    }
			    	rep_ListInnerData += `<div class="replistline ${data.docRepData[i].repNum}" >
		                <div class="innerrep">
		                    <img class="repprofile" alt="프로필사진" src="${rpp}">
		                    <div class="makeinfo">
		                        <span class="friendname">${data.docRepData[i].userName}</span>
		                        <span class="repdate">${data.docRepData[i].repMakeDate}</span>
		                	</div>
		            	</div>
		                    <p class="innerrepcont">${data.docRepData[i].repContent}</p>
		                    <span class="deleterep ${data.docRepData[i].repNum}" id="deleterep">delete</span>
		        	</div>`
			    }
			    document.getElementById('realrepcover').innerHTML= rep_ListInnerData;
			    })
		
	}
})
}
//---------------------------------------------------------------------------------------------
//친구 프로필의 close를 누를 경우 페이지 제거
document.getElementById('frprofileclose').addEventListener('click', function(){
	document.getElementById('frprofilepage').classList.remove('bactive');
})
//친구 프로필의 채팅 버튼을 누를 경우 채팅창 생성, 친구 프로필 페이지 제거
document.getElementById('chatfr_btn').addEventListener('click', function(){
	//친구 프로필 제거
	document.getElementById('frprofilepage').classList.remove('bactive');
	//채팅창 생성
	document.getElementById('chatpage').classList.add('bactive');
})
//채팅페이지의 close 버튼 누를 시 채팅창 제거
document.getElementById('chatclose').addEventListener('click', function(){
	document.getElementById('chatpage').classList.remove('bactive');
})

//------------------------------------------------------------------------------------------------------
if(main_win != null){
let boxes = document.getElementsByClassName('imgbox'); //상세창의 박스
//상세 창 관련
	//상세 창의 슬라이드 버튼을 누를 시 그림을 슬라이드함
	console.log(document.getElementsByClassName('imgbox'));
	 // 보이고있는 이미지의 순번 = dos
	console.log(boxes.length);
//after 버튼을 누를 시
if(document.getElementById('afterbutton')!=null){
	document.getElementById('afterbutton').addEventListener('click', function(){
		//화면을 오른쪽으로 섹션의 width만큼 imglist를 슬라이드함
		document.getElementById('beforebutton').style.display = 'block';
		dos--;
		console.log(dos);
		let range = dos*slidePX;
		console.log(range);
		document.getElementById('imglist').style.transform = `translateX(${range}px)`;
		if(-dos == boxes.length-1){
			document.getElementById('afterbutton').style.display = 'none';
		}
	})
	}
	
//before 버튼을 누를 시
if(document.getElementById('beforebutton')!=null){
	document.getElementById('beforebutton').addEventListener('click', function(){
		//화면을 오른쪽으로 섹션의 width만큼 imglist를 슬라이드함
		document.getElementById('afterbutton').style.display = 'block';
		dos++;
		console.log(dos);
		let range = dos*478.5;
		console.log(range);
		document.getElementById('imglist').style.transform = `translateX(${range}px)`;
		if(dos == 0){
			document.getElementById('beforebutton').style.display = 'none';
		}
	})
}
//underbar 내용을 누를 시 underbar 올리기 (uped 클래스 토글 이용)
if(document.getElementById('main_document')!=null){
	document.getElementById('main_document').addEventListener('click', function(){
		document.getElementById('underbar').classList.toggle('uped');
	})
	}
	}
//------------------------------------------------------------------------------------------------------

//헤더에 톱니버튼을 누를 경우 사이드바의 위치를 옮김
if(btn.length == 1){
document.getElementById('topni').addEventListener('click', function(){
	if(document.getElementById('topni').classList.contains('curl')){
	document.getElementById('sidebar').style.transform = 'translateX(-500px)';
	document.getElementById('topni').classList.remove('curl');
	document.getElementById('topni').classList.add('uncurl');
	document.getElementById('joinform').style.paddingLeft = '0px';
	}
	else {
	document.getElementById('sidebar').style.transform = 'translateX(0px)';
	document.getElementById('topni').classList.remove('uncurl');
	document.getElementById('topni').classList.add('curl');
	document.getElementById('joinform').style.paddingLeft = '81px';
	}
})
} else {
document.getElementById('topni').addEventListener('click', function(){
	if(document.getElementById('topni').classList.contains('curl')){
	document.getElementById('sidebar').style.transform = 'translateX(-500px)';
	document.getElementById('topni').classList.remove('curl');
	document.getElementById('topni').classList.add('uncurl');
	}
	else {
	document.getElementById('sidebar').style.transform = 'translateX(0px)';
	document.getElementById('topni').classList.remove('uncurl');
	document.getElementById('topni').classList.add('curl');
	}
})
}

//---------------------------------------------------------------------------------------------------------
//시작하자 마자 브라우저 크기 검사, incheck값을 결정한 후 시작페이지 구성 조정
let incheck //incheck 범위안에 들어왔는지 아닌지를 확인

//페이지 크기를 수정 할 때마다 리사이즈가 작동하여 1178보다 작을경우 토글로 사이드바를 열었음에도 더 작게 리사이즈 했을경우 사이드바가 사라짐
	if(window.innerWidth <= 1178){
		//브라우저의 width가 1178px안에 들어왔을 경우 사이드바를 숨김
		document.getElementById('sidebar').style.transform = 'translateX(-500px)';
		document.getElementById('topni').classList.remove('curl');
		document.getElementById('topni').classList.add('uncurl');
		incheck = 1;
		console.log(incheck);
	}
	else {
		document.getElementById('sidebar').style.transform = 'translateX(0px)';
		document.getElementById('topni').classList.remove('uncurl');
		document.getElementById('topni').classList.add('curl');
		incheck = 0;
		console.log(incheck);
	}

window.addEventListener('resize', function(){
	if(window.innerWidth <= 1178){
		//브라우저의 width가 1178px안에 들어왔을 경우 사이드바를 숨김
		if(incheck==0){
			document.getElementById('sidebar').style.transform = 'translateX(-500px)';
			document.getElementById('topni').classList.remove('curl');
			document.getElementById('topni').classList.add('uncurl');
			if(btn.length == 1){
			document.getElementById('joinform').style.paddingLeft = '0px';
			}
			incheck = 1;
		}
	}
	else {
		if(incheck==1){
			document.getElementById('sidebar').style.transform = 'translateX(0px)';
			document.getElementById('topni').classList.remove('uncurl');
			document.getElementById('topni').classList.add('curl');
			if(btn.length == 1){
			document.getElementById('joinform').style.paddingLeft = '81px';
			}
			incheck = 0;
		}
	}
})

//----------------------------------------------------------------------------------------------------

//rsidebar (댓글 창)조정
//시작하자 마자 브라우저 크기 검사, rincheck값을 결정한 후 시작페이지 구성 조정
let rincheck //rincheck 범위안에 들어왔는지 아닌지를 확인
if(document.getElementById('rsidebar')!=null){
//페이지 크기를 수정 할 때마다 리사이즈가 작동하여 1460보다 작을경우 토글로 r사이드바를 열었음에도 더 작게 리사이즈 했을경우 사이드바가 사라짐
	if(window.innerWidth <= 1460){
		//브라우저의 width가 1460px안에 들어왔을 경우 사이드바를 숨김
		document.getElementById('rsidebar').classList.remove('out');
		document.getElementById('rsidebar_btn').innerHTML = '<';
		rincheck = 1;
		console.log(rincheck);
	}
	else {
		document.getElementById('rsidebar').classList.add('out');
		document.getElementById('rsidebar_btn').innerHTML = '>';
		rincheck = 0;
		console.log(rincheck);
	}

window.addEventListener('resize', function(){
	if(window.innerWidth <= 1460){
		//브라우저의 width가 1460px안에 들어왔을 경우 사이드바를 숨김
		if(rincheck==0){
			document.getElementById('rsidebar').classList.remove('out');
			document.getElementById('rsidebar_btn').innerHTML = '<';
			rincheck = 1;
		}
		
	}
	else {
		if(rincheck==1){
			document.getElementById('rsidebar').classList.add('out');
			document.getElementById('rsidebar_btn').innerHTML = '>';
			rincheck = 0;
		}
	}
})

//rsidebar_btn을 눌렀을 경우 사이드바 위치 조절
document.getElementById('rsidebar_btn').addEventListener('click', function(){
	if(document.getElementById('rsidebar').classList.contains('out')){
		//class로 out을 가지고 있을 경우
		document.getElementById('rsidebar').classList.remove('out');
		document.getElementById('rsidebar_btn').innerHTML = '<';
		rincheck = 0;
	}
	else {
		//가지고 있지 않을 경우
		document.getElementById('rsidebar').classList.add('out');
		document.getElementById('rsidebar_btn').innerHTML = '>';
		rincheck = 1;
	}
})
}
//로그인페이지의 회원가입 버튼 클릭 시 회원가입 상세 창 열기
	document.getElementById('add_btn').addEventListener('click', function(){
		//모든 상세창의 active를 없애고 join_form에만 active를 넣음
		for(i=0; i<main_win.length; i++){
			//모든 배열에 active를 삭제
			main_win[i].classList.remove('bactive');
		}
		//회원가입 상세창에 active를 추가
		main_win[0].classList.add('bactive');
		//로그인 페이지 닫기 자물쇠 모양 변경
		document.getElementById('loginpage').classList.toggle('bactive');
		btn[0].innerHTML = '<i class="fas fa-lock" id="login_btni"></i>';
		//댓글 사이드바에 factive를 제거
		if(document.getElementById('rsidebar')!=null){
			document.getElementById('rsidebar').classList.remove('factive');
		}
	})

//프로필 에서 정보변경 버튼 클릭 시 정보변경 상세 창 열기
	document.getElementById('changemyprofile_btn').addEventListener('click', function(){
		//모든 상세창의 active를 없애고 changeprofile_form에만 active를 넣음
		for(i=0; i<main_win.length; i++){
			//모든 배열에 active를 삭제
			main_win[i].classList.remove('bactive');
		}
		//정보 수정 상세창에 active를 추가
		main_win[2].classList.add('bactive');
		//내 프로필 페이지 닫기
		document.getElementById('myprofilepage').classList.toggle('bactive');
		//댓글 사이드바에 factive를 제거
		document.getElementById('rsidebar').classList.remove('factive');
	})

//----------------------------------------------------------------------------------------------------
//키다운 이벤트
document.addEventListener('keypress', function(key){
	console.log(key.code);
})

//-----------------------------------------------------------------------------------------------------
//메모 상세 창 이미지 드래그 슬라이드
if(main_win != null){
let mdowned = 0; // 0일 경우 미 드래그 상태 1일 경우 드래그 상태
let memopic = document.getElementById('memopic')
let memopicline = document.getElementById('memopicline')
let clickoffset;
let transN;

window.addEventListener('mousemove', function(event){
	if(mdowned==1 && event.target == memopic){
		memopicline.style.left = `${event.offsetX}px`;
		memopicline.style.transform = `translate(-${clickoffset}px)`;
	}
})

let insnum = '';

window.addEventListener('mousedown', function(){
	insnum = '';
	//마우스 버튼이 눌린 상태일 경우 mdowned를 1로 변경
	if(event.target == memopic || event.target == memopicline){
			mdowned=1;
			console.log(mdowned);
			clickoffset = event.offsetX;
			memopicline.style.pointerEvents = 'none';
			
	}
})

window.addEventListener('mouseup', function(){
	//마우스 버튼이 떨어졌을 경우 mdowned를 0으로 변경
	widthsum = 0;
	mdowned=0;
	if(memopicline!= null){
	memopicline.style.pointerEvents = 'auto';
		transN = memopicline.style.transform;
			
			for(j=11; j<16; j++){
				for(i=0; i<10 ; i++){
					if(transN[j] == i){
						let innum=i;
						break;
					}
				}
				if(i != transN[j]){break;}
				insnum = `${insnum}${transN[j]}`;
			}
		let mpica = document.getElementsByClassName('mpicimg');
		for(i=0; i<mpica.length; i++){
			widthsum = widthsum + mpica[i].width + 7; // 7은 마진의 크기
		}
	if(-insnum >= -mpica[0].width/1.4){
		memopicline.style.left = `0px`;
		memopicline.style.transform = `translate(0px)`;
	}

	else if(-insnum <=  -widthsum + mpica[mpica.length-1].width/1.4){
		memopicline.style.left = `630px`;
		memopicline.style.transform = `translate(-${widthsum}px)`;
	}
	}
})
}
//필터링 구현-----------------------------------------------------------------------------------------
	//자바스크립트 배열 필터링을 이용
	//필터칸에 타이핑 될 때마다 타이핑된 문자열을 함수로 보내고
	//active되어있는 모든 글 목록들을 한 배열에 저장 후 해당 글의 제목, 글쓴이를 조사하여
	//일치하는 항목이 있을 경우 다른 배열에 그 글의 리스트를 저장
	//해당 배열들을 제외한 나머지 리스트들에 display none을 주고
	//이전에 있던 배열들의 리스트에 display flex를 줌
	
//input공간에 값을 입력할 때마다 이벤트 발생
if(document.getElementById('sidebar_list')!=null){
document.getElementById('filter').addEventListener('input', function(event){
	let inputvalue = document.getElementById('filterv').value; //박스에 입력된txt
	let innerconts = document.querySelectorAll('.inner_cont'); //cont 요소들
//getElementsByClassName으로 얻은 DOM들은 HTML엘리먼트로 저장되며, 배열로 저장되지 않아
//배열 함수를 사용할 수 없음 그래서 배열로의 변경이 필요함
	var innercontsarray = Array.prototype.slice.call( innerconts )
//innercontsarray에 innerconts로 받은 HTML요소를 배열로 변경
	for(i=innercontsarray.length-1; i>=0; i--){
	//각 배열의 요소를 검사하여 부모 리스트가 보이지 않는 요소는 배열에서 삭제함
		if(!innercontsarray[i].parentNode.classList.contains('bactive')){
			innercontsarray.splice(i, 1);
		}
	}
	for(i=0; i<innerconts.length; i++){
	//삭제 후 나온 배열을 모두 보이게 처리
		innerconts[i].style.display = 'flex';
	}
	let stringcomp; // 배열안의 문자열 내용을 담을 변수
	for(i=0;i<innercontsarray.length;i++){
		stringcomp = innercontsarray[i].innerHTML;
		console.log(innercontsarray[i].innerHTML);
		//만약 text박스에 입력한 값이 stringcomp에 들어있지 않을 경우
		//해당 DOM을 display none처리함
		if(!(stringcomp.includes(inputvalue))){
			innercontsarray[i].style.display = 'none';
		}
	}
})
}
//댓글 작성 ---------------------------------------------------------------------
if(btn.length == 4){
document.getElementById('writerepbtn').addEventListener('click', function(){
	let rep_ListInnerData = "";
	let rcontent = document.getElementById('repContent').value;
	document.getElementById('repContent').value=" ";
	
	fetch(`http://localhost:8080/SNS/writeRepAjax.jsp?num=${now_doc}&repContent=${rcontent}`);
	fetch(`http://localhost:8080/SNS/loadDocRepAjax.jsp?num=${now_doc}`) // ajax 가져오기
			  .then(res => {
			    // response 처리
			    console.log(res);
			    // 응답을 JSON 형태로 파싱
			    return res.json();
			  })
			  .then(data => {
			    // json 출력
			    console.log(data);
			    let rpp="";
			    for (i = 0; i < data.docRepData.length; i++){
			    if (data.docRepData[i].repProfile==""){
			    	rpp = "https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170928801.jpg";
			    } else {
			    	rpp = `./${data.docRepData[i].repProfile.substr(63)}`;
			    }
			    	rep_ListInnerData += `<div class="replistline ${data.docRepData[i].repNum}" >
		                <div class="innerrep">
		                    <img class="repprofile" alt="프로필사진" src="${rpp}">
		                    <div class="makeinfo">
		                        <span class="friendname">${data.docRepData[i].userName}</span>
		                        <span class="repdate">${data.docRepData[i].repMakeDate}</span>
		                	</div>
		            	</div>
		                    <p class="innerrepcont">${data.docRepData[i].repContent}</p>
		                    <span class="deleterep ${data.docRepData[i].repNum}" id="deleterep">delete</span>
		        	</div>`
			    }
			    document.getElementById('realrepcover').innerHTML= rep_ListInnerData;
			    })
	
	})
}
let Daddnum = 0;
let Maddnum = 0;
//글 이미지 추가버튼----------------------------------------------
if(btn.length == 4){
	
	document.getElementById('DmorefileBtn').addEventListener('click', function(){
		if(Daddnum < 8){
			Daddnum += 1;
			document.getElementById('Dinputimg').innerHTML += `<input type="file" class="writedocpic" name = "Dimg${Daddnum}" files multiple accept = "image/*">`
		} else {
			alert("파일은 최대 8개 까지만 올릴 수 있습니다.");
		}
		

	})
}
//메모 이미지 추가버튼---------------------------------------------
if(btn.length == 4){
	
	document.getElementById('MmorefileBtn').addEventListener('click', function(){
		if(Maddnum < 8){
			Maddnum += 1;
			document.getElementById('Minputimg').innerHTML += `<input type="file" class="writememopic" name = "Mimg${Maddnum}" files multiple accept = "image/*">`
		} else {
			alert("파일은 최대 8개 까지만 올릴 수 있습니다.");
		}
		

	})
}
//친구신청---------------------------------------------------------
if(btn.length == 4){
document.getElementById('askFriendBtn').addEventListener('click',function(){
	let emailvalue = document.getElementById('askFriendEmail').value;
	document.getElementById('askFriendEmail').value = "";
	fetch(`http://localhost:8080/SNS/askFriendAjax.jsp?Email=${emailvalue}`);
})
}
//글, 메모 작성 페이지-----------------------------------------------------------
	//리스트에 + 버튼을 눌렀을 경우 글 또는 메모 작성 페이지를 보이게함
	if(btn.length == 4){
		document.getElementById('writesomething').addEventListener('click', function(){
			if(document.getElementById('doc_list').classList.contains('bactive')){
				document.getElementById('writedocpage').classList.toggle('bactive');
			}
		})
		//글 작성 페이지의 close 버튼을 누를 경우 페이지를 가림
		document.getElementById('writedocpageclose').addEventListener('click', function(){
			document.getElementById('writedocpage').classList.toggle('bactive');
			Daddnum=0;
			document.getElementById('Dinputimg').innerHTML = "";
		})
		
		document.getElementById('writesomething').addEventListener('click', function(){
			if(document.getElementById('memo_list').classList.contains('bactive')){
				document.getElementById('writememopage').classList.toggle('bactive');
			}
		})
		//메모 작성 페이지의 close 버튼을 누를 경우 페이지를 가림
		document.getElementById('writememopageclose').addEventListener('click', function(){
			document.getElementById('writememopage').classList.toggle('bactive');
			Maddnum=0;
			document.getElementById('Minputimg').innerHTML = "";
		})
		
		document.getElementById('writesomething').addEventListener('click', function(){
			if(document.getElementById('friend_list').classList.contains('bactive')){
				document.getElementById('askfriendpage').classList.toggle('bactive');
			}
		})
		//메모 작성 페이지의 close 버튼을 누를 경우 페이지를 가림
		document.getElementById('askfriendpageclose').addEventListener('click', function(){
			document.getElementById('askfriendpage').classList.toggle('bactive');
		})
	}