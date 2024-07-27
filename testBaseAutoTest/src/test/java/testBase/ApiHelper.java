package testBase;

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class ApiHelper implements ApiActions {

    @Override
    public Response postRequest(String url, String body) {
        return given()
                .contentType("application/json")
                .body(body)
                .when()
                .post(url)
                .then()
                .extract()
                .response();
    }

    @Override
    public Response getRequest(String url) {
        return given()
                .contentType(ContentType.JSON)
                .when()
                .get(url)
                .then()
                .extract()
                .response();
    }

    @Override
    public Response deleteRequest(String url) {
        return given()
                .contentType(ContentType.JSON)
                .when()
                .delete(url)
                .then()
                .extract()
                .response();
    }

    @Override
    public Response putRequest(String url, String body) {
        return given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .put(url)
                .then()
                .extract()
                .response();
    }
}