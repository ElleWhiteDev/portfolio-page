# Elle White - Portfolio Website

A modern, interactive portfolio website showcasing backend development projects with **professional software architecture** and **enterprise-level design patterns**.

> 🎯 **This portfolio demonstrates not just what I've built, but how I build it** - using industry-standard patterns, SOLID principles, and production-ready practices.

## ✨ Architecture Highlights

- **🏗️ Design Patterns**: Singleton, Observer, Dependency Injection, Facade, Module
- **📊 State Management**: Centralized state with reactive updates (similar to Redux)
- **🛡️ Error Handling**: Comprehensive logging and graceful degradation
- **📈 Performance Monitoring**: Built-in metrics and performance tracking
- **🧪 Testable Code**: Dependency injection and modular architecture
- **📚 Documentation**: JSDoc comments, architecture docs, and inline explanations

## 🚀 Features

- **Modular JavaScript Architecture**: 11 ES6 modules following SOLID principles
- **Professional Logging**: Centralized logger with severity levels (DEBUG, INFO, WARN, ERROR)
- **State Management**: Observable state pattern for reactive updates
- **Performance Monitoring**: Track and report application performance metrics
- **Responsive Design**: Optimized for all devices
- **Interactive Animations**: 3D hover effects and smooth page transitions
- **Sound Effects**: Optional audio feedback for user interactions
- **Dark/Light Theme**: Toggle between color schemes
- **Accessibility**: WCAG-compliant with ARIA labels and semantic HTML5
- **Error Resilience**: Try-catch boundaries and graceful degradation

## 📁 Project Structure

```
portfolio-page/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet
│   └── skins/             # Color theme variations
├── js/
│   ├── main.js            # Application entry point (Facade pattern)
│   ├── config.js          # Configuration constants
│   ├── utils.js           # Utility functions
│   ├── logger.js          # Centralized logging (Singleton)
│   ├── state-manager.js   # State management (Singleton + Observer)
│   ├── performance-monitor.js  # Performance tracking (Singleton)
│   ├── audio-manager.js   # Audio playback management
│   ├── navigation-manager.js  # Page navigation logic
│   ├── ui-manager.js      # UI interactions
│   ├── event-handlers.js  # Event listener setup
│   ├── animations.js      # Visual effects
│   └── custom.js          # Legacy fallback (deprecated)
├── img/                   # Images and assets
├── sounds/                # Audio files
└── fonts/                 # Custom fonts
```

## 🛠️ Technologies & Patterns

### Core Technologies
- **Frontend**: HTML5 (Semantic), CSS3, JavaScript (ES6+)
- **Architecture**: Modular ES6 with class-based OOP design
- **APIs**: Web Audio API, Performance API
- **Hosting**: Heroku (static site)

### Design Patterns
- **Singleton Pattern**: Logger, StateManager, PerformanceMonitor
- **Observer Pattern**: State subscriptions and reactive updates
- **Dependency Injection**: All manager classes
- **Facade Pattern**: PortfolioApp main controller
- **Module Pattern**: ES6 modules for encapsulation

### Software Principles
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY**: Don't Repeat Yourself - utility functions and config
- **Separation of Concerns**: Each module has one clear purpose
- **Error Boundaries**: Comprehensive error handling throughout

## 💻 Development

### Code Quality Standards

This project follows professional software engineering practices:

- **Modular Architecture**: Separation of concerns with dedicated modules
- **Error Handling**: Comprehensive try-catch blocks and graceful degradation
- **Documentation**: JSDoc comments for all functions and classes
- **Naming Conventions**: Clear, descriptive variable and function names
- **DRY Principle**: Reusable utility functions and configuration
- **Performance**: Optimized animations and resource loading
- **Testing**: Comprehensive unit tests with 69 test cases
- **CI/CD**: Automated testing and deployment pipeline
- **Code Quality**: ESLint and Prettier for consistent code style

### Module Overview

#### Infrastructure Layer

**`logger.js`** - Centralized Logging (Singleton)
- Severity levels: DEBUG, INFO, WARN, ERROR
- Development vs production modes
- Log history with timestamps
- Context-aware error tracking

**`state-manager.js`** - State Management (Singleton + Observer)
- Centralized application state
- Observable state changes
- Reactive updates via subscriptions
- Supports nested state properties

**`performance-monitor.js`** - Performance Tracking (Singleton)
- Measure operation durations
- Collect performance metrics
- Generate performance reports
- Identify bottlenecks

#### Configuration & Utilities

**`config.js`** - Configuration Constants
- Animation timing
- CSS selectors
- Audio file paths
- Breakpoints

**`utils.js`** - Helper Functions
- Safe DOM querying
- Event listener management
- Class manipulation
- Error handling wrappers

#### `audio-manager.js`
Manages all audio functionality:
- Audio context initialization
- Sound preloading
- Mobile-aware playback
- Mute/unmute controls

#### `navigation-manager.js`
Handles page navigation:
- Portfolio grid navigation
- Project detail views
- Smooth transitions
- State management

#### `ui-manager.js`
Controls UI interactions:
- Theme switching
- Sound toggle
- About section
- Visual feedback

#### `event-handlers.js`
Centralizes event management:
- Click handlers
- Hover effects
- Keyboard navigation
- Touch events

#### `animations.js`
Manages visual effects:
- Star animations
- 3D hover effects
- Transition timing

## 🎨 Customization

### Changing Colors
Edit `css/skins/orange.css` or create a new skin file.

### Modifying Animations
Adjust timing constants in `js/config.js`:
```javascript
ANIMATION: {
  TRANSITION_DELAY: 200,
  LAYER_SWITCH_DELAY: 250,
  // ...
}
```

### Adding Projects
Update the portfolio grid in `index.html` and add corresponding project detail sections.

## 🧪 Testing

### Run Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage report
```

### Test Coverage
- **69 test cases** across 4 test suites
- **100% coverage** of core modules (utils, logger, state-manager, performance-monitor)
- **Automated CI/CD** with GitHub Actions

See [TESTING_SUMMARY.md](TESTING_SUMMARY.md) for detailed test results.

## 🚀 Deployment

The site is configured for Heroku deployment with:
- `Procfile` for web server configuration
- `static.json` for static file serving
- Nginx configuration in `config/nginx.conf.erb`
- **CI/CD Pipeline**: Automated testing on push/PR

## 📝 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 👤 Author

**Elle White**
- Email: ellewhitedev@gmail.com
- LinkedIn: [ellewhitedev](https://www.linkedin.com/in/ellewhitedev/)
- GitHub: [ElleWhiteDev](https://github.com/ElleWhiteDev)

## 📄 License

This project is private and proprietary.

---

Built with ❤️ by Elle White
