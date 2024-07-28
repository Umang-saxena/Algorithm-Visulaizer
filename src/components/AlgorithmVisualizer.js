// src/components/AlgorithmVisualizer.js
import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import useBarStyles from '../hooks/useBarStyle';

function AlgorithmVisualizer({ array, setArray }) {
  const [algorithm, setAlgorithm] = useState('');
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);

  // Create steps for animation
  const createSteps = async (array) => {
    const steps = [];
    await mergeSort(array, 0, array.length - 1, steps);
    setSteps(steps);
  };

  useEffect(() => {
    if (steps.length > 0) {
      const interval = setInterval(() => {
        if (step < steps.length) {
          setComparingIndices(steps[step].comparing);
          setSortedIndices(steps[step].sorted);
          setArray([...steps[step].array]);
          setStep(prev => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Slow down the animation speed
      return () => clearInterval(interval);
    }
  }, [step, steps, array, setArray]);

  const mergeSort = async (array, left, right, steps) => {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, left, middle, steps);
    await mergeSort(array, middle + 1, right, steps);
    await merge(array, left, middle, right, steps);
  };

  const merge = async (array, left, middle, right, steps) => {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);
    let leftIndex = 0, rightIndex = 0, currentIndex = left;
    const newSortedIndices = [];

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      const comparingIndices = [currentIndex];
      if (leftArray[leftIndex] <= rightArray[rightIndex]) {
        array[currentIndex] = leftArray[leftIndex];
        leftIndex++;
      } else {
        array[currentIndex] = rightArray[rightIndex];
        rightIndex++;
      }
      currentIndex++;
      newSortedIndices.push(currentIndex);
      steps.push({ array: [...array], comparing: comparingIndices, sorted: newSortedIndices });
    }

    while (leftIndex < leftArray.length) {
      const comparingIndices = [currentIndex];
      array[currentIndex] = leftArray[leftIndex];
      leftIndex++;
      currentIndex++;
      newSortedIndices.push(currentIndex);
      steps.push({ array: [...array], comparing: comparingIndices, sorted: newSortedIndices });
    }

    while (rightIndex < rightArray.length) {
      const comparingIndices = [currentIndex];
      array[currentIndex] = rightArray[rightIndex];
      rightIndex++;
      currentIndex++;
      newSortedIndices.push(currentIndex);
      steps.push({ array: [...array], comparing: comparingIndices, sorted: newSortedIndices });
    }
  };

  // Get animated styles
  const barStyles = useBarStyles(array, comparingIndices, sortedIndices);

  return (
    <div>
      <h2>Currently Visualizing: {algorithm}</h2>
      <div>
        <button onClick={() => { setAlgorithm('Merge Sort'); createSteps([...array]); setStep(0); }}>Merge Sort</button>
        <button onClick={() => { setAlgorithm('Quick Sort'); /* Implement Quick Sort steps here */ }}>Quick Sort</button>
      </div>
      <div id="visualization-container">
        <div id="visualization">
          {array.map((value, index) => (
            <animated.div
              key={index}
              className={`bar ${comparingIndices.includes(index) ? 'comparing' : ''} ${sortedIndices.includes(index) ? 'sorted' : ''}`}
              style={{ ...barStyles[index], height: `${value * 3}px` }} // Adjust height scaling as needed
            >
              <div className="bar-label">{value}</div>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
