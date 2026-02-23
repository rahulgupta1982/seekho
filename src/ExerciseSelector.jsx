import './ExerciseSelector.css';

const EXERCISES = [
    {
        id: 'odd-even',
        title: 'Odd & Even Explorer',
        description: 'Pop the balloons! Are they Odd or Even?',
        minAge: 4,
        maxAge: 99,
        ageLabel: '4-5 Years',
        difficulty: 'easy',
        subject: 'math',
        icon: '🎈',
        color: 'var(--primary)'
    },
    {
        id: 'verliebte-zahlen',
        title: 'Numbers in Love',
        description: 'Find the heart partner to make 10! ❤️',
        minAge: 5,
        maxAge: 99,
        ageLabel: '5-6 Years',
        difficulty: 'medium',
        subject: 'math',
        icon: '💖',
        color: '#FF3B60'
    },
    {
        id: 'verliebte-zahlen-20',
        title: 'Numbers in Love (Make 20)',
        description: 'Find the heart partner to make 20! 💘',
        minAge: 6,
        maxAge: 99,
        ageLabel: '6+ Years',
        difficulty: 'hard',
        subject: 'math',
        icon: '💘',
        color: '#FF1493'
    },
    {
        id: 'addition',
        title: 'Addition Adventure',
        description: 'Add numbers together to win stars!',
        minAge: 5,
        maxAge: 99,
        ageLabel: '5-6 Years',
        difficulty: 'medium',
        subject: 'math',
        icon: '➕',
        color: 'var(--secondary)'
    },
    {
        id: 'subtraction',
        title: 'Subtraction Safari',
        description: 'Take away numbers to solve the puzzle!',
        minAge: 6,
        maxAge: 99,
        ageLabel: '6+ Years',
        difficulty: 'medium',
        subject: 'math',
        icon: '➖',
        color: 'var(--success)'
    },
    {
        id: 'hangman',
        title: 'Word Wizard (Hangman)',
        description: 'Guess the hidden words!',
        minAge: 6,
        maxAge: 99,
        ageLabel: '6+ Years',
        difficulty: 'medium',
        subject: 'language',
        icon: '🔤',
        color: '#9C27B0'
    }
];

function ExerciseSelector({ user, subject, onSelect, onBack }) {
    // Filter exercises based on age and subject
    const availableExercises = EXERCISES.filter(
        (ex) => user.age >= ex.minAge && user.age <= ex.maxAge && ex.subject === subject
    );

    // Group exercises by difficulty
    const groupedExercises = {
        easy: availableExercises.filter(ex => ex.difficulty === 'easy'),
        medium: availableExercises.filter(ex => ex.difficulty === 'medium'),
        hard: availableExercises.filter(ex => ex.difficulty === 'hard'),
    };

    const difficultyLabels = {
        easy: '🟢 Easy',
        medium: '🟡 Medium',
        hard: '🔴 Hard'
    };

    const subjectTitles = {
        math: 'Math Explorer 🚀',
        language: 'Language Legends 📚'
    };

    return (
        <div className="selector-container fade-in">
            <header className="selector-header">
                <button className="back-btn" onClick={onBack} style={{ position: 'absolute', left: '20px', top: '20px' }}>
                    ← Back
                </button>
                <h1 className="bounce-in">{subjectTitles[subject]}</h1>
                <p>Hi {user.name}! What would you like to play today?</p>
            </header>

            <div className="exercise-sections">
                {availableExercises.length === 0 && (
                    <p className="no-games">More games are coming soon for your age!</p>
                )}

                {['easy', 'medium', 'hard'].map((level) => {
                    const group = groupedExercises[level];
                    if (group.length === 0) return null;

                    return (
                        <div key={level} className="difficulty-section">
                            <h2 className="difficulty-title">{difficultyLabels[level]}</h2>
                            <div className="cards-grid">
                                {group.map((exercise, index) => (
                                    <button
                                        key={exercise.id}
                                        className="exercise-card bounce-hover"
                                        onClick={() => onSelect(exercise.id)}
                                        style={{
                                            '--card-color': exercise.color,
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        <div className="card-icon" style={{ backgroundColor: exercise.color }}>
                                            {exercise.icon}
                                        </div>
                                        <div className="card-content">
                                            <div className="card-header-row">
                                                <h3>{exercise.title}</h3>
                                                <span className="age-tag">{exercise.ageLabel}</span>
                                            </div>
                                            <p>{exercise.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExerciseSelector;
