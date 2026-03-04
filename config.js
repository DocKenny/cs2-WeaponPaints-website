const fs = require('fs');
const path = require('path');

// Load defaults from config.json if it exists
let config = {};
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

// Override with environment variables if present
let langValue = process.env.LANG || config.lang || 'en';
// Normalize values like "en_US.UTF-8" -> "en"
if (langValue.includes('.')) {
  langValue = langValue.split('.')[0];
}
if (langValue.includes('_')) {
  langValue = langValue.split('_')[0];
}
config.lang = langValue;
// Provide safe defaults for connect section to avoid template errors
config.connect = config.connect || {
  show: false,
  serverIp: '',
  serverPort: '',
  serverPassword: ''
};
config.PORT = process.env.PORT || config.PORT || 27275;
config.INTERNAL_HOST = process.env.INTERNAL_HOST || config.INTERNAL_HOST || '0.0.0.0';
config.HOST = process.env.HOST || config.HOST || 'localhost';
config.PROTOCOL = process.env.PROTOCOL || config.PROTOCOL || 'http';
config.STEAMAPIKEY = process.env.STEAMAPIKEY || config.STEAMAPIKEY || '';
config.SESSION_SECRET = process.env.SESSION_SECRET || config.SESSION_SECRET || 'super-secret';
config.DB = {
    host: process.env.DB_HOST || config.DB?.host || 'localhost',
    user: process.env.DB_USER || config.DB?.user || 'root',
    password: process.env.DB_PASSWORD || config.DB?.password || '',
    database: process.env.DB_NAME || config.DB?.database || 'weaponpaints',
    port: parseInt(process.env.DB_PORT) || config.DB?.port || 3306
};

module.exports = config;