package testBase;

import com.github.tomakehurst.wiremock.WireMockServer;
import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class WireMockConfig {

    private static WireMockServer wireMockServer = null;

    public static void startWireMock(int port) {
        if (wireMockServer == null) {
            wireMockServer = new WireMockServer(port);
            wireMockServer.start();
            configureFor("localhost", port);
            setupStubs();
            System.out.println("WireMock started on port " + port);
        }
    }

    public static void stopWireMock() {
        if (wireMockServer != null) {
            wireMockServer.stop();
            wireMockServer = null;
            System.out.println("WireMock stopped");
        }
    }

    private static void setupStubs() {
        stubFor(post(urlEqualTo("/api/register_mock"))
                .withRequestBody(containing("name"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"message\": \"User registered successfully\", \"accessToken\": \"dummyToken\"}")));
    }
}