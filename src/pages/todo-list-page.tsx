import { FC } from 'react';

import { TodoList, TodoListStoreProvider } from '@/modules/todo-list';

export const TodoListPage: FC = () => {
  return (
    <TodoListStoreProvider
      initialTodoList={[
        {
          id: '1',
          completed: false,
          data: new Date(Date.now()),
          description: 'Lorem ipsum dolor sit amet',
          title: 'Lorem ipsum1',
        },
        {
          id: '2',
          completed: false,
          data: new Date(Date.now()),
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic tempora voluptatem accusantium ipsum eum ut atque, dolor molestias omnis tenetur quae quia, alias numquam sint. Perferendis debitis neque architecto et?',
          title: 'Lorem, ipsum dolor',
        },
      ]}>
      <TodoList />
    </TodoListStoreProvider>
  );
};
