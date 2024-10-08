export { TodoListStoreProvider } from './model/store';
import { FC, useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { useMatchMedia } from '@/shared/lib/use-match-media';
import { Accordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

import { AddItemForm } from './components/add-item-form';
import { TodoItem } from './components/todo-item';
import { useTodoListStore } from './model/store';
import { TodoItemType } from './model/types';

export const TodoList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDesktop = useMatchMedia('(min-width: 1024px)');
  console.log(isDesktop);
  const { todoList, setCompleted, addTodo, removeTodo } = useTodoListStore();

  const onClickAddItem = (todo: TodoItemType) => {
    addTodo(todo);
    setIsModalOpen(false);
  };

  return (
    <div className='mt-10'>
      <div className='flex justify-end'>
        <Button
          onClick={() => setIsModalOpen(true)}
          className={cn('mb-4 w-[120px]', { 'w-full': !isDesktop })}>
          Add Todo
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddItemForm onSubmit={onClickAddItem} />
      </Modal>

      <Accordion type='single' collapsible className='w-full space-y-2'>
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            removeItem={removeTodo}
            toggleCompleted={setCompleted}
          />
        ))}
      </Accordion>
    </div>
  );
};
