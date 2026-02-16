/**
 * Test Setup File
 * Runs before all tests to set up the testing environment
 */

// Mock browser APIs that aren't available in test environment
global.AudioContext = class AudioContext {
  constructor() {
    this.state = 'running';
  }
  
  createGain() {
    return {
      connect: () => {},
      gain: { value: 1 }
    };
  }
  
  createBufferSource() {
    return {
      connect: () => {},
      start: () => {},
      buffer: null
    };
  }
  
  decodeAudioData() {
    return Promise.resolve({});
  }
  
  resume() {
    return Promise.resolve();
  }
};

// Mock Performance API
global.performance = global.performance || {
  mark: () => {},
  measure: () => {},
  getEntriesByName: () => [],
  clearMarks: () => {},
  clearMeasures: () => {},
  now: () => Date.now()
};

// Mock localStorage
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

// Suppress console logs during tests (optional)
// global.console = {
//   ...console,
//   log: () => {},
//   debug: () => {},
//   info: () => {}
// };

