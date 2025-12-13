import { FormData } from "../types";

interface Step4BudgetProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  budgetList: number[];
}

export default function Step4Budget({
  formData,
  setFormData,
  onNext,
  budgetList,
}: Step4BudgetProps) {
  const getBudgetLabel = (index: number): string => {
    if (index === 0) {
      return `Moins de ${budgetList[0].toLocaleString("fr-FR")} €`;
    }
    if (index === budgetList.length - 1) {
      return `Plus de ${budgetList[index - 1].toLocaleString("fr-FR")} €`;
    }
    return `Entre ${budgetList[index - 1].toLocaleString(
      "fr-FR"
    )} € et ${budgetList[index].toLocaleString("fr-FR")} €`;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">Budget</h3>
        <p className="text-sm text-center">
          Avez-vous une idée du budget à investir ?
        </p>
      </div>
      <p className="text-grey-light text-sm italic">*Un seul choix possible</p>
      <form>
        <ul className="grid gap-4 text-grey-lighter">
          {budgetList.map((budget, index) => (
            <li key={budget}>
              <label className="flex items-center gap-4 select-none">
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={formData.budget === budget}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      budget: Number(e.target.value),
                    });
                    onNext();
                  }}
                  className="accent-primary w-4 h-4"
                />
                {getBudgetLabel(index)}
              </label>
            </li>
          ))}
        </ul>
      </form>
      {(formData.categories.length > 1 ||
        (formData.otherCategory && formData.categories.length > 0)) && (
        <p className="text-grey-light text-sm italic">
          Le budget affiché correspond à une estimation basée sur les catégories
          sélectionnées.
        </p>
      )}
    </>
  );
}
