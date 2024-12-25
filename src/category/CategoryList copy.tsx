import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { orderBy } from 'firebase/firestore';
import { collectionNames } from '../config/firebaseConfig';
import { listenToCollection } from '../services/FirebaseService';
import { Category } from '../models/CategorySchema';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenToCollection(
      collectionNames.categories,
      (data: Category[]) => {
        setCategories(data);
        setLoading(false);
      },
      [orderBy('order')]
    );
    return () => unsubscribe();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/CategoryForm/${id}`);
  };

  const handleNewCategory = () => {
    navigate(`/CategoryForm`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        
        padding: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Categorias</h1>
        <button
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          onClick={handleNewCategory}
        >
          +
        </button>
      </div>

      {/* Table */}
      <table
        style={{
          width: '100%',
          maxWidth: '1200px', // Define um limite máximo para a tabela
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Nome</th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Ordem</th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{category.name}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{category.order}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '10px', textAlign: 'right' }}>
                <button
                  style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => category.id && handleEdit(category.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
