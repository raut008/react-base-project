import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Card from './components/Card/Card';

function App() {
  return (
    <ErrorBoundary>
      <Card
        title="React Base Project"
        description="React Template of Projects with ESLint and Prettier"
      />
    </ErrorBoundary>
  );
}

export default App;
