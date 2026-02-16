/**
 * Logger Module
 * Provides centralized logging with different severity levels
 * Demonstrates: Singleton pattern, professional error tracking
 * 
 * @module logger
 */

/**
 * Log levels for categorizing messages
 * @enum {string}
 */
const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

/**
 * Logger class for centralized logging
 * Implements Singleton pattern for consistent logging across the application
 */
class Logger {
  /**
   * @private
   * @static
   */
  static instance = null;

  /**
   * @private
   */
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    
    this.logs = [];
    this.maxLogs = 100; // Keep last 100 logs in memory
    this.isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    Logger.instance = this;
  }

  /**
   * Get singleton instance
   * @returns {Logger}
   */
  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Format log message with timestamp and level
   * @private
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {*} data - Additional data
   * @returns {Object} Formatted log entry
   */
  formatLog(level, message, data = null) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      url: window.location.href
    };
  }

  /**
   * Add log to history
   * @private
   * @param {Object} logEntry - Formatted log entry
   */
  addToHistory(logEntry) {
    this.logs.push(logEntry);
    
    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  /**
   * Log debug message (only in development)
   * @param {string} message - Debug message
   * @param {*} data - Additional data
   */
  debug(message, data = null) {
    const logEntry = this.formatLog(LogLevel.DEBUG, message, data);
    this.addToHistory(logEntry);
    
    if (this.isDevelopment) {
      console.log(`[${logEntry.timestamp}] 🔍 ${message}`, data || '');
    }
  }

  /**
   * Log info message
   * @param {string} message - Info message
   * @param {*} data - Additional data
   */
  info(message, data = null) {
    const logEntry = this.formatLog(LogLevel.INFO, message, data);
    this.addToHistory(logEntry);
    
    if (this.isDevelopment) {
      console.info(`[${logEntry.timestamp}] ℹ️ ${message}`, data || '');
    }
  }

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {*} data - Additional data
   */
  warn(message, data = null) {
    const logEntry = this.formatLog(LogLevel.WARN, message, data);
    this.addToHistory(logEntry);
    
    console.warn(`[${logEntry.timestamp}] ⚠️ ${message}`, data || '');
  }

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error|*} error - Error object or additional data
   */
  error(message, error = null) {
    const logEntry = this.formatLog(LogLevel.ERROR, message, {
      error: error?.message || error,
      stack: error?.stack
    });
    this.addToHistory(logEntry);
    
    console.error(`[${logEntry.timestamp}] ❌ ${message}`, error || '');
  }

  /**
   * Get all logs
   * @returns {Array} Array of log entries
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Get logs by level
   * @param {string} level - Log level to filter
   * @returns {Array} Filtered log entries
   */
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear all logs
   */
  clear() {
    this.logs = [];
    if (this.isDevelopment) {
      console.clear();
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
export { LogLevel };

