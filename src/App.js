// src/App.js
import React, { useState } from 'react';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import Header from './components/Header';
import ArrayInput from './components/ArrayInput';

function App() {
  const [array, setArray] = useState([]);

  return (
    <div className="App">
      <Header />
      <ArrayInput setArray={setArray} />
      <AlgorithmVisualizer array={array} setArray={setArray} />
    </div>
  );
}

export default App;
