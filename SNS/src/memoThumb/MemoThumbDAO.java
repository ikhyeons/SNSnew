package memoThumb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class MemoThumbDAO {
	private static Connection conn;
	private static PreparedStatement pstmt;
	private static ResultSet rs;
	
	public MemoThumbDAO() {
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

	public int doMemoThumb(String userEmail, int memoNum) {
		String SQL = "insert into memoThumb values (?, ?)";
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

	public int delMemoThumb(String userEmail, int memoNum) {
		String SQL = "delete from memoThumb where userEmail = ? and memoNum = ?";
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

	public static int loadMemoThumb(String userEmail, int memoNum) {
		String SQL = "select memoNum from memoThumb where userEmail = ? and memoNum = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setInt(2, memoNum);
			rs = pstmt.executeQuery();
			
			if (rs.next()) {
				return 1; // 내용 있음	
			}
			return 0; // 내용 없음
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}


}