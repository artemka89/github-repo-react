import { FC, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<FormInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const IdHtmlFor = useId();

  const errorText = errors?.[name]?.message as string;

  return (
    <div className={cn(className, 'relative mb-5')}>
      <Label htmlFor={IdHtmlFor + name} className='mb-2 ml-2 font-semibold'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input
        id={IdHtmlFor + name}
        {...register(name)}
        {...props}
        autoCapitalize='none'
        autoCorrect='off'
        className={cn(errorText && 'border-red-500')}
      />
      {errorText && (
        <p className={cn('absolute ml-2 mt-1 text-sm text-red-500', className)}>
          {errorText}
        </p>
      )}
    </div>
  );
};
