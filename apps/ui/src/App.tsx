import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardView, ProdutoresView } from './views';
import './index.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/produtores" element={<ProdutoresView />} />
        </Routes>
    </Router>
  )
}

export default App
