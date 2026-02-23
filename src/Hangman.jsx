import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Hangman.css';

const WORD_LISTS = {
    english: ['APPLE', 'BANANA', 'CAT', 'DOG', 'ELEPHANT', 'FLOWER', 'GIRAFFE', 'HOUSE', 'ICE', 'JUMP'],
    german: ['APFEL', 'BANANE', 'KATZE', 'HUND', 'ELEFANT', 'BLUME', 'GIRAFFE', 'HAUS', 'EIS', 'SPRINGEN']
};

const MAX_WRONG = 6;

function Hangman({ onBack }) {
    const [language, setLanguage] = useState('english');
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost'

    useEffect(() => {
        resetGame();
    }, [language]);

    const resetGame = () => {
        const list = WORD_LISTS[language];
        const randomWord = list[Math.floor(Math.random() * list.length)];
        setWord(randomWord);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setStatus('playing');
    };

    const handleGuess = (letter) => {
        if (status !== 'playing' || guessedLetters.has(letter)) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            const newWrong = wrongGuesses + 1;
            setWrongGuesses(newWrong);
            if (newWrong >= MAX_WRONG) {
                setStatus('lost');
            }
        } else {
            // Check win
            const isWon = word.split('').every(char => newGuessed.has(char));
            if (isWon) {
                setStatus('won');
                fireConfetti();
            }
        }
    };

    const fireConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="game-container hangman-container fade-in">
            <header className="game-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <div className="language-toggle">
                    <button
                        className={language === 'english' ? 'active' : ''}
                        onClick={() => setLanguage('english')}
                    >🇬🇧 English</button>
                    <button
                        className={language === 'german' ? 'active' : ''}
                        onClick={() => setLanguage('german')}
                    >🇩🇪 Deutsch</button>
                </div>
            </header>

            <main className="hangman-area">
                <div className="visual-stage">
                    {/* Balloon Theme: The balloon floats. Wrong guesses add "thorny bushes" or move a cactus closer. */}
                    <div className={`balloon-visual wrong-${wrongGuesses}`}>
                        <div className="balloon">🎈</div>
                        <div className="basket">🧺</div>
                        <div className="cactus">🌵</div>
                    </div>
                </div>

                <div className="word-display">
                    {word.split('').map((letter, idx) => (
                        <span key={idx} className="letter-slot">
                            {guessedLetters.has(letter) || status === 'lost' ? letter : '_'}
                        </span>
                    ))}
                </div>

                {status === 'playing' ? (
                    <div className="keyboard">
                        {alphabet.map(letter => (
                            <button
                                key={letter}
                                className={`key ${guessedLetters.has(letter) ? (word.includes(letter) ? 'correct' : 'wrong') : ''}`}
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.has(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="game-result bounce-in">
                        <h2>{status === 'won' ? 'Amazing! You saved the balloon! 🎈✨' : 'Oops! The cactus popped it! 🌵'}</h2>
                        <p>The word was: <strong>{word}</strong></p>
                        <button className="play-again-btn bounce-hover" onClick={resetGame}>
                            Play Again 🔄
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Hangman;
