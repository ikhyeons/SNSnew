package doc;

public class Doc {
	private String docNum;
	private String userEmail;
	private String userName;
	private String docTitle;
	private String docMakeDate;
	private String docContent;
	private String docDelete;
	
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getDocTitle() {
		return docTitle;
	}
	public void setDocTitle(String docTitle) {
		this.docTitle = docTitle;
	}
	public String getDocMakeDate() {
		return docMakeDate;
	}
	public void setDocMakeDate(String docMakeDate) {
		this.docMakeDate = docMakeDate;
	}
	public String getDocContent() {
		return docContent;
	}
	public void setDocContent(String docContent) {
		this.docContent = docContent;
	}
	public String getDocNum() {
		return docNum;
	}
	public void setDocNum(String docNum) {
		this.docNum = docNum;
	}

	public String getDocDelete() {
		return docDelete;
	}
	public void setDocDelete(String docDelete) {
		this.docDelete = docDelete;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
}
