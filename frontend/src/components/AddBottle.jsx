import { useState } from 'react';

export default function AddBottle({ onBottleAdded }) {
    const [name, setName] = useState('');
    const [abv, setAbv] = useState('');
    const [distilleryId, setDistilleryId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            //Clear the form
            setName('');
            setAbv('');
            setDistilleryId('');
            //Trigger a refresh og the list
            onBottleAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Add a New Bottle</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Bottle Name (e.g. Signatory Vintage)"
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
            <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Save Bottle</button>
        </form>
    );
}