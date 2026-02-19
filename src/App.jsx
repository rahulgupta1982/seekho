import { useState } from 'react';
import Onboarding from './Onboarding';
import ExerciseSelector from './ExerciseSelector';
import OddEvenGame from './OddEvenGame';
import VerliebteZahlen from './VerliebteZahlen';
import './index.css';



function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'selector', 'playing'
  const [activeGame, setActiveGame] = useState(null);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setCurrentScreen('selector');
  };

  const handleExerciseSelect = (gameId) => {
    setActiveGame(gameId);
    setCurrentScreen('playing');
  };

  return (
    <div className="app-container">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'selector' && (
        <ExerciseSelector user={userProfile} onSelect={handleExerciseSelect} />
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

      {currentScreen === 'playing' && !['odd-even', 'verliebte-zahlen', 'verliebte-zahlen-20'].includes(activeGame) && (
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
