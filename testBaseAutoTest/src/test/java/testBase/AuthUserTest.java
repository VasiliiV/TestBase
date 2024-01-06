package testBase;

import io.qameta.allure.Epic;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.SQLException;

import static com.codeborne.selenide.Selenide.*;
import static testBase.AuthUserPage.*;

@Epic("Авторизация")
public class AuthUserTest extends BaseTest {

    @Story("Авторизация нового пользователя")
    @Test()
    public void openSiteAndPerformActions() {
        open(BASE_URL);
        enterUserName();
        enterPassword();
        clickOpen();
        checkValidation();
        clickReg();
        clickOpen();
    }

    @Story("Очистка таблицы User")
    @Test
    public void clearBdUser() throws SQLException {
        try (Connection connection = DBConnection.connect()) {
            deleteAllUsers();
        } // Соединение автоматически закроется благодаря try-with-resources
    }
}