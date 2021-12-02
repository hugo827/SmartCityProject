import './App.css';
import Manga from './component/Manga';
import NavBar from './component/NavBar';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <NavBar></NavBar>
          <Manga></Manga>
      </header>
    </div>
  );
}

export default App;
