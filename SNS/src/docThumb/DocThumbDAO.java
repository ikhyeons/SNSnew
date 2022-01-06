package docThumb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DocThumbDAO {
	private static Connection conn;
	private static PreparedStatement pstmt;
	private static ResultSet rs;
	
	public DocThumbDAO() {
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

	public int doDocThumb(String userEmail, int docNum) {
		String SQL = "insert into docThumb values (?, ?)";
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

	public int delDocThumb(String userEmail, int docNum) {
		String SQL = "delete from docThumb where userEmail = ? and docNum = ?";
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

	public static int loadDocThumb(String userEmail, int docNum) {
		String SQL = "select docNum from docThumb where userEmail = ? and docNum = ?";
		try {
				PreparedStatement pstmt = conn.prepareStatement(SQL);
				pstmt.setString(1, userEmail);
				pstmt.setInt(2, docNum);
				rs = pstmt.executeQuery();
				if(rs.next()) {
					return 1;
				}
				return 0;
			} catch (Exception e) {
				e.printStackTrace();
			}
			return -2;
	}


}