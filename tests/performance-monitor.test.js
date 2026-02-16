/**
 * Unit Tests for PerformanceMonitor Module
 * Tests performance tracking functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { performanceMonitor } from '../js/performance-monitor.js';

describe('PerformanceMonitor Module', () => {
  beforeEach(() => {
    // Clear metrics before each test
    performanceMonitor.clear();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = performanceMonitor;
      const instance2 = performanceMonitor;
      expect(instance1).toBe(instance2);
    });
  });

  describe('startMeasure and endMeasure', () => {
    it('should measure operation duration', () => {
      performanceMonitor.startMeasure('test-operation');
      performanceMonitor.endMeasure('test-operation');
      
      const metrics = performanceMonitor.getMetrics('test-operation');
      expect(metrics).not.toBeNull();
      expect(metrics.count).toBe(1);
      expect(metrics.average).toBeGreaterThanOrEqual(0);
    });

    it('should return duration when ending measure', () => {
      performanceMonitor.startMeasure('test-operation');
      const duration = performanceMonitor.endMeasure('test-operation');
      
      expect(typeof duration).toBe('number');
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should handle multiple measurements of same operation', () => {
      performanceMonitor.startMeasure('test-operation');
      performanceMonitor.endMeasure('test-operation');
      
      performanceMonitor.startMeasure('test-operation');
      performanceMonitor.endMeasure('test-operation');
      
      const metrics = performanceMonitor.getMetrics('test-operation');
      expect(metrics.count).toBe(2);
    });

    it('should return null when ending non-existent measure', () => {
      const duration = performanceMonitor.endMeasure('non-existent');
      expect(duration).toBeNull();
    });
  });

  describe('measureFunction', () => {
    it('should measure async function execution', async () => {
      const testFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'result';
      };
      
      const result = await performanceMonitor.measureFunction('async-test', testFn);
      
      expect(result).toBe('result');
      
      const metrics = performanceMonitor.getMetrics('async-test');
      expect(metrics).not.toBeNull();
      expect(metrics.count).toBe(1);
    });

    it('should measure sync function execution', async () => {
      const testFn = () => {
        return 42;
      };
      
      const result = await performanceMonitor.measureFunction('sync-test', testFn);
      
      expect(result).toBe(42);
      
      const metrics = performanceMonitor.getMetrics('sync-test');
      expect(metrics).not.toBeNull();
    });

    it('should handle function errors', async () => {
      const errorFn = () => {
        throw new Error('Test error');
      };
      
      await expect(
        performanceMonitor.measureFunction('error-test', errorFn)
      ).rejects.toThrow('Test error');
      
      // Should still record the measurement
      const metrics = performanceMonitor.getMetrics('error-test');
      expect(metrics).not.toBeNull();
    });
  });

  describe('getMetrics', () => {
    beforeEach(() => {
      performanceMonitor.startMeasure('test-op');
      performanceMonitor.endMeasure('test-op');
      performanceMonitor.startMeasure('test-op');
      performanceMonitor.endMeasure('test-op');
      performanceMonitor.startMeasure('test-op');
      performanceMonitor.endMeasure('test-op');
    });

    it('should return metrics summary', () => {
      const metrics = performanceMonitor.getMetrics('test-op');
      
      expect(metrics).toHaveProperty('name');
      expect(metrics).toHaveProperty('count');
      expect(metrics).toHaveProperty('average');
      expect(metrics).toHaveProperty('min');
      expect(metrics).toHaveProperty('max');
      expect(metrics).toHaveProperty('total');
      expect(metrics).toHaveProperty('measurements');
    });

    it('should calculate correct statistics', () => {
      const metrics = performanceMonitor.getMetrics('test-op');
      
      expect(metrics.count).toBe(3);
      expect(metrics.average).toBeGreaterThanOrEqual(0);
      expect(metrics.min).toBeLessThanOrEqual(metrics.max);
      expect(metrics.total).toBeGreaterThanOrEqual(0);
    });

    it('should return null for non-existent operation', () => {
      const metrics = performanceMonitor.getMetrics('non-existent');
      expect(metrics).toBeNull();
    });
  });

  describe('getAllMetrics', () => {
    beforeEach(() => {
      performanceMonitor.startMeasure('op1');
      performanceMonitor.endMeasure('op1');
      
      performanceMonitor.startMeasure('op2');
      performanceMonitor.endMeasure('op2');
    });

    it('should return all metrics', () => {
      const allMetrics = performanceMonitor.getAllMetrics();
      
      expect(Array.isArray(allMetrics)).toBe(true);
      expect(allMetrics.length).toBe(2);
    });

    it('should return empty array when no metrics', () => {
      performanceMonitor.clear();
      const allMetrics = performanceMonitor.getAllMetrics();
      
      expect(Array.isArray(allMetrics)).toBe(true);
      expect(allMetrics.length).toBe(0);
    });
  });

  describe('logReport', () => {
    it('should not throw when logging report', () => {
      performanceMonitor.startMeasure('test');
      performanceMonitor.endMeasure('test');
      
      expect(() => {
        performanceMonitor.logReport();
      }).not.toThrow();
    });

    it('should handle empty metrics', () => {
      expect(() => {
        performanceMonitor.logReport();
      }).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all metrics', () => {
      performanceMonitor.startMeasure('test');
      performanceMonitor.endMeasure('test');
      
      expect(performanceMonitor.getAllMetrics().length).toBe(1);
      
      performanceMonitor.clear();
      
      expect(performanceMonitor.getAllMetrics().length).toBe(0);
    });
  });
});

