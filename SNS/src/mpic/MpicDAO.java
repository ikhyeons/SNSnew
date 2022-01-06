package mpic;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class MpicDAO {
	
	private static Connection conn;
	private PreparedStatement pstmt;
	private static ResultSet rs;
	
	public MpicDAO() {
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
	//----------------이미지 저장하기-----------------
	public int saveMpicPath(int memoNum, int picSequence, String path) {
		String SQL = "insert into Mpic values(?, ?, ?);";
				try {
					pstmt = conn.prepareStatement(SQL);
					pstmt.setInt(1, memoNum);
					pstmt.setInt(2, picSequence);
					pstmt.setString(3, path);
					return pstmt.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return -2; // 데이터베이스 오류
	}
	//-------------------이미지 리스트 불러오기 -----------
		public ArrayList<String> mpicPathList(int memoNum) {
			ArrayList<String> mpicPathList=null;
			String SQL = "select picAddress from Mpic where memoNum = ?";
					try {
						pstmt = conn.prepareStatement(SQL);
						pstmt.setInt(1, memoNum);
						rs = pstmt.executeQuery();
						mpicPathList =new ArrayList<String>();
						while(rs.next()) {//모든 게시글이 존재할 때 마다 리스트에 담김
							mpicPathList.add(rs.getString(1));
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					return mpicPathList;
		}
	
}
