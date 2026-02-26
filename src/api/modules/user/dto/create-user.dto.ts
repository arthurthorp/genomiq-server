import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .regex(
      passwordRegex,
      "Senha deve conter letra maiúscula, minúscula, número e caractere especial",
    ),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
