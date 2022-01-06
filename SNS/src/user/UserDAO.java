package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public UserDAO() {
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
	public int login(String userEmail, String userPassword) {
		String SQL = "select userPassword from user where userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			rs = pstmt.executeQuery();
			
			if (rs.next()) {
				if(rs.getString(1).equals(userPassword)) 
					return 1; // 로그인 성공
				else
					return 0; // 비밀번호 불일치
			}
			return -1; // 이메일이 없음
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}

public int join(User user) {
	String SQL = "insert into user values (?, ?, ?, ?, ?, '', '')";
	try {
		pstmt = conn.prepareStatement(SQL);
		pstmt.setString(1, user.getUserEmail());
		pstmt.setString(2, user.getUserPassword());
		pstmt.setString(3, user.getUserName());
		pstmt.setString(4, user.getUserBirth());
		pstmt.setString(5, user.getUserGender());
		return pstmt.executeUpdate();
	} catch (Exception e) {
		e.printStackTrace();
	}
	return -2; // 데이터베이스 오류
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

public int changeInfo(String userEmail, String userComment) {
	String SQL = String.format("update user set userComment = '%s', changeProfileDate = '%s' where userEmail = '%s'", userComment, getDate(), userEmail);
	try {
		pstmt = conn.prepareStatement(SQL);

				return pstmt.executeUpdate(); // 수정 성공
		}
			catch (Exception e) {
			e.printStackTrace();
		}
	return -2; // 데이터베이스 오류
}

//----------------------------------------------------------------Ajax 유저정보 불러오기---------------------------
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

	public static String loadMyProfileJsonUserName(String userEmail) {
		String SQL = String.format("select * from user where userEmail = '%s'", userEmail);
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
	
	public static String loadMyProfileJsonUserComment(String userEmail) {
		String SQL = String.format("select * from user where userEmail = '%s'", userEmail);
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
	
	public static String loadMyProfileJsonUserChangeProfileDate(String userEmail) {
		String SQL = String.format("select * from user where userEmail = '%s'", userEmail);
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next())
			return rs.getString(7);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}



}

