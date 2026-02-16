/**
 * Main Application Entry Point
 * Initializes and coordinates all modules for the portfolio website
 * Demonstrates: Dependency Injection, Singleton pattern, Error boundaries
 *
 * @module main
 * @author Elle White
 * @version 2.0.0
 */

import { AudioManager } from './audio-manager.js';
import { NavigationManager } from './navigation-manager.js';
import { UIManager } from './ui-manager.js';
import { EventHandlerManager } from './event-handlers.js';
import { StarAnimationManager, Portfolio3DAnimationManager } from './animations.js';
import { CONFIG } from './config.js';
import { logger } from './logger.js';
import { stateManager } from './state-manager.js';
import { performanceMonitor } from './performance-monitor.js';

/**
 * PortfolioApp class - Main application controller
 */
class PortfolioApp {
  constructor() {
    this.audioManager = null;
    this.navigationManager = null;
    this.uiManager = null;
    this.eventHandlerManager = null;
    this.starAnimationManager = null;
    this.portfolio3DAnimationManager = null;
  }

  /**
   * Initializes the application
   */
  initialize() {
    performanceMonitor.startMeasure('app-initialization');

    try {
      logger.info('🚀 Portfolio application initializing...');

      // Initialize core managers with dependency injection
      performanceMonitor.startMeasure('managers-init');
      this.audioManager = new AudioManager();
      this.navigationManager = new NavigationManager(this.audioManager);
      this.uiManager = new UIManager(this.audioManager);
      this.eventHandlerManager = new EventHandlerManager(
        this.audioManager,
        this.navigationManager,
        this.uiManager
      );

      // Initialize animation managers
      this.starAnimationManager = new StarAnimationManager();
      this.portfolio3DAnimationManager = new Portfolio3DAnimationManager();
      performanceMonitor.endMeasure('managers-init');

      // Set up the application
      this.setupUI();
      this.setupEventHandlers();
      this.setupStateManagement();
      this.setupAnimations();

      performanceMonitor.endMeasure('app-initialization');
      logger.info('✅ Portfolio application initialized successfully');
      stateManager.set('isLoading', false);

      // Log performance metrics in development
      if (window.location.hostname === 'localhost') {
        setTimeout(() => performanceMonitor.logReport(), 1000);
      }
    } catch (error) {
      logger.error('Failed to initialize portfolio application', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Sets up UI components
   */
  setupUI() {
    logger.debug('Setting up UI components');
    this.uiManager.initializeLoader();
    this.uiManager.initializeSoundToggle();
    this.uiManager.initializeThemeSwitcher();
    this.initializePortfolioButton();
  }

  /**
   * Sets up event handlers
   */
  setupEventHandlers() {
    logger.debug('Setting up event handlers');
    this.eventHandlerManager.initializeAll();
  }

  /**
   * Sets up state management and observers
   * Demonstrates: Observer pattern for reactive state updates
   */
  setupStateManagement() {
    logger.debug('Setting up state management');

    // Subscribe to view changes
    stateManager.subscribe('currentView', (newView, oldView) => {
      logger.info(`View changed: ${oldView} → ${newView}`);
    });

    // Subscribe to sound toggle
    stateManager.subscribe('soundEnabled', (enabled) => {
      logger.info(`Sound ${enabled ? 'enabled' : 'disabled'}`);
      this.audioManager.setEnabled(enabled);
    });

    // Subscribe to theme changes
    stateManager.subscribe('theme', (newTheme) => {
      logger.info(`Theme changed to: ${newTheme}`);
      document.body.className = newTheme;
    });
  }

  /**
   * Sets up animations
   */
  setupAnimations() {
    logger.debug('Setting up animations');
    this.portfolio3DAnimationManager.initialize();
  }

  /**
   * Initializes portfolio button letter animation
   */
  initializePortfolioButton() {
    const letterWrapElements = document.getElementsByClassName('letter-wrap');
    Array.from(letterWrapElements).forEach(element => {
      this.uiManager.wrapLetters(element, 'letter-wrap');
    });
  }

  /**
   * Handles initialization errors gracefully
   * Demonstrates: Error boundaries, graceful degradation
   * @param {Error} error - The error that occurred
   */
  handleInitializationError(error) {
    logger.error('Critical initialization error', error);

    // Display user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff4444;
      color: white;
      padding: 15px 30px;
      border-radius: 5px;
      z-index: 10000;
      font-family: sans-serif;
    `;
    errorMessage.textContent = 'An error occurred while loading the portfolio. Please refresh the page.';
    document.body.appendChild(errorMessage);

    // In production, you might send error to monitoring service
    // this.sendErrorToMonitoring(error);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.initialize();

  // Initialize star animations after a short delay
  setTimeout(() => {
    app.starAnimationManager.initialize();
  }, 500);

  // Make app instance globally available for debugging (development only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioApp = app;
    console.log('Development mode: portfolioApp available in console');
  }
});

/**
 * Handle window resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reinitialize 3D animations on resize
    const app = window.portfolioApp;
    if (app && app.portfolio3DAnimationManager) {
      app.portfolio3DAnimationManager.initialize();
    }
  }, 250);
});

/**
 * Expose global functions for inline event handlers (backward compatibility)
 * These will be removed once HTML is refactored to use event listeners
 */
window.openItem = function(element) {
  const app = window.portfolioApp;
  if (app && app.navigationManager) {
    app.navigationManager.openPortfolioItem(element);
  }
};

window.backToPorfolio = function() {
  const app = window.portfolioApp;
  if (app && app.navigationManager) {
    app.navigationManager.backToPortfolio();
  }
};

window.TopProject = function() {
  const app = window.portfolioApp;
  if (app && app.navigationManager) {
    app.navigationManager.navigateToPreviousProject();
  }
};

window.BottomProject = function() {
  const app = window.portfolioApp;
  if (app && app.navigationManager) {
    app.navigationManager.navigateToNextProject();
  }
};

