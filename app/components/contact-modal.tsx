"use client";

import { useState, useEffect } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";

const categoriesOptions = [
  { label: "Web & Applications", value: "web_applications" },
  { label: "Automatisation & Data", value: "automatisation_data" },
  { label: "Design & branding", value: "design_branding" },
  {
    label: "Production visuelle & Publicitaire",
    value: "production_visuelle_publicitaire",
  },
  {
    label: "Consulting & Gestion de projet",
    value: "consulting_gestion_de_projet",
  },
];

const sizeOptions = [
  { label: "Indépendant", value: "independant" },
  { label: "Petite entreprise (<50)", value: "petite_entreprise" },
  { label: "Moyenne entreprise (< 250)", value: "moyenne_entreprise" },
  { label: "Grande entreprise (250+)", value: "grande_entreprise" },
];

const categoryPlaceholders = [
  "Cuisine moléculaire & confiserie 🍬",
  "Élevage de licornes 🦄",
  "Domotique pour châteaux médiévaux 🏰",
  "Voyages intergalactiques low-cost 🚀",
  "Coaching pour super-héros 🦸",
  "Design de sandales futuristes 👡",
  "Dressage de dragons 🐉",
  "Agriculture de cactus connectés 🌵",
  "Audit en magie noire (avec facture) 🔮",
  "Gestion de colonies de pingouins 🐧",
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  categories: string[];
  otherCategory?: string;
  companySize?: string;
  budgetStart?: number;
  budgetEnd?: number;
  delay?: string;
  contactDetails?: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  };
}

const initialFormData: FormData = {
  categories: [],
  otherCategory: undefined,
  companySize: undefined,
  budgetStart: 2000,
  budgetEnd: 40000,
  delay: undefined,
  contactDetails: {
    name: "",
    email: "",
    phone: undefined,
    message: undefined,
  },
};

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

export default function ContactModal({
  isOpen,
  onClose,
}: Readonly<ContactModalProps>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const categoryPlaceholder = useTypewriter(
    categoryPlaceholders,
    100,
    50,
    2000
  );

  const handleClose = () => {
    setCurrentStep(0);
    setFormData(initialFormData);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="w-xl">
      <div className="space-y-6">
        {currentStep === 0 ? (
          <h2 className="text-2xl font-orbitron font-bold text-primary text-center mr-8">
            Nous contacter
          </h2>
        ) : (
          <div
            className="flex space-x-2 mr-8"
            style={
              {
                "--corner-size": "6px",
                clipPath: `polygon(
                      var(--corner-size) 0,
                      100% 0,
                      100% calc(100% - var(--corner-size)),
                      calc(100% - var(--corner-size)) 100%,
                      0 100%,
                      0 var(--corner-size)
                    )`,
              } as React.CSSProperties
            }
          >
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-3 transition-colors ${
                  step <= currentStep ? "bg-primary" : "bg-grey-darker"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 0: Informations */}
        {currentStep === 0 && (
          <p>
            Chaque projet est unique. En quelques questions, aidez-nous à
            comprendre vos besoins pour vous proposer la solution la plus
            adaptée.
          </p>
        )}

        {/* Step 1: Catégories */}
        {currentStep === 1 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl font-bold">Accroche / Projet</h3>
              <p className="text-sm">
                Quel type de projet souhaitez-vous lancer ?
              </p>
            </div>
            <p className="text-grey-light text-sm italic">
              Plusieurs choix possibles
            </p>
            <form>
              <ul className="grid grid-cols-2 gap-4 text-grey-lighter">
                {categoriesOptions.map((category) => (
                  <li key={category.value}>
                    <label className="flex items-center gap-4 select-none">
                      <input
                        type="checkbox"
                        className="accent-primary"
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
                              categories: [
                                ...formData.categories,
                                category.value,
                              ],
                            });
                          }
                        }}
                      />
                      {category.label}
                    </label>
                  </li>
                ))}
                <li className="col-span-2">
                  <label className="flex items-center gap-4 select-none">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={!!formData.otherCategory}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const input = document.querySelector(
                            'input[name="otherCategory"]'
                          ) as HTMLInputElement;
                          input.focus();
                        } else {
                          setFormData({
                            ...formData,
                            otherCategory: undefined,
                          });
                        }
                      }}
                    />
                    <div className="flex-1 flex items-center gap-2">
                      Autre :
                      <input
                        name="otherCategory"
                        type="text"
                        className="flex-1 bg-grey-darker rounded-xs px-4 py-1"
                        placeholder={categoryPlaceholder}
                        value={formData.otherCategory || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            otherCategory:
                              e.target.value.length > 0
                                ? e.target.value
                                : undefined,
                          })
                        }
                      />
                    </div>
                  </label>
                </li>
              </ul>
            </form>
          </>
        )}

        {/* Step 2: Taille de l'entreprise */}
        {currentStep === 2 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl font-bold">Taille de l&apos;entreprise</h3>
              <p className="text-sm">Votre structure, c&apos;est plutôt…</p>
            </div>
            <p className="text-grey-light text-sm italic">
              Un seul choix possible
            </p>
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
                          handleNext();
                        }}
                        className="accent-primary"
                      />
                      {size.label}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </>
        )}

        {/* Step 3: Budget */}
        {currentStep === 3 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl font-bold">Budget</h3>
              <p className="text-sm">
                Avez-vous une idée du budget à investir ?
              </p>
            </div>
            <div className="relative">
              <input
                className="relative w-full pointer-events-none [&::-webkit-slider-thumb]:pointer-events-all"
                type="range"
                name="budgetStart"
                id="budgetStart"
                min={0}
                max={50000}
                step={1000}
                value={formData.budgetStart}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetStart: e.target.valueAsNumber,
                  })
                }
              />
              <input
                className="absolute left-0 top-0 w-full pointer-events-none [&::-webkit-slider-thumb]:pointer-events-all"
                type="range"
                name="budgetEnd"
                id="budgetEnd"
                min={0}
                max={50000}
                step={1000}
                value={formData.budgetEnd}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetEnd: e.target.valueAsNumber,
                  })
                }
              />
            </div>
          </>
        )}

        {/* Step 4: Délai / Timing */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-bold">Délai / Timing</h3>
            <p className="text-sm">Vous souhaitez lancer votre projet…</p>
          </div>
        )}

        {/* Step 5: Coordonnées */}
        {currentStep === 5 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl font-bold">Coordonnées</h3>
              <p className="text-sm">
                Super ! Pour qu&apos;on puisse vous proposer une solution
                adaptée, laissez-nous vos coordonnées
              </p>
            </div>
            <form className="grid grid-cols-2 gap-4"></form>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-end items-center gap-6 mt-12">
          {currentStep > 1 && (
            <Button variant="transparent" onClick={handlePrevious}>
              Précédent
            </Button>
          )}
          {currentStep === 0 ? (
            <Button onClick={handleNext}>Répondre en 2min</Button>
          ) : currentStep < 5 ? (
            <>
              {(currentStep === 1 &&
                formData.categories.length === 0 &&
                !formData.otherCategory) ||
              (currentStep === 2 && !formData.companySize) ? (
                <Button variant="outline" onClick={handleNext}>
                  Passer
                </Button>
              ) : (
                <Button onClick={handleNext}>Suivant</Button>
              )}
            </>
          ) : (
            <Button onClick={handleSubmit}>Envoyer</Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
