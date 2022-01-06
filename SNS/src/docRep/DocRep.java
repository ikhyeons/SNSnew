package docRep;

public class DocRep {
	private int docNum;
	private	int ripNum;
	private String userEmail;
	private String repMakeDate;
	private String repContent;
	private int repDelete;
	
	public int getDocNum() {
		return docNum;
	}
	public void setDocNum(int docNum) {
		this.docNum = docNum;
	}
	public int getRipNum() {
		return ripNum;
	}
	public void setRipNum(int ripNum) {
		this.ripNum = ripNum;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getRepMakeDate() {
		return repMakeDate;
	}
	public void setRepMakeDate(String repMakeDate) {
		this.repMakeDate = repMakeDate;
	}
	public String getRepContent() {
		return repContent;
	}
	public void setRepContent(String repContent) {
		this.repContent = repContent;
	}
	public int getRepDelete() {
		return repDelete;
	}
	public void setRepDelete(int repDelete) {
		this.repDelete = repDelete;
	}

}
