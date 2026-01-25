FROM mcr.microsoft.com/playwright:v1.43.0-jammy

# Establecer las variables de entorno necesarias para que tzdata no solicite interacción
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Madrid
ENV RUNNING_IN_DOCKER=true

# Instalación de tzdata
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Restablecer la variable de entorno
ENV DEBIAN_FRONTEND=dialog

WORKDIR /END2ENDTESTS
COPY . .
RUN npm ci
CMD [ "npm", "run", "test" ] 