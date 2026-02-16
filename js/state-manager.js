/**
 * State Manager Module
 * Centralized state management with observer pattern
 * Demonstrates: State management, Observer pattern, Event-driven architecture
 * 
 * @module state-manager
 */

import { logger } from './logger.js';

/**
 * StateManager class for centralized application state
 * Implements Observer pattern for reactive state updates
 */
class StateManager {
  /**
   * @private
   * @static
   */
  static instance = null;

  /**
   * @private
   */
  constructor() {
    if (StateManager.instance) {
      return StateManager.instance;
    }

    // Application state
    this.state = {
      currentView: 'home', // 'home', 'portfolio', 'project'
      currentProjectIndex: 0,
      soundEnabled: true,
      theme: 'dark',
      isLoading: true,
      animations: {
        starsActive: false,
        portfolio3DActive: false
      }
    };

    // Observers for state changes
    this.observers = new Map();

    StateManager.instance = this;
    logger.debug('StateManager initialized', this.state);
  }

  /**
   * Get singleton instance
   * @returns {StateManager}
   */
  static getInstance() {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  /**
   * Subscribe to state changes
   * @param {string} key - State key to observe
   * @param {Function} callback - Callback function when state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(key, callback) {
    if (!this.observers.has(key)) {
      this.observers.set(key, new Set());
    }

    this.observers.get(key).add(callback);
    logger.debug(`Subscribed to state key: ${key}`);

    // Return unsubscribe function
    return () => {
      this.observers.get(key)?.delete(callback);
      logger.debug(`Unsubscribed from state key: ${key}`);
    };
  }

  /**
   * Notify observers of state change
   * @private
   * @param {string} key - State key that changed
   * @param {*} newValue - New value
   * @param {*} oldValue - Old value
   */
  notify(key, newValue, oldValue) {
    const observers = this.observers.get(key);
    if (observers) {
      observers.forEach(callback => {
        try {
          callback(newValue, oldValue);
        } catch (error) {
          logger.error(`Error in state observer for ${key}`, error);
        }
      });
    }
  }

  /**
   * Get state value
   * @param {string} key - State key (supports dot notation for nested values)
   * @returns {*} State value
   */
  get(key) {
    const keys = key.split('.');
    let value = this.state;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value;
  }

  /**
   * Set state value
   * @param {string} key - State key (supports dot notation for nested values)
   * @param {*} value - New value
   */
  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let target = this.state;

    // Navigate to nested object
    for (const k of keys) {
      if (!(k in target)) {
        target[k] = {};
      }
      target = target[k];
    }

    const oldValue = target[lastKey];

    // Only update if value changed
    if (oldValue !== value) {
      target[lastKey] = value;
      logger.debug(`State updated: ${key}`, { oldValue, newValue: value });
      this.notify(key, value, oldValue);
    }
  }

  /**
   * Update multiple state values at once
   * @param {Object} updates - Object with key-value pairs to update
   */
  update(updates) {
    Object.entries(updates).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  /**
   * Get entire state (for debugging)
   * @returns {Object} Current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Reset state to initial values
   */
  reset() {
    const oldState = { ...this.state };
    this.state = {
      currentView: 'home',
      currentProjectIndex: 0,
      soundEnabled: true,
      theme: 'dark',
      isLoading: false,
      animations: {
        starsActive: false,
        portfolio3DActive: false
      }
    };
    logger.info('State reset', { oldState, newState: this.state });
  }
}

// Export singleton instance
export const stateManager = StateManager.getInstance();

