# Usar Node 20 oficial (Debian Bookworm)
FROM node:20-bookworm

# Establecer las variables de entorno necesarias para que tzdata no solicite interacción
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Madrid
ENV RUNNING_IN_DOCKER=true

# Instalación de dependencias del sistema, xvfb y Playwright
RUN apt-get update && \
    apt-get install -y tzdata xvfb && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Restablecer la variable de entorno
ENV DEBIAN_FRONTEND=dialog

# Directorio de trabajo
WORKDIR /END2ENDTESTS

# Copiar package files para cachear instalación
COPY package*.json ./

# Instalar dependencias Node
RUN npm ci

# Instalar navegadores Playwright (versión del package.json)
RUN npx playwright install --with-deps

# Copiar resto del código
COPY . .

# Comando por defecto con xvfb para browsers headless
CMD [ "xvfb-run", "--auto-servernum", "--server-args=-screen 0 1280x960x24", "npm", "run", "test" ] 