package testBase;

import com.codeborne.selenide.SelenideElement;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.*;

public class BaseTest {

    private static final String BASE_URL = "http://localhost:3000";

    @Test
    public void openSiteAndPerformActions() {
        open(BASE_URL);

        // Отмечаем все чекбоксы
        $$("input[type='checkbox']").forEach(SelenideElement::click);

        // Вводим данные в текстовые поля
        $$("input[type='text']").get(0).setValue("Vasiliy32");
        $$("input[type='text']").get(1).setValue("32");

        // Нажимаем кнопку сохранения
        $("button:contains('Сохранить')").click();

        // Проверяем наличие и нажимаем кнопку "Показать имя"
        $("button:contains('Показать имя')").shouldBe(visible.because("Кнопка 'Показать имя' не отображается")).click();
    }
}


