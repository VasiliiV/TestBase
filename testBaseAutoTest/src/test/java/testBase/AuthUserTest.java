package testBase;

import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

import java.sql.Connection;

import static com.codeborne.selenide.Selenide.*;
import static testBase.AuthUserPage.*;

public class AuthUserTest {

    private static final String BASE_URL = "http://localhost:3000";
    private Connection connection;

    //@Test()
    @Story("Очистка таблицы User")
    public void clearBdUser() {
        connection = BdConnection.connect();
        deleteAllUsers();
        BdConnection.close(connection);
    }

    @Test
    public void openSiteAndPerformActions() {
        open(BASE_URL);
        enterUserName();
        enterPassword();
        clickOpen();
        checkValidation();
        clickReg();
        clickOpen();
    }
}


