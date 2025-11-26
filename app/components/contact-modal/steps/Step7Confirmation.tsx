import { FormData } from "../types";

interface Step7ConfirmationProps {
  formData: FormData;
}

export default function Step7Confirmation({
  formData,
}: Step7ConfirmationProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-xl font-outfit! font-bold text-center">
        {`Merci${
          " " + formData.contactDetails?.name || ""
        }, nous allons revenir vers vous avec une solution adaptée à votre projet !`}
      </h3>
      <p className="text-sm text-center">
        Souhaitez-vous planifier un appel personnalisé avec notre équipe ?
      </p>
    </div>
  );
}
