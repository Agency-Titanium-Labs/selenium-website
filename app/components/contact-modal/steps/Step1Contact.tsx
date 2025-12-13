import Input from "../../ui/Input";
import { FormData } from "../types";

interface Step1ContactProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

export default function Step1Contact({
  formData,
  setFormData,
  onNext,
}: Step1ContactProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">Coordonnées</h3>
        <p className="text-sm text-center">
          Pour qu&apos;on puisse vous proposer une solution adaptée,
          laissez-nous vos coordonnées
        </p>
      </div>
      <form
        id="step1-form"
        className="grid md:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <Input
          label="Nom"
          name="name"
          type="text"
          value={formData.contactDetails?.name || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactDetails: {
                ...formData.contactDetails,
                email: formData.contactDetails?.email || "",
                name: e.target.value,
              },
            })
          }
        />
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          value={formData.contactDetails?.phone || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactDetails: {
                ...formData.contactDetails,
                email: formData.contactDetails?.email || "",
                phone: e.target.value,
              },
            })
          }
        />
        <div className="md:col-span-2">
          <Input
            label="E-mail"
            name="email"
            type="email"
            required
            value={formData.contactDetails?.email || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactDetails: {
                  ...formData.contactDetails,
                  email: e.target.value,
                },
              })
            }
          />
        </div>
      </form>
    </>
  );
}
