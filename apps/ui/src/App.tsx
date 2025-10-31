import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardView, ProdutoresView } from './views';
import { Layout } from './components/Layout';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardView />} />
          <Route path="produtores" element={<ProdutoresView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
