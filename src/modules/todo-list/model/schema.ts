import * as yup from 'yup';

export const AddItemFormSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

export type AddItemFormSchemaType = yup.InferType<typeof AddItemFormSchema>;
