import { FormData } from "../types";
import { delayOptions } from "../constants";

interface Step5DelayProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

export default function Step5Delay({
  formData,
  setFormData,
  onNext,
}: Step5DelayProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">Délai / Timing</h3>
        <p className="text-sm text-center">
          Vous souhaitez lancer votre projet…
        </p>
      </div>
      <p className="text-grey-light text-sm italic">*Un seul choix possible</p>
      <form>
        <ul className="grid gap-4 text-grey-lighter">
          {delayOptions.map((delay) => (
            <li key={delay.value}>
              <label className="flex items-center gap-4 select-none">
                <input
                  type="radio"
                  name="delay"
                  value={delay.value}
                  checked={formData.delay === delay.value}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      delay: e.target.value,
                    });
                    onNext();
                  }}
                  className="accent-primary w-4 h-4"
                />
                {delay.label}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
