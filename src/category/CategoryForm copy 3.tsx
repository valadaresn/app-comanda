import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Typography, TextField, Button } from '@mui/material';
import { CategorySchema, Category } from '../models/CategorySchema';

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
        // Lógica de atualização do documento
      } else {
        console.log("Creating new document");
        // Lógica de criação do documento
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
          {...register("order", { valueAsNumber: true })}
          error={!!errors.order}
          helperText={errors.order ? errors.order.message : ""}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" onClick={() => console.log("Button clicked")}>
          {id ? "Salvar" : "Criar"}
        </Button>
      </form>
    </Container>
  );
}

export default CategoryForm;