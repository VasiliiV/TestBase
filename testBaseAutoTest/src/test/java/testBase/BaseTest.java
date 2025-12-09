package testBase;

import io.qameta.allure.Story;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import java.sql.Connection;
import java.util.Random;

import static io.restassured.RestAssured.given;
import static testBase.ApiRoute.REGISTER;


public class BaseTest {
    public static final String BASE_URL = "http://localhost:3000";
    protected static final Logger log = LoggerFactory.getLogger(BaseTest.class);
    protected String accessToken;
    protected Connection connection;

    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = BASE_URL; // Инициализация baseURI для REST-assured
        connection = DBConnection.connect();
        WireMockConfig.startWireMock(8089); // Запуск WireMock сервера
        regNewUser();
    }

    @Story("Регистрация нового пользователя")
    private void regNewUser() {
        Random random = new Random();
        int nameRandom = random.nextInt(100);
        // %d спецификатор формата, который используется в методе String.format()
        String requestBody = String.format("{\n" +
                "    \"name\": \"%d\",\n" +
                "    \"password\": \"test\"\n" +
                "}", nameRandom);

        Response response = given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post(REGISTER.getPath())
                .then()
                .statusCode(200)
                .extract()
                .response();

        accessToken = response.jsonPath().getString("accessToken");
        log.info("Access token: {}", accessToken);
    }

    @AfterClass
    public void tearDown() {
        if (connection != null) {
            DBConnection.close(connection);
            WireMockConfig.stopWireMock(); // Остановка WireMock сервера
        }
    }
}