import { useState, useEffect } from 'react';
import './VerliebteZahlen.css';
import confetti from 'canvas-confetti';

const MAX_SCORE = 10;

function VerliebteZahlen({ onBack, targetSum = 10 }) {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [isGameOver, setIsGameOver] = useState(false);

    // Initialize first number
    useEffect(() => {
        generateNewNumber();
    }, []);

    const generateNewNumber = () => {
        // Pick a number between 0 and targetSum
        setCurrentNumber(Math.floor(Math.random() * (targetSum + 1)));
        setFeedback(null);
    };

    const fireConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FF5E7E', '#FF3B60', '#FFA4B6'] // Heart pinks/reds
        });
    };

    const handleGuess = (guessNum) => {
        if (feedback !== null || isGameOver) return;

        const isCorrect = currentNumber + guessNum === targetSum;

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
        <div className="game-container fade-in verliebte-bg">
            <header className="game-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <div className="score-board">
                    <div className="score">⭐ {score}/{MAX_SCORE}</div>
                    <div className="streak">🔥 Streak: {streak}</div>
                </div>
            </header>

            {!isGameOver ? (
                <main className="vz-game-area">
                    <div className="heart-container">
                        <div className={`heart ${feedback === 'correct' ? 'heart-beat' : ''} ${feedback === 'wrong' ? 'shake' : ''}`}>
                            <span className="heart-number">{currentNumber}</span>
                        </div>
                        <div className="plus-sign">+</div>
                        <div className={`heart empty-heart ${feedback === 'correct' ? 'heart-beat' : ''}`}>
                            <span className="heart-number">?</span>
                        </div>
                        <div className="equals-sign">= {targetSum}</div>
                    </div>

                    <div className="numpad">
                        {Array.from({ length: targetSum + 1 }, (_, i) => i).map(num => (
                            <button
                                key={num}
                                className="numpad-btn bounce-hover"
                                onClick={() => handleGuess(num)}
                                disabled={feedback !== null}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

                    {feedback && (
                        <div className={`feedback-message ${feedback}`}>
                            {feedback === 'correct' ? 'Perfect Match! ❤️' : 'Try Again! 💔'}
                        </div>
                    )}
                </main>
            ) : (
                <div className="game-over bounce-in">
                    <h2>Lovely Work! 🎉❤️</h2>
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

export default VerliebteZahlen;
