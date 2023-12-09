package testBase;

import io.qameta.allure.Step;
import org.openqa.selenium.By;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static testBase.BdConnection.connect;

public class AuthUserPage {

    @Step
    public static void clickOpen() {
        $(byText("Войти")).click();
    }

    @Step
    public static void enterUserName() {
        $(By.id("username"))
                .shouldBe(visible)
                .setValue("Vasiliy32");
    }

    @Step
    public static void enterPassword() {
        $(By.id("password"))
                .shouldBe(visible)
                .setValue("32");
    }

    @Step
    public static void checkValidation() {
        $(byText("Имя пользователя или пароль не верны"))
                .shouldBe(visible.because("Валидация на не зарегестируровавшего полтзователя не поиявилась"));
    }

    @Step
    public static void clickReg() {
        $(byText("Регистрация"))
                .shouldBe(visible)
                .click();
    }

    @Step
    public static void deleteAllUsers() {
        String sql = "DELETE FROM user";

        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Выполнение запроса
            int affectedRows = pstmt.executeUpdate();
            System.out.println(affectedRows + " строк удалены.");

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
