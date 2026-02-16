/**
 * Animations Module
 * Handles visual animations and effects
 * @module animations
 */

import { CONFIG } from './config.js';

/**
 * StarAnimationManager class for creating animated stars
 */
export class StarAnimationManager {
  constructor() {
    this.starInterval = null;
  }

  /**
   * Initializes star animations
   */
  initialize() {
    // Create initial stars with staggered timing
    for (let i = 0; i < CONFIG.STARS.COUNT; i++) {
      setTimeout(() => {
        this.createStar();
      }, i * CONFIG.STARS.INITIAL_DELAY);
    }

    // Continue creating stars at regular intervals
    this.starInterval = setInterval(() => {
      this.createStar();
    }, CONFIG.STARS.SPAWN_INTERVAL);
  }

  /**
   * Creates a single animated star
   */
  createStar() {
    const star = document.createElement('div');
    star.className = 'star';

    // Random positioning within viewport
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;

    document.body.appendChild(star);

    // Trigger fade-in animation
    requestAnimationFrame(() => {
      star.style.opacity = '1';
    });

    // Remove star after lifetime expires to prevent memory leaks
    setTimeout(() => {
      star.remove();
    }, CONFIG.STARS.LIFETIME);
  }

  /**
   * Stops star animation
   */
  stop() {
    if (this.starInterval) {
      clearInterval(this.starInterval);
      this.starInterval = null;
    }
  }
}

/**
 * Portfolio3DAnimationManager class for 3D hover effects
 */
export class Portfolio3DAnimationManager {
  constructor() {
    this.directions = {
      0: 'top',
      1: 'right',
      2: 'bottom',
      3: 'left',
    };

    this.classNames = ['in', 'out']
      .map(prefix => Object.values(this.directions).map(dir => `${prefix}-${dir}`))
      .reduce((a, b) => a.concat(b));
  }

  /**
   * Initializes 3D animations for portfolio items
   */
  initialize() {
    // Only enable on desktop
    if (window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE) return;

    const items = document.querySelectorAll(CONFIG.SELECTORS.ITEM);
    items.forEach(item => {
      new PortfolioItem(item, this);
    });
  }

  /**
   * Gets the direction key based on mouse position
   * @param {MouseEvent} event - Mouse event
   * @param {Element} element - Target element
   * @returns {number} Direction key (0-3)
   */
  getDirectionKey(event, element) {
    const { width, height, top, left } = element.getBoundingClientRect();
    const l = event.pageX - (left + window.pageXOffset);
    const t = event.pageY - (top + window.pageYOffset);
    const x = l - (width / 2) * (width > height ? height / width : 1);
    const y = t - (height / 2) * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }
}

/**
 * PortfolioItem class for individual portfolio item animations
 */
class PortfolioItem {
  constructor(element, manager) {
    this.element = element;
    this.manager = manager;

    this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
  }

  /**
   * Updates the animation class based on mouse direction
   * @param {MouseEvent} event - Mouse event
   * @param {string} prefix - Animation prefix ('in' or 'out')
   */
  update(event, prefix) {
    this.element.classList.remove(...this.manager.classNames);
    const directionKey = this.manager.getDirectionKey(event, this.element);
    const direction = this.manager.directions[directionKey];
    this.element.classList.add(`${prefix}-${direction}`);
  }
}

