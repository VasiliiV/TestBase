package testBase;

import io.restassured.response.Response;

public interface ApiActions {
    Response postRequest(String url, String body);
    Response getRequest(String url);
    Response deleteRequest(String url);
    Response putRequest(String url, String body);
}
