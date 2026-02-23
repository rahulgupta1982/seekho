import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Hangman.css';

const WORD_LISTS = {
    english: [
        { word: 'APPLE', hint: 'A red or green crunchy fruit 🍎' },
        { word: 'BANANA', hint: 'A long yellow fruit monkeys love 🍌' },
        { word: 'CAT', hint: 'A furry pet that says Meow 🐱' },
        { word: 'DOG', hint: 'A loyal pet that says Woof 🐶' },
        { word: 'ELEPHANT', hint: 'A huge animal with a long trunk 🐘' },
        { word: 'FLOWER', hint: 'Something pretty that grows in the garden 🌸' },
        { word: 'GIRAFFE', hint: 'An animal with a very long neck 🦒' },
        { word: 'HOUSE', hint: 'A place where you live 🏠' },
        { word: 'ICE', hint: 'Very cold frozen water 🧊' },
        { word: 'JUMP', hint: 'To spring off the ground with your feet 👟' }
    ],
    german: [
        { word: 'APFEL', hint: 'Eine rote oder grüne knackige Frucht 🍎' },
        { word: 'BANANE', hint: 'Eine lange gelbe Frucht, die Affen lieben 🍌' },
        { word: 'KATZE', hint: 'Ein flauschiges Haustier, das Miau sagt 🐱' },
        { word: 'HUND', hint: 'Ein treues Haustier, das Wuff sagt 🐶' },
        { word: 'ELEFANT', hint: 'Ein riesiges Tier mit einem langen Rüssel 🐘' },
        { word: 'BLUME', hint: 'Etwas Hübsches, das im Garten wächst 🌸' },
        { word: 'GIRAFFE', hint: 'Ein Tier mit einem sehr langen Hals 🦒' },
        { word: 'HAUS', hint: 'Ein Ort, an dem du wohnst 🏠' },
        { word: 'EIS', hint: 'Sehr kaltes gefrorenes Wasser 🧊' },
        { word: 'SPRINGEN', hint: 'Mit den Füßen vom Boden abheben 👟' }
    ]
};

const MAX_LIVES = 7;

function Hangman({ onBack }) {
    const [language, setLanguage] = useState('english');
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost' | 'custom-entry'
    const [customWord, setCustomWord] = useState('');
    const [customHint, setCustomHint] = useState('');

    useEffect(() => {
        resetGame();
    }, [language]);

    const resetGame = () => {
        const list = WORD_LISTS[language];
        const randomItem = list[Math.floor(Math.random() * list.length)];
        setWord(randomItem.word);
        setHint(randomItem.hint);
        setShowHint(false);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setStatus('playing');
        setCustomWord('');
        setCustomHint('');
    };

    const startCustomGame = (e) => {
        e.preventDefault();
        if (!customWord.trim()) return;
        setWord(customWord.trim().toUpperCase());
        setHint(customHint.trim() || 'A special secret word! 🤫');
        setShowHint(false);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setStatus('playing');
        setCustomWord('');
        setCustomHint('');
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
                        <p>Type a word and a secret hint!</p>
                        <form onSubmit={startCustomGame}>
                            <input
                                type="password"
                                value={customWord}
                                onChange={(e) => setCustomWord(e.target.value.toUpperCase())}
                                placeholder="TYPE WORD HERE..."
                                autoFocus
                                className="custom-word-input"
                            />
                            <input
                                type="text"
                                value={customHint}
                                onChange={(e) => setCustomHint(e.target.value)}
                                placeholder="TYPE HINT HERE (Optional)"
                                className="custom-hint-input"
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

                        <div className="hint-section">
                            {showHint ? (
                                <div className="hint-bubble bounce-in">
                                    <strong>Hint:</strong> {hint}
                                </div>
                            ) : (
                                <button className="hint-btn bounce-hover" onClick={() => setShowHint(true)}>
                                    💡 Need a hint?
                                </button>
                            )}
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
