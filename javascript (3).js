export class Validator {
    static validateMessage(message) {
        if (!message || typeof message !== 'string') {
            return {
                isValid: false,
                error: 'Пожалуйста, введите сообщение'
            };
        }

        const trimmedMessage = message.trim();
        
        if (trimmedMessage.length === 0) {
            return {
                isValid: false,
                error: 'Сообщение не может быть пустым'
            };
        }

        if (trimmedMessage.length > 500) {
            return {
                isValid: false,
                error: 'Сообщение слишком длинное (макс. 500 символов)'
            };
        }

        return {
            isValid: true,
            error: null,
            sanitizedMessage: this.sanitizeMessage(trimmedMessage)
        };
    }

    static validateOrder(orderData) {
        const errors = [];
        
        if (!orderData.name || orderData.name.trim().length < 2) {
            errors.push('Укажите корректное имя');
        }
        
        if (!orderData.phone || !this.validatePhone(orderData.phone)) {
            errors.push('Укажите корректный номер телефона');
        }
        
        if (!orderData.address || orderData.address.trim().length < 5) {
            errors.push('Укажите корректный адрес доставки');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validatePhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    static sanitizeMessage(message) {
        return message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}