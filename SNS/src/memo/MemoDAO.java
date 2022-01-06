package memo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import memo.Memo;
import user.User;

public class MemoDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public MemoDAO() {
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
	//----------------------------------------------------------메모쓰기---------------------------------
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
	
	public int writeMemo(String userEmail, String memoTitle, String memoContent) {
		String SQL = "insert into memo values (NULL, ?, ?, ?, ?, DEFAULT)";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setString(2, memoTitle);
			pstmt.setString(3, getDate());
			pstmt.setString(4, memoContent.replace("\r\n", "<br/>").replace("\"", "\'"));

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
}
//-----------------------------------------------------------------메모 삭제하기------------------------------------------
	public int deleteMemo(String userEmail, int memoNum) {
		String SQL = "update memo set memoDelete = 1 where userEmail = ? and memoNum = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setInt(2, memoNum);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
}
//------------------------------------------------------------------Ajax 메모 불러오기 -----------------------------------
public int getMemoNum() {
	String SQL = "select count(*) from memo";
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

public static int loadMemoListJsonMemoNum(int memoNum) {
String SQL = String.format("select * from memo where memoNum = %d", memoNum);
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

public static String loadMemoListJsonMemoEmail(int memoNum) {
	String SQL = String.format("select * from memo where memoNum = %d", memoNum);
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


public static String loadMemoListJsonMemoTitle(int memoNum) {
	String SQL = String.format("select * from memo where memoNum = %s", memoNum);
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

public static String loadMemoListJsonMemoMakeDate(int memoNum) {
	String SQL = String.format("select * from memo where memoNum = %s", memoNum);
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

public static String loadMemoListJsonMemoContent(int memoNum) {
	String SQL = String.format("select * from memo where memoNum = %s", memoNum);
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

public static int loadMemoListJsonMemoDelete(int memoNum) {
	String SQL = String.format("select * from memo where memoNum = %s", memoNum);
	try {
		PreparedStatement pstmt = conn.prepareStatement(SQL);
		rs = pstmt.executeQuery();
		if(rs.next())
		return rs.getInt(6);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2;
}

public ArrayList<Integer> loadMemoList(int loadNum, String userEmail){
	ArrayList<Integer> memoNumList=null;
	String SQL = "SELECT memoNum FROM memo WHERE memoDelete = 0 and userEmail = ? order BY memoNum DESC LIMIT "+ loadNum * 8 + ", " + 8;
	try {
		pstmt = conn.prepareStatement(SQL);
		pstmt.setString(1, userEmail);
		rs=pstmt.executeQuery();
		memoNumList =new ArrayList<Integer>();
		while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
			memoNumList.add(rs.getInt(1));
		}
	}catch (Exception e) {
		e.printStackTrace();}
	return memoNumList;
}

//----------------Ajax 메모 상세 창 불러오기------------------------------------
public static int loadMemoTitleJsonMemoNum(int MemoNum) {
	String SQL = String.format("select * from memo where memoNum = %d", MemoNum);
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

public static int loadMemoUserNameJsonMemoNum(int MemoNum) {
	String SQL = String.format("select * from memo where memoNum = %d", MemoNum);
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

public static int loadMemoMakeDateJsonMemoNum(int MemoNum) {
	String SQL = String.format("select * from memo where memoNum = %d", MemoNum);
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

public static int loadMemoContentJsonMemoNum(int MemoNum) {
	String SQL = String.format("select * from memo where memoNum = %d", MemoNum);
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

//----------------------------------------------------------------Ajax 메모 불러오기 끝---------------------------
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