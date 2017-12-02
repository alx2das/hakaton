# ModulBank.Kassa

Frontend приложение Modulbank.Kassa.

Сайт поделен на два приложения, index и signin:

* `index` - основное приложение, работа внутри личного кабиента 
* `signin` - отвечает за авторизацию, регистрацию и раздел "забыли пароль"

Чтобы сайт корректно работал с двумя приложениями необходимо настроить nginx, пример конфигурации можно найти ниже

## Компоненты приложения

* React 15.6
* React-router
* Redux 3.3
* Redux-Saga
* Immutable
* React-router 4.1

## Локальный запуск приложения

Приложению требуются фирменные стили которые расположенны в других рипозиторих, поэтому требуется клоноривание нескольких репозиториев на один уровень.

### Клонирование и установка зависимостей

Для это необходимо создать пустую директорию, например `modulbank.kassa`

```sh
cd modulbank.kassa/
git clone https://github.com/brcportal2/Modulbank.Kassa.git
git clone https://github.com/brcportal2/Markup.Kassa.git
git clone https://github.com/brcportal2/Markup.Common.git
cd Modulbank.Kassa/
npm install
```

### Файл .hosts

В зависимости от Вашей ОС файл с настройками может быть расположен в разных местах.

Для локального запуска должно быть установенно значение

```sh
127.0.0.1 react.modulbank.ru
```

### Настройки Nginx

```sh
# ...
http {
    # ...
    server {
        listen 80;
        server_name  react.modulbank.ru;
        set $my_host "react.modulbank.ru";
        
        location / {
            proxy_pass http://react.modulbank.ru:3000;
            port_in_redirect off;
            proxy_cache off;
            add_header Cache-controll no-cache;
        }
        
        location /api {
            #proxy_pass https://dev.example.com;
            #proxy_cookie_domain dev.example.com $http_host;            
        
            port_in_redirect off;
            add_header Access-Control-Allow-Origin $cors_header;
            client_max_body_size 100m;
            proxy_buffering off;
            proxy_connect_timeout 600;
            proxy_send_timeout 600;
            proxy_read_timeout 600;
            keepalive_timeout 30;
            send_timeout 600;
        }
    }
    # ...
}
```

`dev.example.com` - заменить на действительный адрес API.

### Запуск режима разработки

```sh
npm start
```

## Build (production)

Сборка будет размещена в папке `build`.

```sh
npm run build
```