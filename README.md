# Приложение «Чат»
Учебный проект с курса **Яндекс.Практикума «[Мидл фронтенд-разработчик](https://practicum.yandex.ru/middle-frontend/)»**.

* Макет сделан в **Figma**:  
https://www.figma.com/file/LmdZeTvFQhDjWZRnAcbTjK/

* Приложение написано на языке **Typescript**, в качестве шаблонизатора используется **Handlebars**, для препроцессора стилей выбран **LESS**, а сборщиком проекта выступает **Webpack**.

* Проверка кода происходит с помощью **eslint** на основе правил **AirBnB**. Для стилей используется **Stylelint**.

* Проект частично покрыт unit-тестами с помощью **mocha** (**ts-mocha**) и **chai**.

* Взаимодействие с backend-сервером осуществляется через **REST API** с помощью класса-обертки над **XMLHttpRequest**, а для общения в реальном времени используются **WebSockets**.
  * Описание схемы в **Swagger**:  
  https://ya-praktikum.tech/api/v2/swagger/
  * Описание веб-сокетов:  
  https://ya-praktikum.tech/api/v2/openapi/ws



## Собранное приложение
Собранное приложение лежит на *Netlify*
* https://kaleidoscopic-monstera-69ada2.netlify.app/


Дополнительно сделан **Docker**-образ с простым сервером для раздачи статики и опубликован на аналоге *Heroku* — *Render.com*
* https://messanger-u9n9.onrender.com/

## Собрать проект самостятельно
1. Склонируйте репозиторий
```bash
git clone https://github.com/FTOH/middle.messenger.praktikum.yandex
```
2. Зайдите в папку с проектом
```bash
cd middle.messenger.praktikum.yandex
```
3. Выполните одну из команд для установки зависимостей
```bash
# все зависимости
npm install

# или

# минимально необходимые
npm install --omit dev
```
4. Соберите и запустите проект командой
```bash
npm start
```
