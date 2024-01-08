package testBase;

import io.qameta.allure.Allure;
import io.qameta.allure.Epic;
import io.qameta.allure.Story;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static com.codeborne.selenide.Selenide.*;
import static testBase.ApiRoute.*;
import static testBase.AuthUserPage.*;

@Epic("Авторизация")
public class AuthUserTest extends BaseTest {

    //тест интерфейса
    @Story("Авторизация нового пользователя")
    @Test(priority = 1)
    public void openSiteAndPerformActions() {
        open(BASE_URL);
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

    //тест апи запроса
    @Story("Тест API запроса на добавление пользователя в блоке ввода имени и возраста")
    @Test(priority = 3)
    public void clickButtonTest() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{\"age\":\"\", \"name\":\"\"}")
                .when()
                .post(CLICK_BUTTON.getPath())
                .thenReturn();

        response.then().statusCode(200);
        Allure.addAttachment("Response Body", "text/plain", response.getBody().asString());
    }
}
