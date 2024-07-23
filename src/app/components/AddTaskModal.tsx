'use client';

import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import AddTaskForm from './AddTaskForm';

function AddTaskModal() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  return (
    <Modal title="Nueva Tarea" buttonName="+" open={showAddTaskForm} onOpenChange={setShowAddTaskForm} trigger={true}>
      <AddTaskForm onOpenChange={setShowAddTaskForm} />
    </Modal>
  );
}

export default AddTaskModal;
