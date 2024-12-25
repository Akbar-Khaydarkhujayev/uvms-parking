import { z } from 'zod';

// ----------------------------------------------------------------------

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  device_id: z.string().optional(),
  device_Name: z
    .string()
    .min(1, { message: 'Device name is required!' })
    .min(3, { message: 'Minimum 3 characters!' })
    .max(32, { message: 'Maximum 32 characters!' }),
  dev_Username: z.string().min(1, { message: 'Username is required!' }),
  dev_Password: z.string().min(1, { message: 'Password is required!' }),
  company_ID: z.string().min(1, { message: 'Company is required!' }),
  direction: z.number().int().min(0, { message: 'Direction must be a non-negative integer!' }),
});
