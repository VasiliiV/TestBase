package testBase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final Logger log = LoggerFactory.getLogger(DBConnection.class);
    private static final String URL = "jdbc:sqlite:/Users/vasilii/Documents/TestBase/my-app/sqlite/parsetags.db";

    public static Connection connect() {
        try {
            Connection conn = DriverManager.getConnection(URL);
            log.info("Соединение с SQLite установлено");
            return conn;
        } catch (SQLException e) {
            log.error("Не удалось подключиться к SQLite", e);
            return null;
        }
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
                log.info("Соединение с SQLite закрыто");
            } catch (SQLException e) {
                log.error("Ошибка при закрытии соединения с SQLite", e);
            }
        }
    }
}
