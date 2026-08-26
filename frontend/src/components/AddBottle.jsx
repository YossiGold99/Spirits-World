import { useState } from 'react';

export default function AddBottle({ onBottleAdded }) {
    const [name, setName] = useState('');
    const [abv, setAbv] = useState('');
    const [distilleryId, setDistilleryId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/bottles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    abv: abv,
                    distillery: distilleryId,
                    description: ''
                })
            });

            if (response.ok) {
                // Clear the form fields
                setName('');
                setAbv('');
                setDistilleryId('');
                // Trigger a refresh of the list in App.jsx
                onBottleAdded();
            } else {
                console.error("Failed to add bottle. Check your Distillery ID.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bottle-form">
            <h2>Add a New Bottle</h2>
            <div className="form-inputs">
                <input
                    type="text"
                    placeholder="Bottle Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="ABV %"
                    value={abv}
                    onChange={(e) => setAbv(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Distillery ID (e.g. 1)"
                    value={distilleryId}
                    onChange={(e) => setDistilleryId(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="submit-btn">Save Bottle</button>
        </form>
    );
}