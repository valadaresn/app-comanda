import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "O nome da categoria é obrigatório." }),
  order: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().positive({ message: "A ordem deve ser um número positivo." }).refine(val => val !== undefined, { message: "Required" }))
});

export type Category = z.infer<typeof CategorySchema>;