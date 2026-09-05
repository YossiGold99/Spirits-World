import { useState, useEffect } from 'react';

export default function AddBottle({ onBottleAdded }) {
    const [name, setName] = useState('');
    const [abv, setAbv] = useState('');
    const [distilleryId, setDistilleryId] = useState('');

    // New state to hold the list of distilleries
    const [distilleries, setDistilleries] = useState([]);

    // Fetch distilleries when the form loads
    useEffect(() => {
        const fetchDistilleries = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/distilleries/');
                if (response.ok) {
                    const data = await response.json();
                    setDistilleries(data);
                }
            } catch (error) {
                console.error("Failed to fetch distilleries:", error);
            }
        };

        fetchDistilleries();
    }, []);

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
                setName('');
                setAbv('');
                setDistilleryId('');
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

                {/* The new dropdown menu */}
                <select
                    value={distilleryId}
                    onChange={(e) => setDistilleryId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a Distillery...</option>
                    {distilleries.map((distillery) => (
                        <option key={distillery.id} value={distillery.id}>
                            {distillery.name} ({distillery.country})
                        </option>
                    ))}
                </select>

            </div>
            <button type="submit" className="submit-btn">Save Bottle</button>
        </form>
    );
}