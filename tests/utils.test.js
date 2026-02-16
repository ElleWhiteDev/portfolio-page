/**
 * Unit Tests for Utils Module
 * Tests utility functions for correctness and edge cases
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isMobileDevice,
  safeQuerySelector,
  safeQuerySelectorAll,
  addSafeEventListener,
  delayExecution,
  toggleClass,
  addClass,
  removeClass,
  randomInRange
} from '../js/utils.js';

describe('Utils Module', () => {
  describe('randomInRange', () => {
    it('should return a number within the specified range', () => {
      const result = randomInRange(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should work with negative numbers', () => {
      const result = randomInRange(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    });

    it('should work when min equals max', () => {
      const result = randomInRange(5, 5);
      expect(result).toBe(5);
    });

    it('should return a number', () => {
      const result = randomInRange(0, 100);
      expect(typeof result).toBe('number');
    });
  });

  describe('isMobileDevice', () => {
    it('should return a boolean', () => {
      const result = isMobileDevice();
      expect(typeof result).toBe('boolean');
    });

    it('should detect mobile user agents', () => {
      const originalUserAgent = navigator.userAgent;
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true
      });
      
      const result = isMobileDevice();
      expect(result).toBe(true);
      
      // Restore
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      });
    });
  });

  describe('safeQuerySelector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div class="test-element">Test</div>';
    });

    it('should return element when it exists', () => {
      const element = safeQuerySelector('.test-element');
      expect(element).not.toBeNull();
      expect(element.textContent).toBe('Test');
    });

    it('should return null when element does not exist', () => {
      const element = safeQuerySelector('.non-existent');
      expect(element).toBeNull();
    });

    it('should handle invalid selectors gracefully', () => {
      const element = safeQuerySelector(':::invalid');
      expect(element).toBeNull();
    });
  });

  describe('safeQuerySelectorAll', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
      `;
    });

    it('should return array of elements when they exist', () => {
      const elements = safeQuerySelectorAll('.item');
      expect(Array.isArray(elements)).toBe(true);
      expect(elements.length).toBe(3);
    });

    it('should return empty array when no elements exist', () => {
      const elements = safeQuerySelectorAll('.non-existent');
      expect(Array.isArray(elements)).toBe(true);
      expect(elements.length).toBe(0);
    });

    it('should handle invalid selectors gracefully', () => {
      const elements = safeQuerySelectorAll(':::invalid');
      expect(Array.isArray(elements)).toBe(true);
      expect(elements.length).toBe(0);
    });
  });

  describe('addClass', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div class="existing"></div>';
    });

    it('should add class to element', () => {
      const element = document.querySelector('.existing');
      addClass(element, 'new-class');
      expect(element.classList.contains('new-class')).toBe(true);
    });

    it('should handle null element gracefully', () => {
      expect(() => addClass(null, 'test')).not.toThrow();
    });
  });

  describe('removeClass', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div class="existing remove-me"></div>';
    });

    it('should remove class from element', () => {
      const element = document.querySelector('.existing');
      removeClass(element, 'remove-me');
      expect(element.classList.contains('remove-me')).toBe(false);
    });

    it('should handle null element gracefully', () => {
      expect(() => removeClass(null, 'test')).not.toThrow();
    });
  });

  describe('toggleClass', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div class="existing"></div>';
    });

    it('should toggle class on element', () => {
      const element = document.querySelector('.existing');
      toggleClass(element, 'toggle-me');
      expect(element.classList.contains('toggle-me')).toBe(true);
      
      toggleClass(element, 'toggle-me');
      expect(element.classList.contains('toggle-me')).toBe(false);
    });

    it('should handle null element gracefully', () => {
      expect(() => toggleClass(null, 'test')).not.toThrow();
    });
  });

  describe('delayExecution', () => {
    it('should delay execution by specified time', async () => {
      const start = Date.now();
      await delayExecution(100);
      const end = Date.now();
      const elapsed = end - start;
      
      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some margin
    });
  });
});

