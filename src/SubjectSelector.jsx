import React from 'react';
import './SubjectSelector.css';

const SUBJECTS = [
    {
        id: 'math',
        title: 'Math Explorer',
        description: 'Numbers, shapes, and fun puzzles! 🚀',
        icon: '🚀',
        color: '#FF5E7E'
    },
    {
        id: 'language',
        title: 'Language Legends',
        description: 'Words, letters, and story fun! 📚',
        icon: '📚',
        color: '#4FB0FF'
    }
];

function SubjectSelector({ onSelect }) {
    return (
        <div className="subject-selector-container fade-in">
            <header className="subject-header">
                <h1 className="bounce-in">Choose Your Quest! 🗺️</h1>
                <p>What do you want to learn today?</p>
            </header>

            <div className="subject-grid">
                {SUBJECTS.map((subject) => (
                    <button
                        key={subject.id}
                        className="subject-card bounce-hover"
                        onClick={() => onSelect(subject.id)}
                        style={{ '--subject-color': subject.color }}
                    >
                        <div className="subject-icon" style={{ backgroundColor: subject.color }}>
                            {subject.icon}
                        </div>
                        <div className="subject-content">
                            <h3>{subject.title}</h3>
                            <p>{subject.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SubjectSelector;
