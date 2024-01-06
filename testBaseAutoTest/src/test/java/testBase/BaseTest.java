package testBase;

import ch.qos.logback.classic.Logger;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import java.sql.Connection;

public class BaseTest {
    public static final String BASE_URL = "http://localhost:3000";

    protected Connection connection;
    private Logger log;

    @BeforeClass
    public void beforeClass() {
        connection = DBConnection.connect();
        log.info("Connection status: {}", connection != null ? "Connected" : "Not Connected");
    }

    @AfterClass
    public void afterClass() {
        DBConnection.close(connection);
    }
}
