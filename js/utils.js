/**
 * Utility Functions Module
 * Provides helper functions used throughout the application
 * @module utils
 */

/**
 * Detects if the current device is mobile
 * @returns {boolean} True if mobile device detected
 */
export function isMobileDevice() {
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return mobilePatterns.some(pattern => navigator.userAgent.match(pattern));
}

/**
 * Safely queries a DOM element
 * @param {string} selector - CSS selector
 * @returns {Element|null} The element or null if not found
 */
export function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error(`Error querying selector "${selector}":`, error);
    return null;
  }
}

/**
 * Safely queries multiple DOM elements
 * @param {string} selector - CSS selector
 * @returns {Array} Array of elements or empty array
 */
export function safeQuerySelectorAll(selector) {
  try {
    return Array.from(document.querySelectorAll(selector));
  } catch (error) {
    console.error(`Error querying selector "${selector}":`, error);
    return [];
  }
}

/**
 * Adds event listener with error handling
 * @param {Element} element - DOM element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 */
export function addSafeEventListener(element, event, handler) {
  if (!element) {
    console.warn(`Cannot add event listener: element is null`);
    return;
  }

  try {
    element.addEventListener(event, handler);
  } catch (error) {
    console.error(`Error adding event listener for "${event}":`, error);
  }
}

/**
 * Delays execution of a function
 * @param {number} delay - Delay in milliseconds
 * @param {Function} callback - Optional function to execute
 * @returns {Promise} Promise that resolves after delay
 */
export function delayExecution(delay, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if (callback && typeof callback === 'function') {
          callback();
        }
        resolve();
      } catch (error) {
        console.error('Error in delayed execution:', error);
        resolve();
      }
    }, delay);
  });
}

/**
 * Toggles a CSS class on an element
 * @param {Element} element - DOM element
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add (true) or remove (false)
 */
export function toggleClass(element, className, force) {
  if (!element) return;

  try {
    if (force !== undefined) {
      element.classList.toggle(className, force);
    } else {
      element.classList.toggle(className);
    }
  } catch (error) {
    console.error(`Error toggling class "${className}":`, error);
  }
}

/**
 * Adds a CSS class to an element
 * @param {Element} element - DOM element
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
  if (!element) return;

  try {
    element.classList.add(className);
  } catch (error) {
    console.error(`Error adding class "${className}":`, error);
  }
}

/**
 * Removes a CSS class from an element
 * @param {Element} element - DOM element
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
  if (!element) return;

  try {
    element.classList.remove(className);
  } catch (error) {
    console.error(`Error removing class "${className}":`, error);
  }
}

/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

