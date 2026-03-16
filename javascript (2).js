export class Storage {
    static saveChat(messages) {
        try {
            localStorage.setItem('shoeBotChat', JSON.stringify(messages));
        } catch (error) {
            console.error('Ошибка сохранения чата:', error);
        }
    }

    static loadChat() {
        try {
            const saved = localStorage.getItem('shoeBotChat');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Ошибка загрузки чата:', error);
            return null;
        }
    }

    static saveOrder(order) {
        try {
            const orders = this.getOrders();
            orders.push({
                ...order,
                id: Date.now(),
                date: new Date().toISOString(),
                status: 'new'
            });
            localStorage.setItem('shoeBotOrders', JSON.stringify(orders));
            return true;
        } catch (error) {
            console.error('Ошибка сохранения заказа:', error);
            return false;
        }
    }

    static getOrders() {
        try {
            const orders = localStorage.getItem('shoeBotOrders');
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error('Ошибка загрузки заказов:', error);
            return [];
        }
    }

    static clearChat() {
        localStorage.removeItem('shoeBotChat');
    }

    static saveUserPreferences(prefs) {
        try {
            localStorage.setItem('shoeBotPrefs', JSON.stringify(prefs));
        } catch (error) {
            console.error('Ошибка сохранения настроек:', error);
        }
    }

    static loadUserPreferences() {
        try {
            const prefs = localStorage.getItem('shoeBotPrefs');
            return prefs ? JSON.parse(prefs) : {};
        } catch (error) {
            console.error('Ошибка загрузки настроек:', error);
            return {};
        }
    }
}