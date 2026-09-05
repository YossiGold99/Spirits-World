import { useState } from 'react';
import Navbar from './components/Navbar'; // Import the new component
import BottleList from './components/BottleList';
import AddBottle from './components/AddBottle';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBottleAdded = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div>
      {/* The Navbar spans the full width at the top */}
      <Navbar />

      {/* The container keeps the main content centered and restricted in width */}
      <div className="app-container">
        <main>
          <AddBottle onBottleAdded={handleBottleAdded} />
          <BottleList key={refreshKey} />
        </main>
      </div>
    </div>
  );
}

export default App;