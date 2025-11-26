"use client";

import { useState, useEffect } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ContactModalProps, FormData } from "./contact-modal/types";
import { initialFormData } from "./contact-modal/constants";
import Step1Contact from "./contact-modal/steps/Step1Contact";
import Step2Category from "./contact-modal/steps/Step2Category";
import Step3CompanySize from "./contact-modal/steps/Step3CompanySize";
import Step4Budget from "./contact-modal/steps/Step4Budget";
import Step5Delay from "./contact-modal/steps/Step5Delay";
import Step6Message from "./contact-modal/steps/Step6Message";
import Step7Confirmation from "./contact-modal/steps/Step7Confirmation";

export default function ContactModal({
  isOpen,
  onClose,
}: Readonly<ContactModalProps>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [budgetList, setBudgetList] = useState<number[]>([
    500,
    2000,
    5000,
    20000,
    Infinity,
  ]);

  const [lastStepReached, setLastStepReached] = useState(1);
  useEffect(() => {
    if (currentStep > lastStepReached) {
      setLastStepReached(currentStep);
    }
  }, [currentStep, lastStepReached]);

  const handleClose = () => {
    setCurrentStep(1);
    setLastStepReached(1);
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

    if (currentStep < 7) {
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
    handleNext();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="w-xl overflow-hidden"
    >
      <Image
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className={twMerge(
          "absolute top-1/2 left-1/2 pointer-events-none select-none blur-[300px] -z-10 transition-transform duration-1000",
          currentStep % 2 === 0 ? "translate-x-[30%]" : "translate-x-[-130%]"
        )}
      />
      <div className="space-y-6">
        {currentStep !== 7 && (
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
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <button
                key={step}
                className={twMerge(
                  "flex-1 h-3 bg-grey-darker transition-colors",
                  step <= lastStepReached && "bg-primary-dark",
                  step === currentStep && "bg-primary"
                )}
                disabled={step > lastStepReached || currentStep === 1}
                onClick={() => setCurrentStep(step)}
              />
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <Step1Contact
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <Step2Category formData={formData} setFormData={setFormData} />
        )}

        {currentStep === 3 && (
          <Step3CompanySize
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 4 && (
          <Step4Budget
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            budgetList={budgetList}
          />
        )}

        {currentStep === 5 && (
          <Step5Delay
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 6 && (
          <Step6Message formData={formData} setFormData={setFormData} />
        )}

        {currentStep === 7 && <Step7Confirmation formData={formData} />}

        {/* Navigation buttons */}
        <div className="flex justify-end items-center gap-6 mt-12">
          {currentStep > 1 && currentStep < 7 && (
            <Button variant="transparent" onClick={handlePrevious}>
              Précédent
            </Button>
          )}
          {(() => {
            if (currentStep === 1) {
              return (
                <Button type="submit" form="step1-form">
                  Démarrer le questionnaire
                </Button>
              );
            }

            if (currentStep < 6) {
              const canSkip =
                (currentStep === 2 &&
                  formData.categories.length === 0 &&
                  !formData.otherCategory) ||
                (currentStep === 3 && !formData.companySize) ||
                (currentStep === 4 && !formData.budget) ||
                (currentStep === 5 && !formData.delay);

              return canSkip ? (
                <Button variant="outline" onClick={handleNext}>
                  Passer
                </Button>
              ) : (
                <Button onClick={handleNext}>Suivant</Button>
              );
            } else if (currentStep === 6) {
              return <Button onClick={handleSubmit}>Envoyer</Button>;
            } else {
              return (
                <Button
                  variant="outline"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Réserver un appel</span>
                </Button>
              );
            }
          })()}
        </div>
      </div>
    </Modal>
  );
}
