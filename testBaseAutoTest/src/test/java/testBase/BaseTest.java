package testBase;

import ch.qos.logback.classic.Logger;
import io.restassured.RestAssured;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import java.sql.Connection;

public class BaseTest {
    public static final String BASE_URL = "http://localhost:3000";

    protected Connection connection;

    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = BASE_URL; // Инициализация baseURI для REST-assured
        connection = DBConnection.connect();
    }

    @AfterClass
    public void tearDown() {
        if (connection != null) {
            DBConnection.close(connection);
        }
    }
}