import { Validator } from '../utils/validation.js';
import { botResponses } from './botResponses.js';
import { Storage } from './storage.js';

export class Chat {
    constructor(messageContainer, inputElement, sendButton, clearButton) {
        this.messageContainer = messageContainer;
        this.inputElement = inputElement;
        this.sendButton = sendButton;
        this.clearButton = clearButton;
        
        this.isTyping = false;
        this.messages = [];
        
        this.init();
    }

    init() {
        this.loadMessages();
        this.setupEventListeners();
        this.setupQuickReplies();
    }

    setupEventListeners() {
        // Отправка по кнопке
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Отправка по Enter (но не с Shift)
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Очистка чата
        this.clearButton.addEventListener('click', () => {
            this.clearChat();
        });

        // Автоматическое изменение высоты textarea
        this.inputElement.addEventListener('input', () => {
            this.inputElement.style.height = 'auto';
            this.inputElement.style.height = this.inputElement.scrollHeight + 'px';
        });
    }

    setupQuickReplies() {
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.handleQuickReply(category);
            });
        });
    }

    async sendMessage() {
        const message = this.inputElement.value;
        
        // Валидация
        const validation = Validator.validateMessage(message);
        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        // Очищаем поле ввода
        this.inputElement.value = '';
        this.inputElement.style.height = 'auto';

        // Добавляем сообщение пользователя
        this.addMessage(validation.sanitizedMessage, 'user');
        
        // Блокируем ввод
        this.setInputEnabled(false);
        
        // Показываем индикатор печати
        await this.showTypingIndicator();
        
        // Получаем ответ от бота
        try {
            const response = await this.getBotResponse(validation.sanitizedMessage);
            this.addMessage(response.text, 'bot');
            
            // Показываем дополнительные элементы если нужно
            if (response.showCatalog) {
                this.showCatalog();
            } else if (response.category) {
                this.showProducts(response.category);
            } else if (response.quickReplies) {
                this.showQuickReplies(response.quickReplies);
            } else if (response.showOrderForm) {
                this.showOrderForm();
            } else if (response.showSale) {
                this.showSaleItems();
            }
            
        } catch (error) {
            this.showError('Ошибка получения ответа от бота');
            console.error(error);
        }
        
        // Разблокируем ввод
        this.setInputEnabled(true);
    }

    async getBotResponse(message) {
        // Имитация задержки ответа от сервера
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Используем fetch для получения ответа (имитация API)
        try {
            // В реальном проекте здесь был бы запрос к API
            // const response = await fetch('/api/bot', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ message })
            // });
            // const data = await response.json();
            // return data;
            
            // Пока используем локальные ответы
            return botResponses.getResponse(message);
            
        } catch (error) {
            console.error('Ошибка API:', error);
            return {
                text: "Извините, возникла ошибка. Попробуйте позже."
            };
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        
        this.messageContainer.appendChild(messageDiv);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        
        // Сохраняем сообщение
        this.messages.push({ text, sender, timestamp: Date.now() });
        Storage.saveChat(this.messages);
    }

    async showTypingIndicator() {
        this.isTyping = true;
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        
        this.messageContainer.appendChild(indicator);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        
        // Ждем случайное время (1-3 секунды)
        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        indicator.remove();
        this.isTyping = false;
    }

    showCatalog() {
        Object.keys(botResponses.catalog).forEach(category => {
            this.showProducts(category);
        });
    }

    showProducts(category) {
        const products = botResponses.catalog[category];
        if (!products) return;
        
        products.forEach(product => {
            const card = this.createProductCard(product);
            this.messageContainer.appendChild(card);
        });
        
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const discount = product.oldPrice ? 
            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div style="flex: 1;">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div>
                    <span class="product-price">${product.price}₽</span>
                    ${product.oldPrice ? 
                        `<span class="old-price">${product.oldPrice}₽</span>
                         <span class="discount-badge">-${discount}%</span>` 
                        : ''}
                </div>
                <div class="sizes">
                    ${product.sizes.map(size => 
                        `<button class="size-btn" data-size="${size}">${size}</button>`
                    ).join('')}
                </div>
                <button class="buy-btn" data-product='${JSON.stringify(product)}'>
                    Купить
                </button>
            </div>
        `;
        
        // Добавляем обработчики
        card.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.classList.toggle('selected');
            });
        });
        
        card.querySelector('.buy-btn').addEventListener('click', (e) => {
            const productData = JSON.parse(e.target.dataset.product);
            this.startOrder(productData);
        });
        
        return card;
    }

    showQuickReplies(replies) {
        const container = document.createElement('div');
        container.className = 'quick-replies';
        
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = reply;
            btn.addEventListener('click', () => {
                this.inputElement.value = reply;
                this.sendMessage();
            });
            container.appendChild(btn);
        });
        
        this.messageContainer.appendChild(container);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    showOrderForm() {
        const form = document.createElement('div');
        form.className = 'order-form';
        form.innerHTML = `
            <h4>Оформление заказа</h4>
            <input type="text" id="orderName" placeholder="Ваше имя" required>
            <input type="tel" id="orderPhone" placeholder="Телефон" required>
            <input type="text" id="orderAddress" placeholder="Адрес доставки" required>
            <input type="text" id="orderProduct" placeholder="Модель и размер">
            <button id="submitOrder">Оформить заказ</button>
        `;
        
        form.querySelector('#submitOrder').addEventListener('click', () => {
            this.submitOrder(form);
        });
        
        this.messageContainer.appendChild(form);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    submitOrder(form) {
        const orderData = {
            name: form.querySelector('#orderName').value,
            phone: form.querySelector('#orderPhone').value,
            address: form.querySelector('#orderAddress').value,
            product: form.querySelector('#orderProduct').value
        };
        
        const validation = Validator.validateOrder(orderData);
        
        if (validation.isValid) {
            if (Storage.saveOrder(orderData)) {
                this.addMessage('✅ Заказ оформлен! Мы свяжемся с вами для подтверждения.', 'bot');
                form.remove();
            } else {
                this.showError('Ошибка при оформлении заказа');
            }
        } else {
            this.showError(validation.errors.join(', '));
        }
    }

    startOrder(product) {
        this.inputElement.value = `Хочу заказать ${product.name}`;
        this.sendMessage();
    }

    showSaleItems() {
        // Показываем товары со скидкой
        this.showProducts('sneakers');
        this.showProducts('sandals');
    }

    setInputEnabled(enabled) {
        this.inputElement.disabled = !enabled;
        this.sendButton.disabled = !enabled;
    }

    clearChat() {
        this.messageContainer.innerHTML = '';
        this.messages = [];
        Storage.clearChat();
        
        // Добавляем приветственное сообщение
        setTimeout(() => {
            this.addMessage('Привет! Я бот-помощник по подбору обуви. 👟\n\nЧем могу помочь?', 'bot');
            this.showQuickReplies(['Каталог', 'Скидки', 'Доставка', 'Помощь']);
        }, 100);
    }

    loadMessages() {
        const saved = Storage.loadChat();
        if (saved && saved.length > 0) {
            this.messages = saved;
            this.messages.forEach(msg => {
                this.addMessage(msg.text, msg.sender);
            });
        } else {
            // Приветственное сообщение при первом запуске
            this.addMessage('Привет! Я бот-помощник по подбору обуви. 👟\n\nЧем могу помочь?', 'bot');
            this.showQuickReplies(['Каталог', 'Скидки', 'Доставка', 'Помощь']);
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        this.messageContainer.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    handleQuickReply(category) {
        const messages = {
            'sneakers': 'Покажи кроссовки',
            'boots': 'Покажи ботинки',
            'sandals': 'Покажи сандалии',
            'sale': 'Что по скидкам?'
        };
        
        this.inputElement.value = messages[category] || category;
        this.sendMessage();
    }
}