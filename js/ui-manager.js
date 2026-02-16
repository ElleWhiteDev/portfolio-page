/**
 * UI Manager Module
 * Handles UI interactions and visual effects
 * @module uiManager
 */

import { CONFIG } from './config.js';
import { safeQuerySelector, safeQuerySelectorAll, addSafeEventListener, delayExecution, addClass, removeClass, toggleClass } from './utils.js';

/**
 * UIManager class for handling UI interactions
 */
export class UIManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
  }

  /**
   * Initializes sound toggle controls
   */
  initializeSoundToggle() {
    const soundToggles = safeQuerySelectorAll(CONFIG.SELECTORS.SOUND_TOGGLE);
    const soundIcons = safeQuerySelectorAll(CONFIG.SELECTORS.SOUND_ICON);

    soundToggles.forEach(toggle => {
      addSafeEventListener(toggle, 'click', () => {
        const newState = !this.audioManager.enabled;
        this.audioManager.setEnabled(newState);
        this.updateSoundToggleUI(soundToggles, soundIcons, newState);
      });
    });

    // Initialize UI state
    this.updateSoundToggleUI(soundToggles, soundIcons, this.audioManager.enabled);
  }

  /**
   * Updates sound toggle UI elements
   * @param {NodeList} toggles - Sound toggle elements
   * @param {NodeList} icons - Sound icon elements
   * @param {boolean} enabled - Whether sound is enabled
   */
  updateSoundToggleUI(toggles, icons, enabled) {
    toggles.forEach(toggle => {
      toggleClass(toggle, CONFIG.CLASSES.IS_MUTED, !enabled);
      toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    });

    icons.forEach(icon => {
      icon.alt = enabled ? 'Sound on' : 'Sound off';
    });

    toggleClass(document.body, CONFIG.CLASSES.SOUND, enabled);
  }

  /**
   * Initializes theme switcher
   */
  initializeThemeSwitcher() {
    const checkbox = safeQuerySelector(CONFIG.SELECTORS.CHECKBOX);
    const checkbox2 = safeQuerySelector(CONFIG.SELECTORS.CHECKBOX2);

    if (!checkbox || !checkbox2) return;

    addSafeEventListener(checkbox, 'change', () => {
      this.audioManager.playSkin();
      toggleClass(document.body, CONFIG.CLASSES.DARK);
      checkbox2.checked = !checkbox2.checked;
    });

    addSafeEventListener(checkbox2, 'change', () => {
      this.audioManager.playSkin();
      toggleClass(document.body, CONFIG.CLASSES.DARK);
      checkbox.checked = !checkbox.checked;
    });
  }

  /**
   * Opens the about section
   */
  openAbout(event) {
    event.preventDefault();
    this.audioManager.playClick();
    this.audioManager.playPaperAboutUp();

    const overlay = safeQuerySelector(CONFIG.SELECTORS.OVERLAY);
    const content = safeQuerySelector(CONFIG.SELECTORS.CONTENT);
    const contentContainer = safeQuerySelector(CONFIG.SELECTORS.CONTENT_CONTAINER);

    delayExecution(CONFIG.ANIMATION.ABOUT_OVERLAY_DELAY, () => {
      addClass(overlay, CONFIG.CLASSES.ACTIVE);
      addClass(contentContainer, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.ABOUT_CONTENT_DELAY, () => {
      addClass(content, CONFIG.CLASSES.ACTIVE);
    });
  }

  /**
   * Closes the about section
   */
  closeAbout() {
    this.audioManager.playClick();

    const overlay = safeQuerySelector(CONFIG.SELECTORS.OVERLAY);
    const content = safeQuerySelector(CONFIG.SELECTORS.CONTENT);
    const contentContainer = safeQuerySelector(CONFIG.SELECTORS.CONTENT_CONTAINER);

    removeClass(content, CONFIG.CLASSES.ACTIVE);

    delayExecution(CONFIG.ANIMATION.ABOUT_CLOSE_DELAY, () => {
      this.audioManager.playPaperAboutDown();
    });

    delayExecution(CONFIG.ANIMATION.ABOUT_CLOSE_DELAY, () => {
      removeClass(overlay, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.ABOUT_CONTAINER_DELAY, () => {
      removeClass(contentContainer, CONFIG.CLASSES.ACTIVE);
    });

    delayExecution(CONFIG.ANIMATION.ABOUT_SCROLL_DELAY, () => {
      const container = document.querySelector('.content-container');
      if (container) {
        container.scrollTop = 0;
      }
    });
  }

  /**
   * Initializes page loader
   */
  initializeLoader() {
    window.addEventListener('load', () => {
      addClass(document.body, CONFIG.CLASSES.LOADED);
      addClass(document.body, CONFIG.CLASSES.SOUND);
    });
  }

  /**
   * Wraps text in animated letter elements
   * @param {Element} element - Element containing text to wrap
   * @param {string} className - Class name for wrapper
   */
  wrapLetters(element, className = 'letter-wrap') {
    if (!element) return;

    const characters = element.textContent.split('');
    const wrappedChars = characters.map(char => `
      <span class="${className}__char">
        <span class="${className}__char-inner" data-letter="${char}">
          ${char}
        </span>
      </span>
    `);

    element.innerHTML = `<span class="${className}__word">${wrappedChars.join('')}</span>`;
  }
}

