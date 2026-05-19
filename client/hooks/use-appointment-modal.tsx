"use client";

import { useState } from "react";
import AppointmentModal from "@/components/modals/appointment-modal";

export function useAppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const AppointmentModalComponent = () => (
    <AppointmentModal open={isOpen} onOpenChange={setIsOpen} />
  );

  return {
    openModal,
    closeModal,
    AppointmentModal: AppointmentModalComponent,
    isOpen
  };
}