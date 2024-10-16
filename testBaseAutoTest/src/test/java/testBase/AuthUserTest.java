package testBase;

import io.qameta.allure.Allure;
import io.qameta.allure.Epic;
import io.qameta.allure.Story;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.Random;

import static io.restassured.RestAssured.given;
import static testBase.ApiRoute.*;
import static testBase.AuthUserPage.*;
import static com.codeborne.selenide.Selenide.*;

@Epic("Авторизация")
public class AuthUserTest extends BaseTest {

    private AuthUserPage authUserPage;
    private ApiActions apiHelper;
    private String uniqueName;
    private String uniquePassword;
    private String accessToken;

    @BeforeClass
    public void beforeClass() {
        authUserPage = new AuthUserPage();
        apiHelper = new ApiHelper();
        Random random = new Random();
        uniqueName = "User" + random.nextInt(100000);
        uniquePassword = "Pass" + random.nextInt(100000);
    }

    @Story("Авторизация нового пользователя")
    @Test(priority = 1, enabled = false)
    public void openSiteAndPerformActions() {
        open(BASE_URL);
        authUserPage.loginUser(uniqueName, uniquePassword);
        authUserPage.checkValidation();
        authUserPage.clickReg();
    }

    @Story("Очистка таблицы User")
    @Test(priority = 2)
    public void clearBdUser() {
        deleteAllUsers();
    }

    @Story("Регистрация нового пользователя")
    @Test(groups = {"api"}, priority = 3)
    public void regNewUser() {
        Allure.step("Отпрвка запроса на регистрацию нового пользователя", () -> {
            String bodyRequest = "{\n" +
                    "    \"name\" : \"" + uniqueName + "\", \n" +
                    "    \"password\" : \"" + uniquePassword + "\"\n" +
                    "}";
            Response response = apiHelper.postRequest(REGISTER.getPath(), bodyRequest);
            response.then().statusCode(200);

            accessToken = response.jsonPath().getString("accessToken");
            log.info(accessToken);
            Allure.addAttachment("Request", bodyRequest);
            Allure.addAttachment("Response", response.asString());
        });
    }

    @Story("Тест API запроса на добавление пользователя в блоке ввода имени и возраста")
    @Test(priority = 4, groups = {"api"})
    public void clickButtonTest() {
        Allure.step("Отправка запроса на добавление пользователя", () -> {
            String body = "{\"age\":\"\", \"name\":\"\"}";

            Allure.addAttachment("Request Body", body);

            Response response = given()
                    .contentType(ContentType.JSON)
                    .body(body)
                    .auth().preemptive().oauth2(accessToken)
                    .when()
                    .post(CLICK_BUTTON.getPath())
                    .thenReturn();

            Allure.step("Проверка, что ответ содержит статус 200", () -> {
                response.then().statusCode(200);
            });

            Allure.addAttachment("Response Body", "text/plain", response.getBody().asString());
        });
    }

    @Story("Регистрация нового пользователя через WireMock")
    @Test(groups = {"api"}, priority = 5)
    public void regNewUserWithWireMock() {
        Allure.step("Отправка запроса через WireMock для регистрации пользователя", () -> {
            String body = "{\n" +
                    "    \"name\" : \"mockUser\", \n" +
                    "    \"password\" : \"mockPassword\"\n" +
                    "}";

            Allure.addAttachment("Request Body", body);

            Response response = apiHelper.postRequest("http://localhost:8089/api/register_mock", body);

            Allure.step("Проверка, что ответ содержит статус 200", () -> {
                response.then().statusCode(200);
            });

            String accessTokenMock = response.jsonPath().getString("accessToken");
            log.info("Access Token from Mock: " + accessTokenMock);
            Allure.addAttachment("Access Token from Mock", accessTokenMock);

            Allure.addAttachment("Response Body from Mock", "text/plain", response.getBody().asString());
        });
    }
}
