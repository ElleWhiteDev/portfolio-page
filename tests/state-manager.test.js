/**
 * Unit Tests for StateManager Module
 * Tests centralized state management and observer pattern
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { stateManager } from '../js/state-manager.js';

describe('StateManager Module', () => {
  beforeEach(() => {
    // Reset state before each test
    stateManager.reset();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = stateManager;
      const instance2 = stateManager;
      expect(instance1).toBe(instance2);
    });
  });

  describe('get', () => {
    it('should get top-level state value', () => {
      const currentView = stateManager.get('currentView');
      expect(currentView).toBe('home');
    });

    it('should get nested state value with dot notation', () => {
      const starsActive = stateManager.get('animations.starsActive');
      expect(starsActive).toBe(false);
    });

    it('should return undefined for non-existent key', () => {
      const value = stateManager.get('nonExistent');
      expect(value).toBeUndefined();
    });

    it('should return undefined for non-existent nested key', () => {
      const value = stateManager.get('animations.nonExistent');
      expect(value).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set top-level state value', () => {
      stateManager.set('currentView', 'portfolio');
      expect(stateManager.get('currentView')).toBe('portfolio');
    });

    it('should set nested state value with dot notation', () => {
      stateManager.set('animations.starsActive', true);
      expect(stateManager.get('animations.starsActive')).toBe(true);
    });

    it('should create nested objects if they do not exist', () => {
      stateManager.set('newObject.newKey', 'value');
      expect(stateManager.get('newObject.newKey')).toBe('value');
    });

    it('should not trigger observers if value has not changed', () => {
      const callback = vi.fn();
      stateManager.subscribe('currentView', callback);
      
      stateManager.set('currentView', 'home'); // Same value
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    it('should call observer when state changes', () => {
      const callback = vi.fn();
      stateManager.subscribe('currentView', callback);
      
      stateManager.set('currentView', 'portfolio');
      
      expect(callback).toHaveBeenCalledWith('portfolio', 'home');
    });

    it('should support multiple observers for same key', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      stateManager.subscribe('currentView', callback1);
      stateManager.subscribe('currentView', callback2);
      
      stateManager.set('currentView', 'portfolio');
      
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should return unsubscribe function', () => {
      const callback = vi.fn();
      const unsubscribe = stateManager.subscribe('currentView', callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      stateManager.set('currentView', 'portfolio');
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle observer errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Observer error');
      });
      const goodCallback = vi.fn();
      
      stateManager.subscribe('currentView', errorCallback);
      stateManager.subscribe('currentView', goodCallback);
      
      expect(() => {
        stateManager.set('currentView', 'portfolio');
      }).not.toThrow();
      
      expect(goodCallback).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update multiple state values at once', () => {
      stateManager.update({
        currentView: 'portfolio',
        soundEnabled: false,
        theme: 'light'
      });
      
      expect(stateManager.get('currentView')).toBe('portfolio');
      expect(stateManager.get('soundEnabled')).toBe(false);
      expect(stateManager.get('theme')).toBe('light');
    });

    it('should trigger observers for each updated key', () => {
      const viewCallback = vi.fn();
      const soundCallback = vi.fn();
      
      stateManager.subscribe('currentView', viewCallback);
      stateManager.subscribe('soundEnabled', soundCallback);
      
      stateManager.update({
        currentView: 'portfolio',
        soundEnabled: false
      });
      
      expect(viewCallback).toHaveBeenCalled();
      expect(soundCallback).toHaveBeenCalled();
    });
  });

  describe('getState', () => {
    it('should return entire state object', () => {
      const state = stateManager.getState();
      
      expect(state).toHaveProperty('currentView');
      expect(state).toHaveProperty('soundEnabled');
      expect(state).toHaveProperty('theme');
      expect(state).toHaveProperty('isLoading');
      expect(state).toHaveProperty('animations');
    });

    it('should return a copy of state', () => {
      const state1 = stateManager.getState();
      const state2 = stateManager.getState();
      
      expect(state1).not.toBe(state2); // Different objects
      expect(state1).toEqual(state2); // Same content
    });
  });

  describe('reset', () => {
    it('should reset state to initial values', () => {
      stateManager.set('currentView', 'portfolio');
      stateManager.set('soundEnabled', false);
      stateManager.set('theme', 'light');
      
      stateManager.reset();
      
      expect(stateManager.get('currentView')).toBe('home');
      expect(stateManager.get('soundEnabled')).toBe(true);
      expect(stateManager.get('theme')).toBe('dark');
    });
  });
});

