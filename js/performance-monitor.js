/**
 * Performance Monitor Module
 * Tracks and reports application performance metrics
 * Demonstrates: Performance optimization, Metrics collection, Professional monitoring
 * 
 * @module performance-monitor
 */

import { logger } from './logger.js';

/**
 * PerformanceMonitor class for tracking application performance
 * Implements Singleton pattern
 */
class PerformanceMonitor {
  /**
   * @private
   * @static
   */
  static instance = null;

  /**
   * @private
   */
  constructor() {
    if (PerformanceMonitor.instance) {
      return PerformanceMonitor.instance;
    }

    this.metrics = new Map();
    this.marks = new Map();
    this.isSupported = 'performance' in window && 'mark' in window.performance;

    PerformanceMonitor.instance = this;
    logger.debug('PerformanceMonitor initialized');
  }

  /**
   * Get singleton instance
   * @returns {PerformanceMonitor}
   */
  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start timing an operation
   * @param {string} name - Name of the operation
   */
  startMeasure(name) {
    if (!this.isSupported) return;

    try {
      const markName = `${name}-start`;
      performance.mark(markName);
      this.marks.set(name, { startMark: markName, startTime: Date.now() });
      logger.debug(`Performance measure started: ${name}`);
    } catch (error) {
      logger.warn(`Failed to start performance measure: ${name}`, error);
    }
  }

  /**
   * End timing an operation and record the duration
   * @param {string} name - Name of the operation
   * @returns {number|null} Duration in milliseconds
   */
  endMeasure(name) {
    if (!this.isSupported) return null;

    try {
      const markData = this.marks.get(name);
      if (!markData) {
        logger.warn(`No start mark found for: ${name}`);
        return null;
      }

      const endMarkName = `${name}-end`;
      performance.mark(endMarkName);

      const measureName = `${name}-measure`;
      performance.measure(measureName, markData.startMark, endMarkName);

      const measure = performance.getEntriesByName(measureName)[0];
      const duration = measure.duration;

      // Store metric
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      this.metrics.get(name).push({
        duration,
        timestamp: Date.now()
      });

      logger.debug(`Performance measure completed: ${name} (${duration.toFixed(2)}ms)`);

      // Clean up marks
      performance.clearMarks(markData.startMark);
      performance.clearMarks(endMarkName);
      performance.clearMeasures(measureName);
      this.marks.delete(name);

      return duration;
    } catch (error) {
      logger.warn(`Failed to end performance measure: ${name}`, error);
      return null;
    }
  }

  /**
   * Measure a function execution time
   * @param {string} name - Name of the operation
   * @param {Function} fn - Function to measure
   * @returns {*} Function return value
   */
  async measureFunction(name, fn) {
    this.startMeasure(name);
    try {
      const result = await fn();
      this.endMeasure(name);
      return result;
    } catch (error) {
      this.endMeasure(name);
      throw error;
    }
  }

  /**
   * Get metrics for a specific operation
   * @param {string} name - Operation name
   * @returns {Object|null} Metrics summary
   */
  getMetrics(name) {
    const measurements = this.metrics.get(name);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const durations = measurements.map(m => m.duration);
    const sum = durations.reduce((a, b) => a + b, 0);
    const avg = sum / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);

    return {
      name,
      count: durations.length,
      average: avg,
      min,
      max,
      total: sum,
      measurements
    };
  }

  /**
   * Get all metrics
   * @returns {Array} Array of all metrics
   */
  getAllMetrics() {
    const allMetrics = [];
    this.metrics.forEach((_, name) => {
      const metrics = this.getMetrics(name);
      if (metrics) {
        allMetrics.push(metrics);
      }
    });
    return allMetrics;
  }

  /**
   * Log performance report to console
   */
  logReport() {
    const metrics = this.getAllMetrics();
    if (metrics.length === 0) {
      logger.info('No performance metrics collected');
      return;
    }

    console.group('📊 Performance Report');
    metrics.forEach(metric => {
      console.log(`${metric.name}:`, {
        'Avg': `${metric.average.toFixed(2)}ms`,
        'Min': `${metric.min.toFixed(2)}ms`,
        'Max': `${metric.max.toFixed(2)}ms`,
        'Count': metric.count
      });
    });
    console.groupEnd();
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics.clear();
    this.marks.clear();
    if (this.isSupported) {
      performance.clearMarks();
      performance.clearMeasures();
    }
    logger.debug('Performance metrics cleared');
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

