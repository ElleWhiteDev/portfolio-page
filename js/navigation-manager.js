/**
 * Navigation Manager Module
 * Handles all navigation and page transitions
 * @module navigationManager
 */

import { CONFIG } from './config.js';
import { safeQuerySelector, delayExecution, addClass, removeClass } from './utils.js';

/**
 * NavigationManager class for handling page navigation
 */
export class NavigationManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.currentProjectIndex = 0;
  }

  /**
   * Opens the portfolio grid from home
   */
  openPortfolio() {
    this.audioManager.playClick();

    const notActiveLayer = safeQuerySelector(CONFIG.SELECTORS.NOT_ACTIVE_LAYER);
    const activeLayer = safeQuerySelector(CONFIG.SELECTORS.ACTIVE_LAYER);
    const home = safeQuerySelector(CONFIG.SELECTORS.HOME);
    const portfolioGrid = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_GRID);

    delayExecution(CONFIG.ANIMATION.TRANSITION_DELAY, () => {
      addClass(home, CONFIG.CLASSES.TO_TOP);
      removeClass(home, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_SWITCH_DELAY, () => {
      addClass(portfolioGrid, CONFIG.CLASSES.ACTIVE);
      removeClass(portfolioGrid, CONFIG.CLASSES.TO_BOTTOM);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_OPACITY_DELAY, () => {
      this.switchLayers(notActiveLayer, activeLayer);
    });

    delayExecution(CONFIG.ANIMATION.PAPER_SOUND_DELAY, () => {
      this.audioManager.playPaper();
    });
  }

  /**
   * Returns to home from portfolio grid
   */
  backToHome() {
    this.audioManager.playClick();

    const notActiveLayer = safeQuerySelector(CONFIG.SELECTORS.NOT_ACTIVE_LAYER);
    const activeLayer = safeQuerySelector(CONFIG.SELECTORS.ACTIVE_LAYER);
    const home = safeQuerySelector(CONFIG.SELECTORS.HOME);
    const portfolioGrid = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_GRID);

    delayExecution(CONFIG.ANIMATION.LAYER_OPACITY_DELAY, () => {
      addClass(portfolioGrid, CONFIG.CLASSES.TO_BOTTOM);
      removeClass(portfolioGrid, CONFIG.CLASSES.ACTIVE);
      this.switchLayers(notActiveLayer, activeLayer, true);
    });

    delayExecution(CONFIG.ANIMATION.HOME_ACTIVATION_DELAY, () => {
      addClass(home, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.PAPER_SOUND_DELAY, () => {
      this.audioManager.playPaper();
      if (portfolioGrid) {
        portfolioGrid.scrollTop = 0;
      }
    });
  }

  /**
   * Opens a specific portfolio item
   * @param {Element} element - The clicked portfolio item
   */
  openPortfolioItem(element) {
    this.audioManager.playClick();

    const items = document.querySelectorAll(CONFIG.SELECTORS.ITEM);
    const index = Array.from(items).indexOf(element) + 1;
    this.currentProjectIndex = index;

    const notActiveLayer = safeQuerySelector(CONFIG.SELECTORS.NOT_ACTIVE_LAYER);
    const activeLayer = safeQuerySelector(CONFIG.SELECTORS.ACTIVE_LAYER);
    const portfolioGrid = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_GRID);

    delayExecution(CONFIG.ANIMATION.TRANSITION_DELAY, () => {
      addClass(portfolioGrid, CONFIG.CLASSES.TO_TOP);
      removeClass(portfolioGrid, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_SWITCH_DELAY, () => {
      this.activateProject(index);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_OPACITY_DELAY, () => {
      this.switchLayers(notActiveLayer, activeLayer);
    });

    delayExecution(CONFIG.ANIMATION.PAPER_SOUND_DELAY, () => {
      this.audioManager.playPaper();
      if (portfolioGrid) {
        portfolioGrid.scrollTop = 0;
      }
    });
  }

  /**
   * Returns to portfolio grid from project detail
   */
  backToPortfolio() {
    this.audioManager.playClick();

    const notActiveLayer = safeQuerySelector(CONFIG.SELECTORS.NOT_ACTIVE_LAYER);
    const activeLayer = safeQuerySelector(CONFIG.SELECTORS.ACTIVE_LAYER);
    const portfolioGrid = safeQuerySelector(CONFIG.SELECTORS.PORTFOLIO_GRID);

    delayExecution(CONFIG.ANIMATION.LAYER_OPACITY_DELAY, () => {
      this.switchLayers(notActiveLayer, activeLayer, true);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_SWITCH_DELAY, () => {
      addClass(portfolioGrid, CONFIG.CLASSES.ACTIVE);
      removeClass(portfolioGrid, CONFIG.CLASSES.TO_TOP);
      this.deactivateAllProjects();
    });

    delayExecution(CONFIG.ANIMATION.PAPER_SOUND_DELAY, () => {
      this.audioManager.playPaper();
    });
  }

  /**
   * Navigates to the previous project
   */
  navigateToPreviousProject() {
    this.navigateToProject(this.currentProjectIndex - 1);
  }

  /**
   * Navigates to the next project
   */
  navigateToNextProject() {
    this.navigateToProject(this.currentProjectIndex + 1);
  }

  /**
   * Navigates to a specific project by index
   * @param {number} targetIndex - The project index to navigate to
   */
  navigateToProject(targetIndex) {
    this.audioManager.playClick();

    const notActiveLayer = safeQuerySelector(CONFIG.SELECTORS.NOT_ACTIVE_LAYER);
    const activeLayer = safeQuerySelector(CONFIG.SELECTORS.ACTIVE_LAYER);
    const currentProject = safeQuerySelector(
      `${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article:nth-child(${this.currentProjectIndex})`
    );
    const targetProject = safeQuerySelector(
      `${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article:nth-child(${targetIndex})`
    );

    if (!targetProject) return;

    const direction = targetIndex > this.currentProjectIndex ? 'bottom' : 'top';

    delayExecution(CONFIG.ANIMATION.TRANSITION_DELAY, () => {
      removeClass(currentProject, CONFIG.CLASSES.ACTIVE);
      addClass(currentProject, direction === 'bottom' ? CONFIG.CLASSES.TO_BOTTOM : CONFIG.CLASSES.TO_TOP);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_SWITCH_DELAY, () => {
      addClass(targetProject, CONFIG.CLASSES.ACTIVE);
      removeClass(targetProject, CONFIG.CLASSES.TO_TOP);
      removeClass(targetProject, CONFIG.CLASSES.TO_BOTTOM);
    });

    delayExecution(CONFIG.ANIMATION.LAYER_OPACITY_DELAY, () => {
      this.switchLayers(notActiveLayer, activeLayer);
    });

    delayExecution(CONFIG.ANIMATION.PAPER_SOUND_DELAY, () => {
      this.audioManager.playPaper();
    });

    this.currentProjectIndex = targetIndex;
  }

  /**
   * Activates a specific project
   * @param {number} index - Project index
   */
  activateProject(index) {
    const project = safeQuerySelector(
      `${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article:nth-child(${index})`
    );
    const prevProject = safeQuerySelector(
      `${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article:nth-child(${index - 1})`
    );
    const nextProject = safeQuerySelector(
      `${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article:nth-child(${index + 1})`
    );

    addClass(project, CONFIG.CLASSES.ACTIVE);
    addClass(prevProject, CONFIG.CLASSES.TO_BOTTOM);
    addClass(nextProject, CONFIG.CLASSES.TO_TOP);
  }

  /**
   * Deactivates all projects
   */
  deactivateAllProjects() {
    const activeProject = safeQuerySelector(`${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article.${CONFIG.CLASSES.ACTIVE}`);
    const topProjects = document.querySelectorAll(`${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article.${CONFIG.CLASSES.TO_TOP}`);
    const bottomProjects = document.querySelectorAll(`${CONFIG.SELECTORS.PORTFOLIO_ITEMS} > article.${CONFIG.CLASSES.TO_BOTTOM}`);

    removeClass(activeProject, CONFIG.CLASSES.ACTIVE);
    topProjects.forEach(project => removeClass(project, CONFIG.CLASSES.TO_TOP));
    bottomProjects.forEach(project => removeClass(project, CONFIG.CLASSES.TO_BOTTOM));
  }

  /**
   * Switches between active and inactive layers
   * @param {Element} notActiveLayer - The currently inactive layer
   * @param {Element} activeLayer - The currently active layer
   * @param {boolean} reverse - Whether to reverse the switch
   */
  switchLayers(notActiveLayer, activeLayer, reverse = false) {
    if (!notActiveLayer || !activeLayer) return;

    if (reverse) {
      removeClass(notActiveLayer, CONFIG.CLASSES.NOT_ACTIVE_LAYER);
      addClass(notActiveLayer, CONFIG.CLASSES.ACTIVE_LAYER);
      addClass(notActiveLayer, CONFIG.CLASSES.OPACITY_0);
      addClass(activeLayer, CONFIG.CLASSES.NOT_ACTIVE_LAYER);
      removeClass(activeLayer, CONFIG.CLASSES.ACTIVE_LAYER);
      removeClass(activeLayer, CONFIG.CLASSES.OPACITY_0);
    } else {
      removeClass(notActiveLayer, CONFIG.CLASSES.NOT_ACTIVE_LAYER);
      addClass(notActiveLayer, CONFIG.CLASSES.ACTIVE_LAYER);
      removeClass(notActiveLayer, CONFIG.CLASSES.OPACITY_0);
      addClass(activeLayer, CONFIG.CLASSES.NOT_ACTIVE_LAYER);
      removeClass(activeLayer, CONFIG.CLASSES.ACTIVE_LAYER);
    }
  }
}
