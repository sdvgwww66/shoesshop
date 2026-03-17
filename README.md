<div align="center">
  
  # 👟 ShoeBot — Ваш персональный помощник в мире обуви

  [![Telegram Bot](https://img.shields.io/badge/Telegram-Бот-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/your_bot_username)
  [![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?style=for-the-badge&logo=github-pages&logoColor=white)](https://yourusername.github.io/shoe-bot/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
  [![HTML5](https://img.shields.io/badge/HTML5-✓-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-✓-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)

  <img src="https://via.placeholder.com/800x400/1e3c72/ffffff?text=ShoeBot+Telegram+Web+App" alt="ShoeBot Preview" width="80%">

  ### 🤖 Умный бот для выбора и покупки обуви прямо в Telegram

  [👉 Попробовать бота](https://web.telegram.org/a/#8698819848) • 
  [📱 Открыть Web App](https://sdvgwww66.github.io/shoesshop/) • 
  [📖 Документация](#-о-проекте)

</div>

---

## 📱 О проекте

**ShoeBot** — это интерактивный Telegram Web App, который помогает пользователям выбирать обувь, узнавать о скидках и оформлять заказы, не покидая мессенджер. Бот имитирует реальный диалог с консультантом и предоставляет удобный интерфейс для просмотра каталога.

### ✨ Почему ShoeBot?

| | Преимущество | Описание |
|---|--------------|----------|
| 🚀 | **Мгновенный доступ** | Работает прямо в Telegram, не требует установки |
| 💬 | **Живое общение** | Реалистичный диалог с индикацией "печатает" |
| 🎨 | **Красивый дизайн** | Стилизован под Telegram, адаптивен под все устройства |
| 📦 | **Готовый каталог** | Товары с ценами, скидками и размерами |
| 🔒 | **Безопасно** | Валидация данных и защита от XSS |

---

## 🎯 Функциональность

<div align="center">
  
  ### 📸 Скриншоты интерфейса
  
  | Главный экран | Каталог | Оформление заказа |
  |:-------------:|:-------:|:-----------------:|
  | <img src="https://via.placeholder.com/200x400/667eea/ffffff?text=Чат" width="200"> | <img src="https://via.placeholder.com/200x400/764ba2/ffffff?text=Товары" width="200"> | <img src="https://via.placeholder.com/200x400/28a745/ffffff?text=Заказ" width="200"> |

</div>

### 🤝 Как это работает

```mermaid
graph LR
    A[Пользователь в Telegram] --> B{Нажимает кнопку}
    B --> C[Открывается Web App]
    C --> D[Общается с ботом]
    D --> E[Выбирает товар]
    D --> F[Узнает о скидках]
    D --> G[Оформляет заказ]
    E --> H[Данные сохраняются в localStorage]
    G --> H
