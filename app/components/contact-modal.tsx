"use client";

import { useState, useEffect } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";
import Input from "./ui/Input";

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

const delayOptions = [
  { label: "Immédiatement", value: "immediatement" },
  { label: "D'ici 1 à 3 mois", value: "1_3_mois" },
  { label: "D'ici 3 à 6 mois", value: "3_6_mois" },
  { label: "Plus tard", value: "plus_tard" },
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
  budget?: number;
  delay?: string;
  contactDetails?: {
    name?: string;
    phone?: string;
    email: string;
    message?: string;
  };
}

const initialFormData: FormData = {
  categories: [],
  otherCategory: undefined,
  companySize: undefined,
  budget: undefined,
  delay: undefined,
  contactDetails: {
    name: undefined,
    phone: undefined,
    email: "",
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

export default function ContactModal({
  isOpen,
  onClose,
}: Readonly<ContactModalProps>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const categoryPlaceholder = useTypewriter(
    currentStep === 2 ? categoryPlaceholders : [],
    100,
    50,
    2000
  );
  const [budgetList, setBudgetList] = useState<number[]>([
    500,
    2000,
    5000,
    20000,
    Infinity,
  ]);

  const handleClose = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (formData.categories.length > 0 || formData.otherCategory) {
        setBudgetList([0, 0, 0, 0, 0]); // Reset budget list

        for (const category of formData.categories) {
          if (
            [
              "web_applications",
              "automatisation_data",
              "consulting_gestion_de_projet",
            ].includes(category)
          ) {
            setBudgetList((prevBudgets) => {
              const newBudgets = [2000, 5000, 20000, 50000, Infinity];
              return prevBudgets.map(
                (budget, index) => budget + newBudgets[index]
              );
            });
          } else if (
            ["design_branding", "production_visuelle_publicitaire"].includes(
              category
            )
          ) {
            setBudgetList((prevBudgets) => {
              const newBudgets = [500, 2000, 5000, 20000, Infinity];
              return prevBudgets.map(
                (budget, index) => budget + newBudgets[index]
              );
            });
          }
        }

        if (formData.otherCategory) {
          setBudgetList((prevBudgets) => {
            const newBudgets = [500, 2000, 5000, 20000, Infinity];
            return prevBudgets.map(
              (budget, index) => budget + newBudgets[index]
            );
          });
        }
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    handleClose();
  };

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
    <Modal isOpen={isOpen} onClose={handleClose} className="w-xl">
      <div className="space-y-6">
        {currentStep !== 6 && (
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

        {/* Step 1: Coordonnées */}
        {currentStep === 1 && (
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
              className="grid grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
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
              <div className="col-span-2">
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
              <div className="col-span-2">
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
              </div>
            </form>
          </>
        )}

        {/* Step 2: Catégories */}
        {currentStep === 2 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-bold text-primary">
                Accroche / Projet
              </h3>
              <p className="text-sm text-center">
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
                      {"Autre : "}
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

        {/* Step 3: Taille de l'entreprise */}
        {currentStep === 3 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-bold text-primary">
                Taille de l&apos;entreprise
              </h3>
              <p className="text-sm text-center">
                Votre structure, c&apos;est plutôt…
              </p>
            </div>
            <p className="text-grey-light text-sm italic">
              *Un seul choix possible
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

        {/* Step 4: Budget */}
        {currentStep === 4 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-bold text-primary">Budget</h3>
              <p className="text-sm text-center">
                Avez-vous une idée du budget à investir ?
              </p>
            </div>
            <p className="text-grey-light text-sm italic">
              *Un seul choix possible
            </p>
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
                          handleNext();
                        }}
                        className="accent-primary"
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
                Le budget affiché correspond à une estimation basée sur les
                catégories sélectionnées.
              </p>
            )}
          </>
        )}

        {/* Step 5: Délai / Timing */}
        {currentStep === 5 && (
          <>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-bold text-primary">
                Délai / Timing
              </h3>
              <p className="text-sm text-center">
                Vous souhaitez lancer votre projet…
              </p>
            </div>
            <p className="text-grey-light text-sm italic">
              *Un seul choix possible
            </p>
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
                        }}
                        className="accent-primary"
                      />
                      {delay.label}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-end items-center gap-6 mt-12">
          {currentStep > 1 && (
            <Button variant="transparent" onClick={handlePrevious}>
              Précédent
            </Button>
          )}
          {(() => {
            if (currentStep === 1) {
              return (
                <Button type="submit" form="step1-form">
                  Suivant
                </Button>
              );
            }

            if (currentStep < 5) {
              const canSkip =
                (currentStep === 2 &&
                  formData.categories.length === 0 &&
                  !formData.otherCategory) ||
                (currentStep === 3 && !formData.companySize);

              return canSkip ? (
                <Button variant="outline" onClick={handleNext}>
                  Passer
                </Button>
              ) : (
                <Button onClick={handleNext}>Suivant</Button>
              );
            }

            return <Button onClick={handleSubmit}>Envoyer</Button>;
          })()}
        </div>
      </div>
    </Modal>
  );
}
