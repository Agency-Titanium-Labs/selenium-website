import { FormData } from "../types";
import { sizeOptions } from "../constants";

interface Step3CompanySizeProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

export default function Step3CompanySize({
  formData,
  setFormData,
  onNext,
}: Step3CompanySizeProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">
          Taille de l&apos;entreprise
        </h3>
        <p className="text-sm text-center">
          Votre structure, c&apos;est plutôt…
        </p>
      </div>
      <p className="text-grey-light text-sm italic">*Un seul choix possible</p>
      <form>
        <ul className="grid gap-4 text-grey-lighter">
          {sizeOptions.map((size) => (
            <li key={size.value}>
              <label className="flex items-center gap-4 select-none">
                <input
                  type="radio"
                  name="companySize"
                  value={size.value}
                  checked={formData.companySize === size.value}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      companySize: e.target.value,
                    });
                    onNext();
                  }}
                  className="accent-primary w-4 h-4"
                />
                {size.label}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
