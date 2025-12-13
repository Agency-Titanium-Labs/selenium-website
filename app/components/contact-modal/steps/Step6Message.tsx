import Input from "../../ui/Input";
import { FormData } from "../types";

interface Step6MessageProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function Step6Message({
  formData,
  setFormData,
}: Step6MessageProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">Commentaire</h3>
        <p className="text-sm text-center">
          Partagez vos idées, questions ou besoins spécifiques
        </p>
      </div>
      <form className="grid">
        <Input
          label="Message"
          name="message"
          as="textarea"
          value={formData.contactDetails?.message || ""}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({
              ...formData,
              contactDetails: {
                ...formData.contactDetails,
                email: formData.contactDetails?.email || "",
                message: e.target.value,
              },
            })
          }
        />
      </form>
    </>
  );
}
