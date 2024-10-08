import { FC } from 'react';
import { Check, CheckCheck, Trash2 } from 'lucide-react';

import { TodoItemType } from '@/modules/todo-list/model/types';
import { cn } from '@/shared/lib/cn';
import { getLocaleDate } from '@/shared/lib/get-locale-date';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';

interface TodoItemProps {
  item: TodoItemType;
  removeItem: (id: string) => void;
  toggleCompleted: (id: string, completed: boolean) => void;
  className?: string;
}

export const TodoItem: FC<TodoItemProps> = ({
  item,
  removeItem,
  toggleCompleted,
  className,
}) => {
  const date = getLocaleDate(item.data);

  const handleToggleCompleted = () => {
    toggleCompleted(item.id, !item.completed);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <li className={cn(className, 'flex w-full items-start gap-2')}>
      <AccordionItem
        value={item.id}
        className='w-full overflow-hidden rounded-md border-b-0 bg-muted-foreground'>
        <AccordionTrigger className='flex items-center justify-between bg-background-foreground px-2 py-4'>
          <div className='flex w-full items-center justify-between gap-2 px-4'>
            <div>{item.title}</div>
            <div className='text-neutral-400'>{date}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='break-words p-4 text-lg'>
          {item.description}
        </AccordionContent>
      </AccordionItem>
      <div className='flex h-14 items-center gap-2'>
        <Button
          onClick={handleToggleCompleted}
          variant='outline'
          size='icon'
          className='size-14'>
          {item.completed ? (
            <CheckCheck size={18} />
          ) : (
            <Check size={18} className='text-neutral-400' />
          )}
        </Button>
        <Button
          onClick={handleRemove}
          variant='outline'
          size='icon'
          className='size-14'>
          <Trash2 size={18} />
        </Button>
      </div>
    </li>
  );
};
