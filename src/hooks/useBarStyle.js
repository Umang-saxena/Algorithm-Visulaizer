// src/hooks/useBarStyles.js
import { useSprings } from '@react-spring/web';

const useBarStyles = (array, comparingIndices, sortedIndices) => {
  return useSprings(array.length, array.map((value, index) => {
    const height = value * 10;
    const isComparing = comparingIndices.includes(index);
    const isSorted = sortedIndices.includes(index);

    return {
      height: `${height}px`,
      backgroundColor: isComparing
        ? '#f39c12'
        : isSorted
        ? '#2ecc71'
        : '#3498db',
      config: { mass: 1, tension: 220, friction: 120 }, // Adjusting for smoother transitions
      opacity: isSorted ? 0.8 : 1, // Slight fade-out for sorted bars
    };
  }));
};

export default useBarStyles;
