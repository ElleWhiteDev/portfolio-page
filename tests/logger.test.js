/**
 * Unit Tests for Logger Module
 * Tests centralized logging functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logger, LogLevel } from '../js/logger.js';

describe('Logger Module', () => {
  beforeEach(() => {
    // Clear logs before each test
    logger.clear();
    
    // Spy on console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = logger;
      const instance2 = logger;
      expect(instance1).toBe(instance2);
    });
  });

  describe('debug', () => {
    it('should add debug log to history', () => {
      logger.debug('Test debug message');
      const logs = logger.getLogs();
      
      expect(logs.length).toBe(1);
      expect(logs[0].level).toBe(LogLevel.DEBUG);
      expect(logs[0].message).toBe('Test debug message');
    });

    it('should include timestamp', () => {
      logger.debug('Test');
      const logs = logger.getLogs();
      
      expect(logs[0].timestamp).toBeDefined();
      expect(typeof logs[0].timestamp).toBe('string');
    });

    it('should include additional data', () => {
      const data = { key: 'value' };
      logger.debug('Test', data);
      const logs = logger.getLogs();
      
      expect(logs[0].data).toEqual(data);
    });
  });

  describe('info', () => {
    it('should add info log to history', () => {
      logger.info('Test info message');
      const logs = logger.getLogs();
      
      expect(logs.length).toBe(1);
      expect(logs[0].level).toBe(LogLevel.INFO);
      expect(logs[0].message).toBe('Test info message');
    });
  });

  describe('warn', () => {
    it('should add warning log to history', () => {
      logger.warn('Test warning message');
      const logs = logger.getLogs();
      
      expect(logs.length).toBe(1);
      expect(logs[0].level).toBe(LogLevel.WARN);
      expect(logs[0].message).toBe('Test warning message');
    });

    it('should call console.warn', () => {
      logger.warn('Test warning');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should add error log to history', () => {
      logger.error('Test error message');
      const logs = logger.getLogs();
      
      expect(logs.length).toBe(1);
      expect(logs[0].level).toBe(LogLevel.ERROR);
      expect(logs[0].message).toBe('Test error message');
    });

    it('should handle Error objects', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      const logs = logger.getLogs();
      
      expect(logs[0].data.error).toBe('Test error');
      expect(logs[0].data.stack).toBeDefined();
    });

    it('should call console.error', () => {
      logger.error('Test error');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getLogs', () => {
    it('should return all logs', () => {
      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');
      
      const logs = logger.getLogs();
      expect(logs.length).toBe(4);
    });

    it('should return a copy of logs array', () => {
      logger.info('Test');
      const logs1 = logger.getLogs();
      const logs2 = logger.getLogs();
      
      expect(logs1).not.toBe(logs2); // Different array instances
      expect(logs1).toEqual(logs2); // Same content
    });
  });

  describe('getLogsByLevel', () => {
    beforeEach(() => {
      logger.debug('Debug 1');
      logger.info('Info 1');
      logger.debug('Debug 2');
      logger.warn('Warn 1');
      logger.error('Error 1');
    });

    it('should filter logs by level', () => {
      const debugLogs = logger.getLogsByLevel(LogLevel.DEBUG);
      expect(debugLogs.length).toBe(2);
      expect(debugLogs.every(log => log.level === LogLevel.DEBUG)).toBe(true);
    });

    it('should return empty array for non-existent level', () => {
      logger.clear();
      const logs = logger.getLogsByLevel(LogLevel.ERROR);
      expect(logs.length).toBe(0);
    });
  });

  describe('clear', () => {
    it('should clear all logs', () => {
      logger.info('Test 1');
      logger.info('Test 2');
      logger.info('Test 3');
      
      expect(logger.getLogs().length).toBe(3);
      
      logger.clear();
      
      expect(logger.getLogs().length).toBe(0);
    });
  });

  describe('Log History Limit', () => {
    it('should maintain maximum log count', () => {
      // Add more than maxLogs (100)
      for (let i = 0; i < 150; i++) {
        logger.info(`Log ${i}`);
      }
      
      const logs = logger.getLogs();
      expect(logs.length).toBeLessThanOrEqual(100);
    });
  });
});

