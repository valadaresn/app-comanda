import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: "O nome da categoria é obrigatório." }),
  order: z
    .number({ required_error: "O campo ordem é obrigatório." })
    .positive({ message: "A ordem deve ser um número positivo." })    
});

export type Category = z.infer<typeof CategorySchema>;