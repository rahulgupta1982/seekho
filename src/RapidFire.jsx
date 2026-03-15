import React, { useState, useEffect, useRef } from 'react';
import './RapidFire.css';

function RapidFire({ onBack, level }) {
  const [gameState, setGameState] = useState('start'); // start, playing, end
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  
  const inputRef = useRef(null);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeLeft(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // Focus input when level starts or moving to next question
  useEffect(() => {
      if (gameState === 'playing' && inputRef.current && !feedback) {
          inputRef.current.focus();
      }
  }, [gameState, currentIndex, feedback]);


  const generateQuestions = () => {
    const newQs = [];
    const usedCombinations = new Set();
    
    while (newQs.length < 10) {
        let num1, num2;
        if (level === 1) {
            num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
            num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
        } else {
            num1 = Math.floor(Math.random() * 90) + 10; // 10 to 99
            num2 = Math.floor(Math.random() * 9) + 1;   // 1 to 9
        }
        
        // Randomly swap order so the big number isn't always first (for level 2)
        if (level === 2 && Math.random() > 0.5) {
            [num1, num2] = [num2, num1];
        }

        const combinationKey = `${num1}+${num2}`;
        
        if (!usedCombinations.has(combinationKey)) {
            usedCombinations.add(combinationKey);
            newQs.push({ num1, num2, answer: num1 + num2 });
        }
    }
    setQuestions(newQs);
  };

  const handleStart = () => {
    generateQuestions();
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(0);
    setUserAnswer('');
    setFeedback(null);
    setGameState('playing');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer || isNaN(parseInt(userAnswer)) || feedback !== null) return;

    const currentQ = questions[currentIndex];
    const isCorrect = parseInt(userAnswer, 10) === currentQ.answer;

    if (isCorrect) {
        setScore(prev => prev + 1);
        setFeedback('correct');
    } else {
        setFeedback('incorrect');
    }

    setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
        if (currentIndex < 9) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setGameState('end');
        }
    }, 600); // short delay to show result animation
  };

  const handleChange = (e) => {
      setUserAnswer(e.target.value);
  }

  return (
    <div className="rapid-fire-container fade-in">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      {gameState === 'start' && (
        <div className="start-screen fade-in">
            <h1 className="bounce-in">Rapid Fire: Level {level}</h1>
            <p>10 exercises. How fast can you solve them?</p>
            <button className="start-btn bounce-hover" onClick={handleStart}>
                Start Now!
            </button>
        </div>
      )}

      {gameState === 'playing' && questions.length > 0 && (
        <div className="playing-screen fade-in">
            <div className="stats-bar">
                <span>Problem: {currentIndex + 1}/10</span>
                <span>Time: {timeLeft}s</span>
                <span>Score: {score}</span>
            </div>
            
            <div className={`question-area ${feedback ? feedback : ''}`}>
                <span className="number">{questions[currentIndex].num1}</span>
                <span className="operator">+</span>
                <span className="number">{questions[currentIndex].num2}</span>
                <span className="operator">=</span>
                <form onSubmit={handleSubmit}>
                    <input 
                        ref={inputRef}
                        type="number" 
                        value={userAnswer}
                        onChange={handleChange}
                        readOnly={feedback !== null}
                        className="answer-input"
                    />
                </form>
            </div>
        </div>
      )}

      {gameState === 'end' && (
        <div className="end-screen fade-in">
            <h2 className="bounce-in">Round Complete! 🎉</h2>
            <div className="results">
                <p>Score: {score} / 10</p>
                <p>Time: {timeLeft} seconds</p>
                <p>Speed: {(timeLeft / 10).toFixed(1)} seconds/question</p>
            </div>
            <button className="play-again-btn bounce-hover" onClick={handleStart}>
                Play Again
            </button>
        </div>
      )}
    </div>
  );
}

export default RapidFire;
