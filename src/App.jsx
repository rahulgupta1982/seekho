import { useState } from 'react';
import Onboarding from './Onboarding';
import SubjectSelector from './SubjectSelector';
import ExerciseSelector from './ExerciseSelector';
import OddEvenGame from './OddEvenGame';
import VerliebteZahlen from './VerliebteZahlen';
import Hangman from './Hangman';
import RapidFire from './RapidFire';
import './index.css';



function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding' | 'subject-selector' | 'selector' | 'playing'
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    setCurrentScreen('subject-selector');
  };

  const handleSubjectSelect = (subject) => {
    setActiveSubject(subject);
    setCurrentScreen('selector');
  };

  const handleGameSelect = (gameId) => {
    setActiveGame(gameId);
    setCurrentScreen('playing');
  };

  return (
    <div className="app-container">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'subject-selector' && (
        <SubjectSelector onSelect={handleSubjectSelect} />
      )}

      {currentScreen === 'selector' && (
        <ExerciseSelector
          user={user}
          subject={activeSubject}
          onSelect={handleGameSelect}
          onBack={() => setCurrentScreen('subject-selector')}
        />
      )}

      {currentScreen === 'playing' && activeGame === 'odd-even' && (
        <OddEvenGame onBack={() => setCurrentScreen('selector')} />
      )}

      {currentScreen === 'playing' && activeGame === 'verliebte-zahlen' && (
        <VerliebteZahlen onBack={() => setCurrentScreen('selector')} />
      )}

      {currentScreen === 'playing' && activeGame === 'verliebte-zahlen-20' && (
        <VerliebteZahlen onBack={() => setCurrentScreen('selector')} targetSum={20} />
      )}

      {currentScreen === 'playing' && activeGame === 'hangman' && (
        <Hangman onBack={() => setCurrentScreen('selector')} />
      )}

      {currentScreen === 'playing' && activeGame === 'rapid-fire-1' && (
        <RapidFire onBack={() => setCurrentScreen('selector')} level={1} />
      )}

      {currentScreen === 'playing' && activeGame === 'rapid-fire-2' && (
        <RapidFire onBack={() => setCurrentScreen('selector')} level={2} />
      )}

      {currentScreen === 'playing' && (activeGame === 'addition' || activeGame === 'subtraction') && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>{activeGame.replace('-', ' ')}</h2>
          <p>This game is under construction! 🚧</p>
          <button
            className="back-btn"
            onClick={() => setCurrentScreen('selector')}
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.2rem' }}
          >
            ← Back to Games
          </button>
        </div>
      )}

      {currentScreen === 'playing' && !['odd-even', 'verliebte-zahlen', 'verliebte-zahlen-20', 'hangman', 'addition', 'subtraction', 'rapid-fire-1', 'rapid-fire-2'].includes(activeGame) && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>{activeGame.replace('-', ' ')}</h2>
          <p>This game is under construction! 🚧</p>
          <button
            onClick={() => setCurrentScreen('selector')}
            style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--accent)', color: 'white', borderRadius: '10px' }}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
