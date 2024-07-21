import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import AddTaskForm from './addTaskForm';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddTaskModal({ open, onOpenChange }: Props) {
  return (
    <Modal title="Nueva Tarea" buttonName="+" open={open} onOpenChange={onOpenChange} trigger={true}>
      <AddTaskForm onOpenChange={onOpenChange} />
    </Modal>
  );
}

export default AddTaskModal;
