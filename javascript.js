export const botResponses = {
    // Каталог обуви
    catalog: {
        sneakers: [
            {
                id: 1,
                name: "Nike Air Max 270",
                price: 12990,
                oldPrice: 15990,
                image: "👟",
                description: "Кроссовки с воздушной подушкой",
                sizes: [39, 40, 41, 42, 43, 44]
            },
            {
                id: 2,
                name: "Adidas Ultraboost",
                price: 14990,
                oldPrice: 17990,
                image: "👟",
                description: "Профессиональные беговые кроссовки",
                sizes: [40, 41, 42, 43, 44, 45]
            }
        ],
        boots: [
            {
                id: 3,
                name: "Timberland Premium",
                price: 18990,
                oldPrice: 21990,
                image: "🥾",
                description: "Классические ботинки",
                sizes: [41, 42, 43, 44, 45]
            }
        ],
        sandals: [
            {
                id: 4,
                name: "Teva Hurricane",
                price: 5990,
                oldPrice: 7990,
                image: "🩴",
                description: "Удобные сандалии для лета",
                sizes: [38, 39, 40, 41, 42]
            }
        ]
    },

    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Приветствие
        if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
            return {
                text: "Привет! Я помогу вам выбрать обувь. Что вас интересует? 👟\n\nНапишите 'каталог' чтобы посмотреть все модели, или выберите категорию:",
                quickReplies: ['Кроссовки', 'Ботинки', 'Сандалии', 'Скидки']
            };
        }
        
        // Каталог
        if (lowerMessage.includes('каталог') || lowerMessage.includes('что есть')) {
            return {
                text: "Вот что у нас есть в наличии:",
                showCatalog: true
            };
        }
        
        // Кроссовки
        if (lowerMessage.includes('кроссовк') || lowerMessage.includes('найк') || lowerMessage.includes('адидас')) {
            return {
                text: "Популярные кроссовки в наличии:",
                category: 'sneakers',
                showProducts: true
            };
        }
        
        // Ботинки
        if (lowerMessage.includes('ботинк') || lowerMessage.includes('тимбер')) {
            return {
                text: "Ботинки в наличии:",
                category: 'boots',
                showProducts: true
            };
        }
        
        // Сандалии
        if (lowerMessage.includes('сандал') || lowerMessage.includes('босонож')) {
            return {
                text: "Сандалии для лета:",
                category: 'sandals',
                showProducts: true
            };
        }
        
        // Размер
        if (lowerMessage.includes('размер') || lowerMessage.includes('как подобрать')) {
            return {
                text: "Чтобы подобрать размер, измерьте длину стопы и сверьтесь с таблицей:\n\n39 - 25 см\n40 - 25.5 см\n41 - 26 см\n42 - 26.5 см\n43 - 27 см\n44 - 27.5 см\n45 - 28 см\n\nКакой размер вас интересует?"
            };
        }
        
        // Скидки
        if (lowerMessage.includes('скидк') || lowerMessage.includes('акци') || lowerMessage.includes('распродаж')) {
            return {
                text: "🔥 Специальные предложения:\n\n• Nike Air Max - скидка 20%\n• Все сандалии - скидка 30%\n• При заказе 2 пар - доставка бесплатно",
                showSale: true
            };
        }
        
        // Доставка
        if (lowerMessage.includes('доставк') || lowerMessage.includes('оплат')) {
            return {
                text: "🚚 Доставка:\n• По городу - 300₽ (1-2 дня)\n• По области - 500₽ (2-3 дня)\n• Бесплатно при заказе от 5000₽\n\n💳 Оплата: наличными или картой при получении"
            };
        }
        
        // Контакты
        if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон')) {
            return {
                text: "📞 Наши контакты:\nТелефон: +7 (999) 123-45-67\nEmail: info@shoebot.ru\nЧасы работы: 9:00 - 21:00"
            };
        }
        
        // Возврат
        if (lowerMessage.includes('возврат') || lowerMessage.includes('обмен')) {
            return {
                text: "Условия возврата:\n• 14 дней на возврат\n• Товар должен быть в идеальном состоянии\n• С чеком и упаковкой\n• Бесплатный обмен размера"
            };
        }
        
        // Заказ
        if (lowerMessage.includes('заказ') || lowerMessage.includes('купить') || lowerMessage.includes('хочу')) {
            return {
                text: "Для оформления заказа напишите:\n1. Ваше имя\n2. Телефон\n3. Модель и размер\n4. Адрес доставки\n\nИли нажмите кнопку 'Оформить заказ'",
                showOrderForm: true
            };
        }
        
        // Помощь
        if (lowerMessage.includes('помощ') || lowerMessage.includes('что ты умеешь')) {
            return {
                text: "Я могу помочь вам:\n• Посмотреть каталог обуви 👟\n• Подобрать размер 📏\n• Узнать о скидках 🔥\n• Оформить заказ 📦\n• Узнать условия доставки 🚚\n\nПросто напишите что вас интересует!"
            };
        }
        
        // Если не поняли
        return {
            text: "Извините, я не совсем понял. Я могу помочь с выбором обуви, размером, заказом или доставкой.\n\nНапишите 'помощь' чтобы узнать что я умею."
        };
    }
};