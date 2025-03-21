import React, { ReactNode } from 'react';

// Simple test wrapper component
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  );
};

export default TestWrapper; 