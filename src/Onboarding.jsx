import { useState } from 'react';
import './Onboarding.css';

function Onboarding({ onComplete }) {
    const [name, setName] = useState('Ritika');
    const [age, setAge] = useState('7');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && age) {
            onComplete({ name, age: parseInt(age, 10) });
        }
    };

    return (
        <div className="onboarding-container fade-in">
            <div className="onboarding-card">
                <h1 className="title bounce-in">Welcome to Math Fun! 🎈</h1>
                <p className="subtitle">Let's set up your profile to start playing.</p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="input-group">
                        <label htmlFor="name">What's your name?</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ritika"
                            required
                            className="fun-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="age">How old are you?</label>
                        <div className="age-selector">
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="e.g. 7"
                                min="1"
                                max="100"
                                required
                                className="fun-input"
                                style={{ width: '150px' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="start-btn bounce-hover"
                        disabled={!name || !age}
                    >
                        Let's Play! 🚀
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Onboarding;
