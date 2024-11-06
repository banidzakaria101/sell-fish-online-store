FROM openjdk:22

EXPOSE 8088

ADD target/enligne.pod.jar online_fish.jar

ENTRYPOINT ["java", "-jar", "/online_fish.jar"]