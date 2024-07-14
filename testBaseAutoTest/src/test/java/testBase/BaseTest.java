package testBase;

import ch.qos.logback.classic.Logger;
import io.qameta.allure.Story;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.sql.Connection;

import static io.restassured.RestAssured.given;
import static testBase.ApiRoute.REGISTER;

public class BaseTest {
    public static final String BASE_URL = "http://localhost:3000";
    static String accessToken;
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
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{\n" +
                        "    \"name\" : 778, \n" +
                        "    \"password\" : \"test\"\n" +
                        "}")
                .when()
                .post(REGISTER.getPath())
                .then()
                .statusCode(200)
                .extract()
                .response();

        accessToken = response.jsonPath().getString("accessToken");
        System.out.println(accessToken);
    }

    @AfterClass
    public void tearDown() {
        if (connection != null) {
            DBConnection.close(connection);
            WireMockConfig.stopWireMock(); // Остановка WireMock сервера
        }
    }
}