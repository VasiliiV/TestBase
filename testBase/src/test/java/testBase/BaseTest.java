package testBase;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.selector.ByText;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.*;

public class BaseTest {
    @Test
    public void openSite() {
        open("http://localhost:3000");
        $$x("//input[@type='checkbox']")
                .forEach(element -> element.click());
        $$x("//input[@type='text']")
                .get(0)
                .sendKeys("Vasiliy32");
        $$x("//input[@type='text']")
                .get(1)
                .sendKeys("32");
        $(byText("Сохранить"))
                .click();
        $(byText("Показать имя"))
                .shouldBe(visible.because("Не отображается кнопка"))
                .click();
        sleep(1000);
    }
}

