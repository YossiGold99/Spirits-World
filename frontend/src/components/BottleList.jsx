import { useState, useEffect } from 'react';

export default function BottleList() {
    // 1. Set up state to hold the bottles and a loading status
    const [bottle, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErorr] = useState(null);

    // 2. Use useEffect to fetch the bottles when the component mounts\
    useEffect(() => {
        const fetchBottles = async () => {
            try {
                // Hit the Django API endpoint
                const response = await fetch('http://localhost:8000/api/bottles/');

                if (!response.ok) {
                    throw new Error('Failed to fetch bottles');
                }

                //Convert the response to JSON
                const data = await response.json();

                //Update the state with the data
                setBottles(data);
                setLoading(false);
            } catch (error) {
                setErorr(error.message);
                setLoading(false);
            }
        };

        fetchBottles();
    }, []); //The empty array ensures this only runs once when loaded

    // 3. Handle loading and error states
    if (loading) return <div>Pouring data...</div>
    if (error) return <div>Error: {error}</div>

    // 4. Render the list of bottles
    return (
        <div className="bottle-list">
            <h2>Whiskey Collection</h2>
            <ul>
                {bottle.map((bottle) => (
                    <li key={bottle.id} style={{ marginBottom: '1rem' }}>
                        <strong>{bottle.distillery_name} {bottle.name}</strong>
                        <p>ABV: {bottle.abv}%</p>
                        {bottle.description && <p><em>{bottle.description}</em></p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}