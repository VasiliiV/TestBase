package testBase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final Logger log = LoggerFactory.getLogger(DBConnection.class);

    private static final String[] DIRECT_URL_KEYS = {
            "DATABASE_URL",
            "DATABASE_PUBLIC_URL",
            "POSTGRES_URL",
            "PGURL"
    };
    private static final String[] HOST_KEYS = {
            "PGHOST",
            "POSTGRES_HOST",
            "RAILWAY_PRIVATE_DOMAIN",
            "RAILWAY_TCP_PROXY_DOMAIN"
    };
    private static final String[] PORT_KEYS = {
            "PGPORT",
            "POSTGRES_PORT",
            "RAILWAY_TCP_PROXY_PORT"
    };
    private static final String[] USER_KEYS = { "PGUSER", "POSTGRES_USER" };
    private static final String[] PASSWORD_KEYS = { "PGPASSWORD", "POSTGRES_PASSWORD" };
    private static final String[] DATABASE_KEYS = { "PGDATABASE", "POSTGRES_DB" };

    private static final class DbConfig {
        private final String url;
        private final String user;
        private final String password;
        private final String source;

        private DbConfig(String url, String user, String password, String source) {
            this.url = url;
            this.user = user;
            this.password = password;
            this.source = source;
        }
    }

    public static Connection connect() {
        DbConfig config = buildConfig();
        try {
            Connection conn = createConnection(config);
            log.info("Соединение с PostgreSQL установлено ({})", config.source);
            return conn;
        } catch (SQLException e) {
            log.error("Не удалось подключиться к PostgreSQL", e);
            throw new IllegalStateException("Не удалось подключиться к PostgreSQL", e);
        }
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
                log.info("Соединение с PostgreSQL закрыто");
            } catch (SQLException e) {
                log.error("Ошибка при закрытии соединения с PostgreSQL", e);
            }
        }
    }

    private static Connection createConnection(DbConfig config) throws SQLException {
        if (config.user == null && config.password == null) {
            return DriverManager.getConnection(config.url);
        }
        return DriverManager.getConnection(config.url, config.user, config.password);
    }

    private static DbConfig buildConfig() {
        String sslMode = firstEnv("PGSSLMODE");
        for (String key : DIRECT_URL_KEYS) {
            String value = firstEnv(key);
            if (value != null) {
                String jdbcUrl = normalizeJdbcUrl(value, sslMode);
                return new DbConfig(jdbcUrl, firstEnv(USER_KEYS), firstEnv(PASSWORD_KEYS), "env:" + key);
            }
        }

        String host = firstEnv(HOST_KEYS);
        String port = firstEnv(PORT_KEYS);
        if (port == null || port.isBlank()) {
            port = "5432";
        }
        String user = firstEnv(USER_KEYS);
        String password = firstEnv(PASSWORD_KEYS);
        String database = firstEnv(DATABASE_KEYS);

        if (host == null || user == null || password == null || database == null) {
            throw new IllegalStateException(buildMissingEnvMessage(host, port, user, database));
        }

        String jdbcUrl = normalizeJdbcUrl(
                String.format("jdbc:postgresql://%s:%s/%s", host, port, database),
                sslMode
        );
        return new DbConfig(jdbcUrl, user, password, "env:PGHOST/PGPORT/PGDATABASE");
    }

    private static String normalizeJdbcUrl(String url, String sslMode) {
        String jdbcUrl = url.startsWith("jdbc:") ? url : "jdbc:" + url;
        if (sslMode == null || sslMode.isBlank() || jdbcUrl.contains("sslmode=")) {
            return jdbcUrl;
        }
        String separator = jdbcUrl.contains("?") ? "&" : "?";
        return jdbcUrl + separator + "sslmode=" + URLEncoder.encode(sslMode, StandardCharsets.UTF_8);
    }

    private static String buildMissingEnvMessage(String host, String port, String user, String database) {
        String details = String.format(
                "host=%s, port=%s, user=%s, database=%s",
                host == null ? "not set" : host,
                port == null ? "not set" : port,
                user == null ? "not set" : user,
                database == null ? "not set" : database
        );
        return String.join(" ",
                "PostgreSQL connection is not configured.",
                "Set DATABASE_URL (or DATABASE_PUBLIC_URL / POSTGRES_URL / PGURL) or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.",
                "Current values:",
                details
        );
    }

    private static String firstEnv(String key) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            return null;
        }
        return value;
    }

    private static String firstEnv(String... keys) {
        for (String key : keys) {
            String value = firstEnv(key);
            if (value != null) {
                return value;
            }
        }
        return null;
    }
}
