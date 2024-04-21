# Приложение-помощник для туризма по Астане

Smartguide - гид-помощник города Астана. Это сервис для свободного входа во все достопримечательности. Smartguide позволяет создать удобный маршрут по изучению нового города и сэкономить до 70% времени. Содержит в себе 34 достопримечательности, а бот хранит в себе 7, по которым можно задать любой интересующий вопрос.

## Этапы запуска проекта

Проект можно скачать в арихивной форме, или через команду

```git
git clone https://github.com/Alimiya/theboys
```

После переходим в нашу папку

```bash
cd theboys
```

Теперь вам нужно будет установить нужные библиотеки

```bash
npm install
```

Можете запустить веб-приложение

```bash
npm start
```

## Нужные файлы для запуска

Вам нужно будет создать файл .env со следующими переменными. Важно помнить, что переменные пишутся без кавычок. Например `PORT = 2500`, вместо `PORT = "2500"`

```env
// Local Port
PORT = Локальный порт для тестирования или разработки
```

```javascript
// fdb/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require("../pfiles/serviceAccessKey.json");
const fauth = require('firebase/auth');
const { initializeApp } = require('firebase/app')

const firebaseConfig = {
    apiKey: "YourAPIKey",
    authDomain: "YourAuthDomain",
    projectId: "YourProjectID",
    storageBucket: "YourStorageBucket",
    messagingSenderId: "YourMessagingSenderID",
    appId: "YourAppID"
  };


const app = initializeApp(firebaseConfig);

const admin_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const fdb = admin.firestore();
const admin_fauth = admin.auth();
const storage = admin.storage().bucket('gs://YourURL');

module.exports = {fdb, admin_fauth, fauth, storage}
```

You have to get your serviceAccessKey from Google.
// pfiles/serviceAccessKey.json

```json
{
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": "",
    "universe_domain": ""
}
```