# ---------- 1-bosqich: build ----------
FROM node:22-alpine AS build

WORKDIR /app

# Avval faqat bog'liqliklar — kod o'zgarganda bu qatlam keshdan olinadi
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- 2-bosqich: nginx ----------
FROM nginx:1.27-alpine AS runtime

# O'z sozlamamiz standart konfigni almashtiradi
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=4s --start-period=5s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
