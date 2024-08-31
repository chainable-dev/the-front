import '@testing-library/jest-dom/extend-expect';

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock console.error and console.warn to prevent them from cluttering test output
console.error = jest.fn();
console.warn = jest.fn();

// Add polyfills
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.location
delete window.location;
window.location = {
  origin: 'http://localhost:3000',
  ...window.location,
};
