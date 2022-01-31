import './App.css';

import Way from './routes/routes';


function App() {
    return (
        <div className="App">
          <header className="App-header">
              <Way></Way> // Appelle le composant Way qui effectue notre routage.
          </header>
        </div>
  );
}

export default App;
