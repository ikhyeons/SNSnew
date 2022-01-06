package friend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class FriendDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public FriendDAO() {
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
	//친구 요청 수락
	public int addFriend(String myEmail, String otherUserEmail) {
		String SQL = "insert into friend values (?, ?) ";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, myEmail);
			pstmt.setString(2, otherUserEmail);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	//친구 목록 불러오기
	public ArrayList<String> friendList(String userEmail){
		ArrayList<String> myFriendList=null;
		String SQL = "SELECT otherUserEmail FROM friend WHERE userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			
			rs=pstmt.executeQuery();
			myFriendList =new ArrayList<String>();
			while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
				myFriendList.add(rs.getString(1));
			}
		}catch (Exception e) {
			e.printStackTrace();}
		return myFriendList;
	}

}
