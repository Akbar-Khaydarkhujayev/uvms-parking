import { z } from 'zod';

// ----------------------------------------------------------------------

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  plate: z.string().min(1, { message: 'plate required' }),
});
