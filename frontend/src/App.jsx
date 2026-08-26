import { useState } from 'react';
import BottleList from './components/BottleList';
import AddBottle from './components/AddBottle';
import './App.css';

function App() {
  // This state acts as a trigger to reload the list
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBottleAdded = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SpiritsBase</h1>
      </header>
      
      <main>
        <AddBottle onBottleAdded={handleBottleAdded} />
        <BottleList key={refreshKey} />
      </main>
    </div>
  );
}

export default App;