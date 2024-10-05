# OpenJDK runtime as a parent image
FROM openjdk:22
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
