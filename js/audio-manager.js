/**
 * Audio Manager Module
 * Handles all audio playback and sound effects
 * @module audioManager
 */

import { CONFIG } from './config.js';
import { isMobileDevice } from './utils.js';

/**
 * AudioManager class for managing sound effects
 */
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.isMobile = isMobileDevice();
    this.audioContext = null;
    this.sounds = {};

    this.initializeAudioContext();
    this.preloadSounds();
  }

  /**
   * Initializes the Web Audio API context
   */
  initializeAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Preloads all audio files
   */
  preloadSounds() {
    const audioFiles = CONFIG.AUDIO;

    Object.entries(audioFiles).forEach(([key, path]) => {
      try {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds[key] = audio;
      } catch (error) {
        console.error(`Failed to load audio file ${path}:`, error);
      }
    });

    this.updateMuteState();
  }

  /**
   * Enables or disables sound
   * @param {boolean} enabled - Whether sound should be enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    this.updateMuteState();

    if (this.enabled && this.audioContext?.state === 'suspended') {
      this.resumeAudioContext();
    }
  }

  /**
   * Updates mute state for all audio elements
   */
  updateMuteState() {
    Object.values(this.sounds).forEach(audio => {
      if (audio) {
        audio.muted = !this.enabled;
      }
    });
  }

  /**
   * Resumes the audio context (required for some browsers)
   */
  resumeAudioContext() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume().catch(error => {
        console.warn('Failed to resume audio context:', error);
      });
    }
  }

  /**
   * Plays a sound effect
   * @param {string} soundKey - Key of the sound to play
   * @returns {Promise<void>}
   */
  async playSound(soundKey) {
    if (!this.enabled) return;

    const sound = this.sounds[soundKey];
    if (!sound) {
      console.warn(`Sound "${soundKey}" not found`);
      return;
    }

    try {
      // Reset to beginning if already playing
      sound.currentTime = 0;
      await sound.play();
    } catch (error) {
      // Silently fail - audio playback errors are common and expected
      if (error.name !== 'NotAllowedError' && error.name !== 'NotSupportedError') {
        console.debug(`Audio playback failed for "${soundKey}":`, error);
      }
    }
  }

  /**
   * Plays click sound (mobile-aware)
   */
  playClick() {
    const soundKey = this.isMobile ? 'CLICK_MOBILE' : 'CLICK';
    return this.playSound(soundKey);
  }

  /**
   * Plays hover sound (desktop only)
   */
  playHover() {
    if (this.isMobile) return;
    return this.playSound('HOVER');
  }

  /**
   * Plays hover2 sound (desktop only)
   */
  playHover2() {
    if (this.isMobile) return;
    return this.playSound('HOVER2');
  }

  /**
   * Plays hover3 sound (desktop only)
   */
  playHover3() {
    if (this.isMobile) return;
    const sound = this.sounds.HOVER3;
    if (sound) {
      sound.currentTime = 0;
    }
    return this.playSound('HOVER3');
  }

  /**
   * Plays paper sound (mobile-aware)
   */
  playPaper() {
    const soundKey = this.isMobile ? 'PAPER_MOBILE' : 'PAPER';
    return this.playSound(soundKey);
  }

  /**
   * Plays paper about up sound (mobile-aware)
   */
  playPaperAboutUp() {
    const soundKey = this.isMobile ? 'PAPER_ABOUT_UP_MOBILE' : 'PAPER_ABOUT_UP';
    return this.playSound(soundKey);
  }

  /**
   * Plays paper about down sound (mobile-aware)
   */
  playPaperAboutDown() {
    const soundKey = this.isMobile ? 'PAPER_ABOUT_DOWN_MOBILE' : 'PAPER_ABOUT_DOWN';
    return this.playSound(soundKey);
  }

  /**
   * Plays skin change sound (mobile-aware)
   */
  playSkin() {
    const soundKey = this.isMobile ? 'SKIN_MOBILE' : 'SKIN';
    return this.playSound(soundKey);
  }
}

