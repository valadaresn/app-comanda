import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './category/CategoryList';
import CategoryForm from './category/CategoryForm';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/CategoryList" element={<CategoryList />} />
          <Route path="/CategoryForm" element={<CategoryForm />} />
          <Route path="/CategoryForm/:id?" element={<CategoryForm />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
        {/* <Teste></Teste> */}
      </div>
    </Router>
  );
}

export default App;