package docRep;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class DocRepDAO {
	private static Connection conn;
	private static PreparedStatement pstmt;
	private static ResultSet rs;
	
	public DocRepDAO() {
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
	//--------------------------------------현 시간 가져오기 ---------------------------------
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
	//--------------------------------------댓글 쓰기 ---------------------------------
	public int writeRep(String userEmail,String repContent, int docNum) {
		String SQL = "insert into reply values (?, NULL, ?, ?, ?, DEFAULT)";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, docNum);
			pstmt.setString(2, userEmail);
			System.out.printf("%s", getDate());
			pstmt.setString(3, getDate());
			pstmt.setString(4, repContent.replace("\r\n", "<br/>").replace("\"", "\'"));

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	//--------------------------------------댓글 지우기--------------------------------------
	public static int deleteRep(String userEmail, int repNum) {
		String SQL = "update reply set repDelete = 1 where repNum = ? and userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, repNum);
			pstmt.setString(2, userEmail);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	//--------------------------------------댓글 번호 불러오기 ---------------------------------
	public ArrayList<Integer> loadDocRepList(int docNum){
		ArrayList<Integer> repNumList=null;
		String SQL = "SELECT repNum FROM reply WHERE repDelete = 0 and docNum = ? order BY docNum DESC";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, docNum);
			rs=pstmt.executeQuery();
			repNumList =new ArrayList<Integer>();
			while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
				repNumList.add(rs.getInt(1));
			}
		}catch (Exception e) {
			e.printStackTrace();}
		return repNumList;
	}
	
	
	//--------------------------------------댓글 내용 가져오기 ---------------------------------
	public static String loadDocListJsonRepUserEmail(int repNum) {
		String SQL = String.format("select * from reply where repNum = %d", repNum);
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
		
		public static String loadDocListJsonRepDate(int repNum) {
			String SQL = String.format("select * from reply where repNum = %d", repNum);
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
		
		public static String loadDocListJsonRepContent(int repNum) {
			String SQL = String.format("select * from reply where repNum = %d", repNum);
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
		
	
}
