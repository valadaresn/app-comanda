import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { CategorySchema, Category } from '../models/CategorySchema';
import { collection, addDoc, updateDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { collectionNames } from '../config/firebaseConfig';

const db = getFirestore();

function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        const docRef = doc(db, collectionNames.categories, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const category = docSnap.data() as Category;
          reset(category); // Preenche todos os campos do formulário de uma vez
        }
      };
      fetchCategory();
    }
  }, [id, reset]);

  const onSubmit = async (data: Category) => {
    try {
      if (id) {
        const documentRef = doc(db, collectionNames.categories, id);
        await updateDoc(documentRef, data);
      } else {
        const collectionRef = collection(db, collectionNames.categories);
        await addDoc(collectionRef, data);
      }
      navigate("/CategoryList");
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
          InputLabelProps={{ shrink: true }} // Adiciona esta linha
          autoFocus
        />
        <TextField
          label="Ordem"
          type="number"
          {...register("order", {
            setValueAs: (value) => value === "" ? undefined : Number(value),
          })}
          error={!!errors.order}
          helperText={errors.order ? errors.order.message : ""}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }} // Adiciona esta linha
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Container>
  );
}

export default CategoryForm;