import { Chat } from './modules/chat.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация чата
    const chat = new Chat(
        document.getElementById('chatMessages'),
        document.getElementById('messageInput'),
        document.getElementById('sendButton'),
        document.getElementById('clearChat')
    );

    // Обработка ошибок глобально
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        chat.showError('Произошла ошибка. Пожалуйста, обновите страницу.');
    });

    // Сохранение состояния перед закрытием
    window.addEventListener('beforeunload', () => {
        // Состояние уже сохраняется при каждом сообщении
    });
});