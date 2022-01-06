package doc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import doc.Doc;
import user.User;

public class DocDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public DocDAO() {
		try {
			String dbURL = "jdbc:mysql://database-1.co9pinwozv4n.ap-northeast-2.rds.amazonaws.com:3306/ikhyeonsns";
			//String dbURL = "jdbc:mysql://localhost:3306/sns";
			String dbID = "root";
			String dbPassword = "abcd1234";
			//String dbPassword = "1234";
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getDate() {
		String SQL = "select now()";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ""; // 데이터베이스 오류
}

	public String getuserName(String userEmail) {
		String SQL = "select userName from user where userEmail = ?";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ""; // 데이터베이스 오류
}
	
	//----------------------------------------------------------------글쓰기---------------------------
	public int writeDoc(String userEmail, String docTitle, String docContent) {
		String SQL = "insert into doc values (NULL, ?, ?, ?, ?, ?, DEFAULT, NULL)";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setString(2, getuserName(userEmail));
			pstmt.setString(3, docTitle);
			pstmt.setString(4, getDate());
			pstmt.setString(5, docContent.replace("\r\n", "<br/>").replace("\"", "\'"));

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
}
	//-----------------------------------------------------------------글 지우기--------------------------
	public int deleteDoc(String userEmail, int docNum) {
		String SQL = "update doc set docDelete = 1 where userEmail = ? and docNum = ? ";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setInt(2, docNum);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
}

	//----------------------------------------------------------------Ajax 글 불러오기---------------------------
	public int getDocNum() {
		String SQL = "select count(*) from doc";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getInt(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2;
	}
	
	public static int loadDocListJsonDocNum(int docNum) {
	String SQL = String.format("select * from doc where docNum = %d", docNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(1);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}
	
	public static String loadDocListJsonDocEmail(int docNum) {
		String SQL = String.format("select * from doc where docNum = %d", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(2);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String loadDocListJsonDocName(int docNum) {
		String SQL = String.format("select * from doc where docNum = %d", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(3);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String loadDocListJsonDocTitle(int docNum) {
		String SQL = String.format("select * from doc where docNum = %s", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(4);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String loadDocListJsonDocMakeDate(int docNum) {
		String SQL = String.format("select * from doc where docNum = %s", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(5);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String loadDocListJsonDocContent(int docNum) {
		String SQL = String.format("select * from doc where docNum = %s", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(6);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static int loadDocListJsonDocDelete(int docNum) {
		String SQL = String.format("select * from doc where docNum = %s", docNum);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getInt(7);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2;
	}
	
	public ArrayList<Integer> loadDocList(int loadNum, ArrayList<String> frEmailList, String myUserEmail){
		ArrayList<Integer> docNumList=null;
		String SQL = "";
		String add = "";
		int i;
		for (i=0; i<frEmailList.size();i++) {
			if(i!=frEmailList.size()-1) {
				add += "userEmail = '" + frEmailList.get(i) + "' or ";
			}
			else {
				add += "userEmail = '" + frEmailList.get(i) + "' and ";
			}
		}
		if (frEmailList.size()==0) {
			SQL = "SELECT docNum FROM doc WHERE userEmail = '" + myUserEmail + "' and docDelete = 0 order BY docNum DESC LIMIT "+ loadNum * 8 + ", " + 8;
		}
		else {
			SQL = "SELECT docNum FROM doc WHERE userEmail = '" + myUserEmail + "' or " + add + "docDelete = 0 order BY docNum DESC LIMIT "+ loadNum * 8 + ", " + 8;
		}
		try {
			pstmt = conn.prepareStatement(SQL);
			rs=pstmt.executeQuery();
			docNumList =new ArrayList<Integer>();
			while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
				docNumList.add(rs.getInt(1));
			}
		}catch (Exception e) {
			e.printStackTrace();}
		return docNumList;
	}



//----------------------------------------------------------------Ajax 글 불러오기 끝---------------------------
//----------------------------------------------------------------Ajax 글 상세 창 불러오기---------------------------
public static int loadDocTitleJsonDocNum(int docNum) {
	String SQL = String.format("select * from doc where docNum = %d", docNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(1);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}

public static int loadDocUserNameJsonDocNum(int docNum) {
	String SQL = String.format("select * from doc where docNum = %d", docNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(1);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}

public static int loadDocMakeDateJsonDocNum(int docNum) {
	String SQL = String.format("select * from doc where docNum = %d", docNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(1);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}

public static int loadDocContentJsonDocNum(int docNum) {
	String SQL = String.format("select * from doc where docNum = %d", docNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(1);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}











}
	
/*
 * public int deleteDoc(Doc doc) { String SQL =
 * "delete from doc where docNum = ?"; try { 삭제 버튼을 누르면 글의 docNum을 받아서 넣음 return
 * pstmt.executeUpdate(); } catch (Exception e) { e.printStackTrace(); }
 * 
 * }
 * 
 * public int loadDocList(Doc doc) { String SQL = "select * from doc = ?"; try {
 * 글 버튼을 누르면 글 목록을 DB에서 받아옴 return pstmt.executeUpdate(); } catch (Exception e)
 * { e.printStackTrace(); }
 * 
 * }
 * 
 * public int showDoc(Doc doc) { String SQL =
 * "select * from doc where docNum = ?"; try { 글 목록의 글을 누르면 해당 글의 docNum을 받아서
 * 상세창에 보임 return pstmt.executeUpdate(); } catch (Exception e) {
 * e.printStackTrace(); }
 * 
 * }
 */