import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "O nome da categoria é obrigatório." }),
  order: z.preprocess((value) => value === "" ? undefined : Number(value), z.number({ required_error: "Required" }).positive({ message: "A ordem deve ser um número positivo." }))
});

export type Category = z.infer<typeof CategorySchema>;