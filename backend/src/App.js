import './App.css';
import Table from './component/Table';
import NavBar from './component/NavBar';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <NavBar></NavBar>
          <Table key="manga" colonnes={["id_manga","title","synopsis","new_price"]}></Table>
      </header>
    </div>
  );
}

export default App;
