import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Typography, TextField, Button } from '@mui/material';
import { CategorySchema, Category } from '../models/CategorySchema';
import { collection, addDoc, updateDoc, doc, getFirestore } from "firebase/firestore";
import { collectionNames } from '../config/firebaseConfig';

const db = getFirestore();

function CategoryForm() {
  const { id } = useParams(); // Para diferenciar entre criação e edição
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Category>({
    resolver: zodResolver(CategorySchema)
  });

  const onSubmit = async (data: Category) => {
    console.log("Form data:", data); // Log dos dados do formulário
    try {
      if (id) {
        console.log("Updating document with ID:", id);
        const documentRef = doc(db, collectionNames.categories, id);
        await updateDoc(documentRef, data);
      } else {
        console.log("Creating new document");
        const collectionRef = collection(db, collectionNames.categories);
        await addDoc(collectionRef, data);
      }
      console.log("Navigation to /CategoryList");
      navigate("/CategoryList"); // Volta para a lista de categorias
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Categoria" : "Criar Categoria"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ordem"
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          {...register("order", { valueAsNumber: true })}
          error={!!errors.order}
          helperText={errors.order ? errors.order.message : ""}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Container>
  );
}

export default CategoryForm;