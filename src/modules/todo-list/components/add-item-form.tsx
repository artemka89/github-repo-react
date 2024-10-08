import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

import { TodoItemType } from '@/modules/todo-list/model/types';
import { Button } from '@/shared/ui/button';
import { FormInput } from '@/shared/ui/form/form-input';
import { FormTextarea } from '@/shared/ui/form/form-textarea';

import { AddItemFormSchema, AddItemFormSchemaType } from '../model/schema';

interface AddItemFormProps {
  onSubmit: (data: TodoItemType) => void;
}

export const AddItemForm: FC<AddItemFormProps> = ({ onSubmit }) => {
  const methods = useForm<AddItemFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(AddItemFormSchema),
  });

  const onSubmitHandler: SubmitHandler<AddItemFormSchemaType> = (data) => {
    onSubmit({
      ...data,
      id: uuidv4(),
      completed: false,
      data: new Date(Date.now()),
    });
    methods.reset();
  };

  return (
    <>
      <h1 className='text-center text-2xl font-medium'>Add Todo</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <FormInput
            name='title'
            type='text'
            label='Title'
            required
            disabled={false}
          />

          <FormTextarea
            name='description'
            label='Description'
            required
            disabled={false}
          />
          <div className='flex justify-center'>
            <Button type='submit' variant={'outline'}>
              Add Item
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
