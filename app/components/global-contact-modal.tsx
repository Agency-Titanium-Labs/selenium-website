"use client";

import ContactModal from "../components/contact-modal";
import { useContactModal } from "../contexts/contact-modal-context";

export default function GlobalContactModal() {
  const { isOpen, closeModal } = useContactModal();

  return <ContactModal isOpen={isOpen} onClose={closeModal} />;
}
