import { createContext, FC, useContext, useState } from 'react';
import { createStore, useStore } from 'zustand';

import { TodoItemType } from './types';

interface TodoListStore {
  todoList: TodoItemType[];
  addTodo: (todo: TodoItemType) => void;
  removeTodo: (id: string) => void;
  setCompleted: (id: string, completed: boolean) => void;
}

const TodoListStoreContext = createContext<TodoListStore | null>(null);

export const TodoListStoreProvider: FC<{
  children: React.ReactNode;
  initialTodoList?: TodoItemType[];
}> = ({ children, initialTodoList = [] }) => {
  const [store] = useState(() => {
    return createStore<TodoListStore>((set) => ({
      todoList: initialTodoList,
      addTodo: (todo: TodoItemType) =>
        set((state) => ({ todoList: [...state.todoList, todo] })),
      removeTodo: (id: string) =>
        set((state) => ({
          todoList: state.todoList.filter((todo) => todo.id !== id),
        })),
      setCompleted: (id: string, completed: boolean) =>
        set((state) => ({
          todoList: state.todoList.map((todo) =>
            todo.id === id ? { ...todo, completed } : todo,
          ),
        })),
    }));
  });

  const state = useStore(store);

  return (
    <TodoListStoreContext.Provider value={state}>
      {children}
    </TodoListStoreContext.Provider>
  );
};

export const useTodoListStore = () => {
  const context = useContext(TodoListStoreContext);
  if (!context) {
    throw new Error('Missing TodoListStoreProvider');
  }

  return context;
};
