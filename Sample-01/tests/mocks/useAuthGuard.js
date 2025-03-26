// Mock implementation for useAuthGuard hook
module.exports = function useAuthGuard() {
  return {
    isAuthenticated: true,
    guardComponent: null
  };
}; 