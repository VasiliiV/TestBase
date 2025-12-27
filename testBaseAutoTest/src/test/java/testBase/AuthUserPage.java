package testBase;

import io.qameta.allure.Step;
import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static testBase.DBConnection.connect;

public class AuthUserPage implements AuthActions {

    private static final Logger log = LoggerFactory.getLogger(AuthUserPage.class);

    private static final By USERNAME_BY = By.id("username");
    private static final By PASSWORD_BY = By.id("password");
    private static final By LOGIN_BY = byText("Войти");
    private static final By REG_BY = byText("Регистрация");
    private static final By ERROR_MESSAGE = byText("Имя пользователя или пароль не верны");


    @Override
    @Step("Авторизация пользователя")
    public void loginUser(String nameUser, String passwordUser) {
        $(USERNAME_BY)
                .shouldBe(visible)
                .setValue(nameUser);
        $(PASSWORD_BY)
                .shouldBe(visible)
                .setValue(passwordUser);
        $(LOGIN_BY)
                .click();
    }

    @Override
    @Step("Проверить валидацию для незарегистрированного пользователя")
    public void checkValidation() {
        $(ERROR_MESSAGE)
                .shouldBe(visible.because("Валидация на незарегестрировавшего пользователя не появилась"));
    }

    @Override
    @Step("Нажать кнопку 'Регистрация'")
    public void clickReg() {
        $(REG_BY)
                .shouldBe(visible)
                .click();
    }

    @Step("Удаление всех записей из таблицы user")
    public static void deleteAllUsers() {
        String sql = "DELETE FROM \"user\"";

        try (Connection conn = connect();
             PreparedStatement preparedStatement = conn.prepareStatement(sql)) {

            // Выполнение запроса
            int affectedRows = preparedStatement.executeUpdate();
            log.info("{} строк(и) удалены.", affectedRows);

        } catch (SQLException e) {
            log.error("Ошибка удаления пользователей", e);
        }
    }
}
