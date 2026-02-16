/**
 * Portfolio Configuration Module
 * Centralizes all configuration constants and settings
 * @module config
 */

export const CONFIG = {
  // Animation timing constants (in milliseconds)
  ANIMATION: {
    TRANSITION_DELAY: 200,
    LAYER_SWITCH_DELAY: 250,
    LAYER_OPACITY_DELAY: 300,
    HOME_ACTIVATION_DELAY: 350,
    PAPER_SOUND_DELAY: 750,
    ABOUT_OVERLAY_DELAY: 100,
    ABOUT_CONTENT_DELAY: 300,
    ABOUT_CLOSE_DELAY: 400,
    ABOUT_CONTAINER_DELAY: 500,
    ABOUT_SCROLL_DELAY: 850,
  },

  // Star animation settings
  STARS: {
    COUNT: 13,
    SPAWN_INTERVAL: 1000,
    INITIAL_DELAY: 500,
    LIFETIME: 7000,
  },

  // Responsive breakpoints
  BREAKPOINTS: {
    MOBILE: 767,
  },

  // Audio file paths
  AUDIO: {
    CLICK: 'sounds/click.mp3',
    CLICK_MOBILE: 'sounds/mobile/click.mp3',
    HOVER: 'sounds/hover.mp3',
    HOVER_MOBILE: 'sounds/mobile/hover.mp3',
    HOVER2: 'sounds/hover2.mp3',
    HOVER3: 'sounds/hover3.mp3',
    PAPER: 'sounds/paper.mp3',
    PAPER_MOBILE: 'sounds/mobile/paper.mp3',
    PAPER_ABOUT_UP: 'sounds/paperaboutup.mp3',
    PAPER_ABOUT_UP_MOBILE: 'sounds/mobile/paperaboutup.mp3',
    PAPER_ABOUT_DOWN: 'sounds/paperaboutdown.mp3',
    PAPER_ABOUT_DOWN_MOBILE: 'sounds/mobile/paperaboutdown.mp3',
    SKIN: 'sounds/skin.mp3',
    SKIN_MOBILE: 'sounds/mobile/skin.mp3',
  },

  // CSS selectors
  SELECTORS: {
    SOUND_TOGGLE: '.sound-toggle',
    SOUND_ICON: '.sound-icon',
    PORTFOLIO_BUTTON: '#open-portfolio',
    BACK_HOME: '#back-home',
    ABOUT_BUTTON: '#open-about',
    CLOSE_ABOUT: '#close',
    PORTFOLIO_GRID: '.portfolio-grid',
    PORTFOLIO_ITEMS: '.portfolio-items',
    HOME: '.home',
    ITEM: '.item',
    BACK_TO_PORTFOLIO: '.back-to-portfolio',
    TOP_PROJECT: '.top-project',
    BOTTOM_PROJECT: '.bottom-project',
    BTN_SECONDARY: '.btn-secondary',
    NOT_ACTIVE_LAYER: '.not-active-layer',
    ACTIVE_LAYER: '.active-layer',
    OVERLAY: '#overlay',
    CONTENT: '#content',
    CONTENT_CONTAINER: '#contentcontainer',
    CHECKBOX: '#checkbox',
    CHECKBOX2: '#checkbox2',
  },

  // CSS classes
  CLASSES: {
    LOADED: 'loaded',
    SOUND: 'sound',
    ACTIVE: 'active',
    TO_TOP: 'to-top',
    TO_BOTTOM: 'to-bottom',
    DARK: 'dark',
    IS_MUTED: 'is-muted',
    OPACITY_0: 'opacity-0',
    NOT_ACTIVE_LAYER: 'not-active-layer',
    ACTIVE_LAYER: 'active-layer',
  },
};

