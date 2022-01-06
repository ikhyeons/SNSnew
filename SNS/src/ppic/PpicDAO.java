package ppic;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PpicDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public PpicDAO() {
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
	//----------------------------받은 사진의 위치 저장---------------------------
	public int savePpicPath(String userEmail, String path) {
		String SQL = "select * from Ppic where userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				String SQL2 = "UPDATE Ppic SET picAddress = ? WHERE userEmail = ?;";
				try {
					pstmt = conn.prepareStatement(SQL2);
					pstmt.setString(1, path);
					pstmt.setString(2, userEmail);
					return pstmt.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return -2; // 데이터베이스 오류
			}
			else {
				String SQL2 = "insert into Ppic values (?, ?)";
				try {
					pstmt = conn.prepareStatement(SQL2);
					pstmt.setString(1, userEmail);
					pstmt.setString(2, path);
					return pstmt.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return -2; // 데이터베이스 오류
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
		
		
}
//--------------------------------사진 주소 불러오기--------------
	public String loadPpicPath(String userEmail) {
		String SQL = "select picAddress from Ppic where userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return rs.getString(1);
			}
			} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
}
