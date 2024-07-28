// src/components/ArrayInput.js
import React, { useState } from 'react';

function ArrayInput({ setArray }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleVisualize = () => {
    const array = input.split(',').map(Number);
    setArray(array);
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={handleChange} 
        placeholder="Enter array elements separated by commas"
      />
      
      <button onClick={handleVisualize}>Visualize</button>
    </div>
  );
}

export default ArrayInput;
