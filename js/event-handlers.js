/**
 * Event Handlers Module
 * Centralizes all event handler setup
 * @module eventHandlers
 */

import { CONFIG } from './config.js';
import { safeQuerySelector, safeQuerySelectorAll, addSafeEventListener } from './utils.js';

/**
 * EventHandlerManager class for managing all event listeners
 */
export class EventHandlerManager {
  constructor(audioManager, navigationManager, uiManager) {
    this.audioManager = audioManager;
    this.navigationManager = navigationManager;
    this.uiManager = uiManager;
  }

  /**
   * Initializes all event handlers
   */
  initializeAll() {
    this.initializeNavigationHandlers();
    this.initializeHoverSounds();
    this.initializeAboutHandlers();
    this.initializeAudioContextResume();
  }

  /**
   * Initializes navigation-related event handlers
   */
  initializeNavigationHandlers() {
    // Portfolio button
    const portfolioButton = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_BUTTON);
    if (portfolioButton) {
      addSafeEventListener(portfolioButton, 'click', () => {
        this.navigationManager.openPortfolio();
      });
    }

    // Back to home button
    const backHomeButton = safeQuerySelector(CONFIG.SELECTORS.BACK_HOME);
    if (backHomeButton) {
      addSafeEventListener(backHomeButton, 'click', () => {
        this.navigationManager.backToHome();
      });
    }

    // Portfolio items
    const portfolioItems = safeQuerySelectorAll(CONFIG.SELECTORS.ITEM);
    portfolioItems.forEach(item => {
      addSafeEventListener(item, 'click', () => {
        this.navigationManager.openPortfolioItem(item);
      });
    });

    // Back to portfolio buttons
    const backToPortfolioButtons = safeQuerySelectorAll(CONFIG.SELECTORS.BACK_TO_PORTFOLIO);
    backToPortfolioButtons.forEach(button => {
      addSafeEventListener(button, 'click', () => {
        this.navigationManager.backToPortfolio();
      });
    });

    // Project navigation arrows
    const topProjectButtons = safeQuerySelectorAll(CONFIG.SELECTORS.TOP_PROJECT);
    topProjectButtons.forEach(button => {
      addSafeEventListener(button, 'click', () => {
        this.navigationManager.navigateToPreviousProject();
      });
    });

    const bottomProjectButtons = safeQuerySelectorAll(CONFIG.SELECTORS.BOTTOM_PROJECT);
    bottomProjectButtons.forEach(button => {
      addSafeEventListener(button, 'click', () => {
        this.navigationManager.navigateToNextProject();
      });
    });
  }

  /**
   * Initializes hover sound effects
   */
  initializeHoverSounds() {
    // Portfolio button hover
    const portfolioButton = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_BUTTON);
    if (portfolioButton) {
      addSafeEventListener(portfolioButton, 'mouseenter', () => {
        this.audioManager.playHover();
      });
    }

    // Back home button hover
    const backHomeButton = safeQuerySelector(CONFIG.SELECTORS.BACK_HOME);
    if (backHomeButton) {
      addSafeEventListener(backHomeButton, 'mouseenter', () => {
        this.audioManager.playHover();
      });
    }

    // Back to portfolio buttons hover
    const backToPortfolioButtons = safeQuerySelectorAll(CONFIG.SELECTORS.BACK_TO_PORTFOLIO);
    backToPortfolioButtons.forEach(button => {
      addSafeEventListener(button, 'mouseenter', () => {
        this.audioManager.playHover();
      });
    });

    // Arrow buttons hover
    const arrows = safeQuerySelectorAll(`${CONFIG.SELECTORS.TOP_PROJECT}, ${CONFIG.SELECTORS.BOTTOM_PROJECT}`);
    arrows.forEach(arrow => {
      addSafeEventListener(arrow, 'mouseenter', () => {
        this.audioManager.playHover2();
      });
    });

    // Portfolio items hover
    const portfolioItems = safeQuerySelectorAll(CONFIG.SELECTORS.ITEM);
    portfolioItems.forEach(item => {
      addSafeEventListener(item, 'mouseenter', () => {
        this.audioManager.playHover3();
      });
    });

    // Secondary buttons hover
    const secondaryButtons = safeQuerySelectorAll(CONFIG.SELECTORS.BTN_SECONDARY);
    secondaryButtons.forEach(button => {
      addSafeEventListener(button, 'mouseenter', () => {
        this.audioManager.playHover2();
      });
    });
  }

  /**
   * Initializes about section handlers
   */
  initializeAboutHandlers() {
    const aboutButton = safeQuerySelector(CONFIG.SELECTORS.ABOUT_BUTTON);
    if (aboutButton) {
      addSafeEventListener(aboutButton, 'click', (event) => {
        this.uiManager.openAbout(event);
      });
    }

    const closeButton = safeQuerySelector(CONFIG.SELECTORS.CLOSE_ABOUT);
    if (closeButton) {
      addSafeEventListener(closeButton, 'click', () => {
        this.uiManager.closeAbout();
      });
    }
  }

  /**
   * Initializes audio context resume on user interaction
   */
  initializeAudioContextResume() {
    document.addEventListener('click', () => {
      this.audioManager.resumeAudioContext();
    });
  }
}

