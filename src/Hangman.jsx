import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Hangman.css';

const WORD_LISTS = {
    english: ['APPLE', 'BANANA', 'CAT', 'DOG', 'ELEPHANT', 'FLOWER', 'GIRAFFE', 'HOUSE', 'ICE', 'JUMP'],
    german: ['APFEL', 'BANANE', 'KATZE', 'HUND', 'ELEFANT', 'BLUME', 'GIRAFFE', 'HAUS', 'EIS', 'SPRINGEN']
};

const MAX_LIVES = 7;

function Hangman({ onBack }) {
    const [language, setLanguage] = useState('english');
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost' | 'custom-entry'
    const [customInput, setCustomInput] = useState('');

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
        setCustomInput('');
    };

    const startCustomGame = (e) => {
        e.preventDefault();
        if (!customInput.trim()) return;
        setWord(customInput.trim().toUpperCase());
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setStatus('playing');
        setCustomInput('');
    };

    const handleGuess = (letter) => {
        if (status !== 'playing' || guessedLetters.has(letter)) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            const newWrong = wrongGuesses + 1;
            setWrongGuesses(newWrong);
            if (newWrong >= MAX_LIVES) {
                setStatus('lost');
            }
        } else {
            // Check win
            const isWon = word.split('').every(char =>
                char === ' ' || newGuessed.has(char)
            );
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
                <div className="header-controls">
                    <div className="language-toggle">
                        <button
                            className={language === 'english' ? 'active' : ''}
                            onClick={() => setLanguage('english')}
                        >🇬🇧 EN</button>
                        <button
                            className={language === 'german' ? 'active' : ''}
                            onClick={() => setLanguage('german')}
                        >🇩🇪 DE</button>
                    </div>
                    <button
                        className="custom-mode-btn"
                        onClick={() => setStatus('custom-entry')}
                    >
                        ⌨️ Parent Mode
                    </button>
                </div>
            </header>

            <main className="hangman-area">
                {status === 'custom-entry' ? (
                    <div className="custom-entry-box bounce-in">
                        <h3>Parent Mode 🤫</h3>
                        <p>Type a word for your daughter to guess!</p>
                        <form onSubmit={startCustomGame}>
                            <input
                                type="password"
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value.toUpperCase())}
                                placeholder="TYPE WORD HERE..."
                                autoFocus
                                className="custom-word-input"
                            />
                            <div className="entry-btns">
                                <button type="submit" className="play-again-btn">Start Game! 🚀</button>
                                <button type="button" className="back-btn" onClick={() => setStatus('playing')}>Cancel</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="lives-display">
                            {Array.from({ length: MAX_LIVES }).map((_, i) => (
                                <span key={i} className={`heart-life ${i < MAX_LIVES - wrongGuesses ? 'alive' : 'broken'}`}>
                                    {i < MAX_LIVES - wrongGuesses ? '❤️' : '💔'}
                                </span>
                            ))}
                        </div>

                        <div className="word-display">
                            {word.split('').map((letter, idx) => (
                                <span key={idx} className={`letter-slot ${letter === ' ' ? 'space' : ''}`}>
                                    {letter === ' ' ? ' ' : (guessedLetters.has(letter) || status === 'lost' ? letter : '_')}
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
                                <h2>{status === 'won' ? 'Amazing! You did it! ✨🏆' : 'Oh no! Try again!'}</h2>
                                <p>The word was: <strong>{word}</strong></p>
                                <button className="play-again-btn bounce-hover" onClick={resetGame}>
                                    Next Word 🔄
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Hangman;
