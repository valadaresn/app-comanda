import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CategoryList from './category/CategoryList';
import CategoryForm from './category/CategoryForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/categoryForm/:id" element={<CategoryForm />} />
        <Route path="/categoryList" element={<CategoryList />} />
        {/* <Route path="/" element={<Navigate to="/Teste" />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;