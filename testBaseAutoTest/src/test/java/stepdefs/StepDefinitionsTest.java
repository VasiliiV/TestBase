package stepdefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

public class StepDefinitionsTest {

    @Given("Пользователь находится на главной странице") //TODO надо написать потом тесты
    public void user_on_homepage() {
        // код для перехода на главную страницу
    }

    @When("Пользователь кликает на кнопку входа")
    public void user_clicks_login() {
        // код для клика по кнопке
    }

    @Then("Пользователь видит форму входа")
    public void user_sees_login_form() {
        // проверка наличия формы входа
    }
}