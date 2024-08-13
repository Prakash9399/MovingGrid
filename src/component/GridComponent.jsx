import React, { useState, useEffect } from 'react';
import './GridComponent.css';

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// Define patterns for all letters (A-Z)
const letterPatterns = {
    A: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    B: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    C: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
    ],
    D: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
    ],
    E: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
    ],
    F: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    G: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    H: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    I: [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
    ],
    J: [
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 1, 1, 1, 0],
    ],
    K: [
      [1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [1, 0, 0, 1, 1],
    ],
    L: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
    ],
    M: [
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    N: [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 0, 1],
    ],
    O: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    P: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    Q: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
    ],
    R: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ],
    S: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    T: [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    U: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    V: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    W: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    X: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ],
    Y: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    Z: [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
  };
  



  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  };
  
 
  
  const getLetterPattern = (char) => {
    return letterPatterns[char.toUpperCase()] || [];
  };
  
  const generateTextGrid = (rows, cols, patterns, colors, positions) => {
    const newGridColors = Array(rows).fill().map(() => Array(cols).fill('#000'));
  
    patterns.forEach((pattern, index) => {
      const color = colors[index];
      const position = positions[index];
  
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          const row = Math.floor(rows / 2) - Math.floor(pattern.length / 2) + i;
          const col = position + j;
          if (pattern[i][j] === 1 && col < cols && col >= 0) {
            newGridColors[row][col] = color;
          }
        }
      }
    });
  
    return newGridColors;
  };
  
  const GridComponent = () => {
    const rows = 15;
    const cols = 20;
  
    const [colors, setColors] = useState(Array(rows).fill().map(() => Array(cols).fill('#000')));
    const [letterPositions, setLetterPositions] = useState([cols - 5, cols + 5]); // Start at different positions
    const [letterColors, setLetterColors] = useState([getRandomColor(), getRandomColor()]); // Random colors for the letters
    const [letterPatterns, setLetterPatterns] = useState([
      getLetterPattern(getRandomLetter()),
      getLetterPattern(getRandomLetter())
    ]); // Dynamic letter patterns
  
    // Effect to update the color and letter every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setLetterColors([getRandomColor(), getRandomColor()]);
        setLetterPatterns([getLetterPattern(getRandomLetter()), getLetterPattern(getRandomLetter())]);
      }, 5000); // Update every 5 seconds
  
      return () => clearInterval(interval);
    }, []);
  
    // Effect to update the position every 100ms
    useEffect(() => {
      const positionInterval = setInterval(() => {
        setLetterPositions(prev => {
          const newPositions = prev.map(pos => (pos > -5 ? pos - 1 : cols));
          setColors(generateTextGrid(rows, cols, letterPatterns, letterColors, newPositions));
          return newPositions;
        });
      }, 100); // Update position every 100ms
  
      return () => clearInterval(positionInterval);
    }, [letterColors, letterPatterns]);
  
    return (
      <div className="grid-container">
        <div className="grid">
          {colors.map((row, i) =>
            row.map((color, j) => (
              <div
                key={`${i}-${j}`}
                style={{ backgroundColor: color }}
                className="grid-square"
              />
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default GridComponent;