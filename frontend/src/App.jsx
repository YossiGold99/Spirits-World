import { useState } from "react";
import BottleList from "./components/BottleList";
import AddBottle from "./components/AddBottle";
import './app.css';

function App() {
  //This state acts as a trigger to reload the list 
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBottleAdded = () => {
    setRefreshKey(oldKey => oldKey + 1)
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50' }}>SpiritsBase</h1>
      </header>

      <main>
        <AddBottle onBottleAdded={handleBottleAdded} />
        <BottleList key={refreshKey} />
      </main>
    </div>
  );
}

export default App;
