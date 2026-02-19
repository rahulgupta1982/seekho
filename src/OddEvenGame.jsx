import { useState, useEffect } from 'react';
import './OddEvenGame.css';
import confetti from 'canvas-confetti';

const MAX_SCORE = 10;

function OddEvenGame({ onBack }) {
    const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * 20) + 1);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [isGameOver, setIsGameOver] = useState(false);

    const generateNewNumber = () => {
        setCurrentNumber(Math.floor(Math.random() * 20) + 1);
        setFeedback(null);
    };

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF5E7E', '#4FB0FF', '#FFC03F', '#4ADE80']
        });
    };

    const handleGuess = (guessMsg) => {
        if (feedback !== null || isGameOver) return;

        const isEven = currentNumber % 2 === 0;
        const isCorrect = (guessMsg === 'even' && isEven) || (guessMsg === 'odd' && !isEven);

        if (isCorrect) {
            setFeedback('correct');
            setScore(s => s + 1);

            const newStreak = streak + 1;
            setStreak(newStreak);

            if (newStreak % 5 === 0) {
                fireConfetti();
            }

            if (score + 1 >= MAX_SCORE) {
                setTimeout(() => {
                    setIsGameOver(true);
                    fireConfetti();
                }, 1000);
            } else {
                setTimeout(generateNewNumber, 1000);
            }

        } else {
            setFeedback('wrong');
            setStreak(0);
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        <div className="game-container fade-in">
            <header className="game-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <div className="score-board">
                    <div className="score">⭐ {score}/{MAX_SCORE}</div>
                    <div className="streak">🔥 Streak: {streak}</div>
                </div>
            </header>

            {!isGameOver ? (
                <main className="game-area">
                    <div className={`number-display ${feedback === 'correct' ? 'pop' : ''} ${feedback === 'wrong' ? 'shake' : ''}`}>
                        {currentNumber}
                    </div>

                    <div className="controls">
                        <button
                            className="game-btn odd-btn bounce-hover"
                            onClick={() => handleGuess('odd')}
                            disabled={feedback !== null}
                        >
                            Odd
                        </button>
                        <button
                            className="game-btn even-btn bounce-hover"
                            onClick={() => handleGuess('even')}
                            disabled={feedback !== null}
                        >
                            Even
                        </button>
                    </div>

                    {feedback && (
                        <div className={`feedback-message ${feedback}`}>
                            {feedback === 'correct' ? 'Great Job! 🌟' : 'Try Again! 🤔'}
                        </div>
                    )}
                </main>
            ) : (
                <div className="game-over bounce-in">
                    <h2>You Did It! 🎉</h2>
                    <p>You scored {score} stars and had a max streak of {streak}!</p>
                    <button className="play-again-btn bounce-hover" onClick={() => {
                        setScore(0);
                        setStreak(0);
                        setIsGameOver(false);
                        generateNewNumber();
                    }}>
                        Play Again 🔄
                    </button>
                </div>
            )}
        </div>
    );
}

export default OddEvenGame;
