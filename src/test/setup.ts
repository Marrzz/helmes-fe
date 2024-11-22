import '@testing-library/jest-dom'
global.ResizeObserver = class {
  observe() {} // No-op
  unobserve() {} // No-op
  disconnect() {} // No-op
}
