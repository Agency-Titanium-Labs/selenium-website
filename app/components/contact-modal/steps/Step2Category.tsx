import { useEffect, useState } from "react";
import { FormData } from "../types";
import { categoriesOptions, categoryPlaceholders } from "../constants";

interface Step2CategoryProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

// Hook personnalisé pour l'effet typewriter
function useTypewriter(
  texts: string[],
  typeSpeed: number = 100,
  deleteSpeed: number = 50,
  pauseTime: number = 2000
) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) {
      setCurrentText("");
      return;
    }

    const targetText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Mode écriture
          if (currentText.length < targetText.length) {
            setCurrentText(targetText.substring(0, currentText.length + 1));
          } else {
            // Pause avant de commencer à effacer
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        }
        // Mode effacement
        else if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Passer au texte suivant
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    typeSpeed,
    deleteSpeed,
    pauseTime,
  ]);

  return currentText;
}

export default function Step2Category({
  formData,
  setFormData,
}: Step2CategoryProps) {
  const categoryPlaceholder = useTypewriter(
    categoryPlaceholders,
    100,
    50,
    2000
  );

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-2xl font-bold text-primary">Accroche / Projet</h3>
        <p className="text-sm text-center">
          Quel type de projet souhaitez-vous lancer ?
        </p>
      </div>
      <p className="text-grey-light text-sm italic">
        Plusieurs choix possibles
      </p>
      <form>
        <ul className="grid md:grid-cols-2 gap-4 text-grey-lighter">
          {categoriesOptions.map((category) => (
            <li key={category.value}>
              <label className="flex items-center gap-4 select-none">
                <input
                  type="checkbox"
                  className="accent-primary w-4 h-4"
                  checked={formData.categories.includes(category.value)}
                  onChange={() => {
                    if (formData.categories.includes(category.value)) {
                      setFormData({
                        ...formData,
                        categories: formData.categories.filter(
                          (c) => c !== category.value
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        categories: [...formData.categories, category.value],
                      });
                    }
                  }}
                />
                {category.label}
              </label>
            </li>
          ))}
          <li className="md:col-span-2">
            <label className="flex items-center gap-4 select-none">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4"
                checked={!!formData.otherCategory}
                onChange={(e) => {
                  if (e.target.checked) {
                    const input = document.querySelector(
                      'input[name="otherCategory"]'
                    ) as HTMLInputElement;
                    input?.focus();
                  } else {
                    setFormData({
                      ...formData,
                      otherCategory: undefined,
                    });
                  }
                }}
              />
              <div className="flex-1 flex items-center gap-2">
                {"Autre : "}
                <input
                  name="otherCategory"
                  type="text"
                  className="flex-1 bg-grey-darker rounded-xs px-4 py-1 min-w-0"
                  placeholder={categoryPlaceholder}
                  value={formData.otherCategory || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherCategory:
                        e.target.value.length > 0 ? e.target.value : undefined,
                    })
                  }
                />
              </div>
            </label>
          </li>
        </ul>
      </form>
    </>
  );
}
