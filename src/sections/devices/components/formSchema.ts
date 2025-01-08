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
});

export type CameraFormSchemaType = z.infer<typeof CameraFormSchema>;

export const CameraFormSchema = z.object({
  id: z.number().optional(),

  ip: z
    .string()
    .min(1, { message: 'IP is required!' })
    .regex(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      { message: 'Invalid IP address!' }
    ),
  port: z
    .string()
    .min(1, { message: 'Port is required!' })
    .regex(/^([0-9]{1,5})$/, { message: 'Invalid port number!' })
    .refine((val) => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 65535, {
      message: 'Port must be between 0 and 65535!',
    }),
  username: z.string().min(1, { message: 'Username is required!' }),
  password: z.string().min(1, { message: 'Password is required!' }),
  direction: z.number().min(1, { message: 'Direction is required!' }),
  status: z.boolean(),
  company_ID: z.string().min(1, { message: 'Company ID is required!' }),
  device_ID: z.string().min(1, { message: 'Device ID is required!' }),
  barier_ID: z.number().min(1, { message: 'Barrier ID is required!' }),
});

export const cameraDefaultValue = {
  ip: '',
  port: '',
  username: '',
  password: '',
  direction: 0,
  barier_ID: 0,
  status: true,
  company_ID: '',
  device_ID: '',
};
