package testBase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class BdConnection {

    private static final String URL = "jdbc:sqlite:/Users/vasilii/Documents/TestBase/my-app/sqlite/parsetags.db";

    public static Connection connect() {
        Connection conn = null;
        try {
            // Подключение к базе данных
            conn = DriverManager.getConnection(URL);
            System.out.println("Соединение с SQLite установлено");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                // Закрытие соединения
                conn.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
