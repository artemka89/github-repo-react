import { FC, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/cn';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<FormTextareaProps> = ({
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
      <Textarea
        id={IdHtmlFor + name}
        className='text-md h-12'
        {...register(name)}
        {...props}
      />

      {errorText && (
        <p className={cn('absolute ml-2 mt-1 text-sm text-red-500', className)}>
          {errorText}
        </p>
      )}
    </div>
  );
};
