package testBase;

import io.qameta.allure.Allure;
import io.qameta.allure.Epic;
import io.qameta.allure.Story;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static testBase.ApiRoute.*;
import static testBase.AuthUserPage.*;

@Epic("Авторизация")
public class AuthUserTest  {

    static String accessToken;

    //тест интерфейса
    @Story("Авторизация нового пользователя")
    @Test(priority = 1, enabled = false)
    public void openSiteAndPerformActions() {

        enterUserName();
        enterPassword();
        clickOpen();
        checkValidation();
        clickReg();
        clickOpen();
    }

    //тест базы данных
    @Story("Очистка таблицы User")
    @Test(priority = 2)
    public void clearBdUser() {
        deleteAllUsers();
    }

    @Story("Регистрация нового пользователя")
    @Test(groups = {"api"}, priority = 3, enabled = false)
    public void regNewUser() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{\n" +
                        "    \"name\" : 777, \n" +
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

    //тест апи запроса
    @Story("Тест API запроса на добавление пользователя в блоке ввода имени и возраста")
    @Test(priority = 4,groups = {"api"}, enabled = false)
    public void clickButtonTest() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{\"age\":\"\", \"name\":\"\"}")
                .auth().preemptive().oauth2(accessToken)
                .when()
                .post(CLICK_BUTTON.getPath())
                .thenReturn();

        response.then().statusCode(200);
        Allure.addAttachment("Response Body", "text/plain", response.getBody().asString());
    }

    @Story("Регистрация нового пользователя через WireMock")
    @Test(groups = {"api"}, priority = 5)
    public void regNewUserWithWireMock() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{\n" +
                        "    \"name\" : \"mockUser\", \n" +
                        "    \"password\" : \"mockPassword\"\n" +
                        "}")
                .when()
                .post("http://localhost:8089/api/register_mock") // URL к WireMock
                .then()
                .statusCode(200)
                .extract()
                .response();

        String accessTokenMock = response.jsonPath().getString("accessToken");
        System.out.println("Access Token from Mock: " + accessTokenMock);
        Allure.addAttachment("Response Body from Mock", "text/plain", response.getBody().asString());
    }
}