// src/components/AlgorithmVisualizer.js
import React, { useState } from 'react';

function AlgorithmVisualizer({ array, setArray }) {
  const [algorithm, setAlgorithm] = useState('');
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const visualizeArray = () => {
    return (
      <div id="visualization">
        {array.map((value, index) => (
          <div
            key={index}
            className={`bar ${comparingIndices.includes(index) ? 'comparing' : sortedIndices.includes(index) ? 'sorted' : 'default'}`}
            style={{ height: `${value * 10}px` }}
          >
            <div className="bar-label">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const mergeSort = async (array, left = 0, right = array.length - 1) => {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, left, middle);
    await mergeSort(array, middle + 1, right);
    await merge(array, left, middle, right);
  };

  const merge = async (array, left, middle, right) => {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);
    let leftIndex = 0, rightIndex = 0, currentIndex = left;
    const newSortedIndices = [];
    
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      setComparingIndices([currentIndex, left + leftIndex + rightArray.length]);
      if (leftArray[leftIndex] <= rightArray[rightIndex]) {
        array[currentIndex] = leftArray[leftIndex];
        leftIndex++;
      } else {
        array[currentIndex] = rightArray[rightIndex];
        rightIndex++;
      }
      currentIndex++;
      newSortedIndices.push(currentIndex);
      setArray([...array]);
      await sleep(500); // Adjust the delay for better visualization
    }

    while (leftIndex < leftArray.length) {
      setComparingIndices([currentIndex]);
      array[currentIndex] = leftArray[leftIndex];
      leftIndex++;
      currentIndex++;
      newSortedIndices.push(currentIndex);
      setArray([...array]);
      await sleep(500); // Adjust the delay for better visualization
    }

    while (rightIndex < rightArray.length) {
      setComparingIndices([currentIndex]);
      array[currentIndex] = rightArray[rightIndex];
      rightIndex++;
      currentIndex++;
      newSortedIndices.push(currentIndex);
      setArray([...array]);
      await sleep(500); // Adjust the delay for better visualization
    }

    setSortedIndices([...newSortedIndices]);
  };

  const quickSort = async (array, low = 0, high = array.length - 1) => {
    if (low < high) {
      const pi = await partition(array, low, high);
      await quickSort(array, low, pi - 1);
      await quickSort(array, pi + 1, high);
    }
  };

  const partition = async (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;
    const newComparingIndices = [];
    for (let j = low; j < high; j++) {
      setComparingIndices([i + 1, j]);
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        await sleep(500); // Adjust the delay for better visualization
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArray([...array]);
    await sleep(500); // Adjust the delay for better visualization
    return i + 1;
  };

  return (
    <div>
      <h2>Currently Visualizing: {algorithm}</h2>
      <div>
        <button onClick={() => { setAlgorithm('Merge Sort'); mergeSort([...array]); }}>Merge Sort</button>
        <button onClick={() => { setAlgorithm('Quick Sort'); quickSort([...array]); }}>Quick Sort</button>
      </div>
      {visualizeArray()}
    </div>
  );
}

export default AlgorithmVisualizer;
