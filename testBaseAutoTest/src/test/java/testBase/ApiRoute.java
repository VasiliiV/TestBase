package testBase;

public enum ApiRoute {
    CLICK_BUTTON("/api/click"),
    ANOTHER_ROUTE("/anotherRoute"),
    YET_ANOTHER_ROUTE("/yetAnotherRoute");

    private final String path;

    ApiRoute(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }
}
