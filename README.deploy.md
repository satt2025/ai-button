# Развёртывание AI-Кнопка (без GitHub)

## 1. Требования
- Сервер с Ubuntu/Debian (или любой VPS)
- Установленные Docker и Docker Compose (либо Node.js 18+)

## 2. Подготовка
Скопируйте все файлы в папку `ai-button` на сервере.

```bash
cd /opt
git clone <ваш-локальный-или-scp> ai-button   # или просто перенесите файлы
cd ai-button
```

## 3. Настройка окружения
Скопируйте `.env.example` в `.env` и отредактируйте:

```bash
cp .env.example .env
nano .env
```

Обязательно укажите `AI_API_KEY` (ключ OpenAI или ProxyAPI). При необходимости включите прокси.

## 4. Запуск через Docker (рекомендовано)

```bash
docker-compose up -d --build
```

Сервер будет доступен на порту 3000.

## 5. Запуск без Docker (Node.js)

```bash
npm install
npm start
```

## 6. Настройка Nginx (для продакшена)
Скопируйте `nginx.conf` в `/etc/nginx/sites-available/ai-button`, включите сайт и перезагрузите nginx.

```bash
sudo ln -s /etc/nginx/sites-available/ai-button /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 7. Проверка
Откройте в браузере `http://ваш-сервер:3000`. Должна появиться страница с полем ввода и кнопкой.

## 8. Добавление своих утилит
- Модифицируйте `server.js`, добавив конкретные промпты под ваши утилиты (отзывы, вакансии и т.д.)
- Либо доработайте фронтенд для выбора типа утилиты.

## 9. Переменные для РФ (обход блокировок)
Установите `PROXY_ENABLED=true` и `PROXY_URL` с рабочим прокси (например, http://user:pass@ip:port). Либо используйте сервис-агрегатор типа ProxyAPI, указав их URL как `AI_API_URL`.
