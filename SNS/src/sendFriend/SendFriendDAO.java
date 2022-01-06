package sendFriend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class SendFriendDAO {
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public SendFriendDAO() {
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
	//------------------------상대방에게 친구를 신청함------------------------------------
	public int askFriend(String askuserEmail, String askedUserEmail) {
		String SQL = "insert into sendFriend values (?, ?) ";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, askuserEmail);
			pstmt.setString(2, askedUserEmail);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	//------------------------처리된 신청을 삭제함------------------------------------
	public int delSendFriend(String myEmail, String targetEmail) {
		String SQL = "delete from sendFriend where askUserEmail = ? and askedUserEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, targetEmail);
			pstmt.setString(2, myEmail);

			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	//------------------------내게 친구신청한 목록을 가져옴------------------------------------
	public ArrayList<String> loadAskFriendList(String myEmail){
		ArrayList<String> askFriendList=null;
		String SQL = "SELECT askUserEmail FROM sendFriend WHERE askedUserEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, myEmail);
			rs=pstmt.executeQuery();
			askFriendList =new ArrayList<String>();
			while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
				askFriendList.add(rs.getString(1));
			}
		}catch (Exception e) {
			e.printStackTrace();}
		return askFriendList;
	}
	
	
	
}
