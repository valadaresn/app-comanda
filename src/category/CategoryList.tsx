import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderBy } from 'firebase/firestore';
import { collectionNames } from '../config/firebaseConfig';
import { listenToCollection } from '../services/FirebaseService';
import { Category } from '../models/CategorySchema';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Card, CardContent, CardHeader, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

// Criar um tema personalizado com a paleta de cores rosa
const theme = createTheme({
  palette: {
    primary: pink,
  },
});

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80vw', // Largura reduzida para 80%
          margin: '0 auto', // Centralização horizontal
          padding: '1rem',
          position: 'relative', // Necessário para posicionar o Fab
        }}
      >
        <Card style={{ width: '100%', position: 'relative' }}>
          <CardHeader title="Categorias" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Ordem</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.order}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => category.id && handleEdit(category.id)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleNewCategory}
              style={{
                position: 'fixed',
                bottom: '16px',
                right: '16px',
                zIndex: 1,
              }}
            >
              +
            </Fab>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default CategoryList;