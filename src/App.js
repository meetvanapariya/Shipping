import './App.css';
import Header from './components/header/index';
import Footer from './components/footer/index';
import ShippingTable from './components/table/index';
function App() {
  return (
    <div className="App">
     <Header />
     <ShippingTable />
     <Footer />
    </div>
  );
}

export default App;
