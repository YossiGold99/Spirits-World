import { useState, useEffect } from 'react';

export default function BottleList() {
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBottles = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/bottles/');

                if (!response.ok) {
                    throw new Error('Failed to fetch bottles');
                }

                const data = await response.json();

                setBottles(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBottles();
    }, []);

    if (loading) return <div>Pouring data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ul className="bottle-grid">
                {bottles.map((bottle) => (
                    <li key={bottle.id} className="bottle-card">
                        {/* The new card header layout */}
                        <div className="card-header">
                            <span className="distillery-label">{bottle.distillery_name}</span>
                            <h3 className="bottle-title">{bottle.name}</h3>
                        </div>

                        <p><strong>ABV:</strong> {bottle.abv}%</p>
                        {bottle.description && <p><em>{bottle.description}</em></p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}