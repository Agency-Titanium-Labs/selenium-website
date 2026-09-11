export interface ContactDetails {
  name?: string;
  phone?: string;
  email: string;
  message?: string;
}

export interface FormData {
  categories: string[];
  otherCategory?: string;
  companySize?: string;
  budget?: number;
  delay?: string;
  contactDetails?: ContactDetails;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
