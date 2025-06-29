FROM maven:3.9-eclipse-temurin-17

WORKDIR /tests

COPY pom.xml ./
COPY src ./src

RUN mvn clean install

CMD ["mvn", "test"]