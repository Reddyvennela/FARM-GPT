// Utility Functions
const storage = {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(key)),
    remove: (key) => localStorage.removeItem(key)
};

// Error Handler
class ErrorHandler {
    static handle(error, context) {
        console.error(`Error in ${context}:`, error);
        alert(`An error occurred in ${context}. Please try again.`);
    }
}

// User Management
class UserManager {
    constructor() {
        this.users = storage.get('users') || [];
        this.currentUser = null;
    }

    register(userData) {
        try {
            if (!this.isValidPhone(userData.phone)) {
                throw new Error('Invalid phone number format');
            }

            if (this.users.some(user => user.phone === userData.phone)) {
                throw new Error('User already exists');
            }

            const newUser = {
                ...userData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                crops: [],
                events: [],
                community: [],
                transactions: []
            };

            this.users.push(newUser);
            storage.save('users', this.users);
            return true;
        } catch (error) {
            ErrorHandler.handle(error, 'Registration');
            return false;
        }
    }

    login(phone, password) {
        try {
            const user = this.users.find(u => u.phone === phone && u.password === password);
            if (user) {
                this.currentUser = user;
                storage.save('currentUser', user);
                return true;
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            ErrorHandler.handle(error, 'Login');
            return false;
        }
    }

    logout() {
        this.currentUser = null;
        storage.remove('currentUser');
        window.location.href = '/';
    }

    isValidPhone(phone) {
        return /^[6-9]\d{9}$/.test(phone);
    }
}

