"use client";

import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/Input";
import { useContactModal } from "@/app/contexts/contact-modal-context";

export default function Contact() {
  const [formData, setFormData] = useState<{
    name?: string;
    phone?: string;
    email: string;
    message?: string;
  }>({
    name: undefined,
    phone: undefined,
    email: "",
    message: undefined,
  });
  const { openModal } = useContactModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="grid place-items-center py-32">
      <div
        className="group team-member-card relative bg-grey-lightest/5 backdrop-blur-md w-5xl"
        style={
          {
            "--corner-size": "80px",
            clipPath: `polygon(
                        var(--corner-size) 0,
                        var(--corner-size) -50%,
                        100% -50%,
                        100% 100%,
                        0 100%,
                        0 var(--corner-size)
                      )`,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
          style={
            {
              "--corner-size": "80px",
              "--border-width": "1px",
              clipPath: `polygon(
                          var(--corner-size) 0,
                          calc(100% - var(--border-width)) 0,
                          calc(100% - var(--border-width)) var(--border-width),
                          calc(var(--corner-size) + var(--border-width) / 2) var(--border-width),
                          var(--border-width) calc(var(--corner-size) + var(--border-width) / 2),
                          var(--border-width) calc(100% - var(--border-width)),
                          calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                          calc(100% - var(--border-width)) 0,
                          100% 0,
                          100% 100%,
                          0 100%,
                          0 var(--corner-size)
                        )`,
            } as React.CSSProperties
          }
        ></div>
        <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 py-2 text-3xl font-orbitron font-bold bg-primary text-grey-darkest">
          Contactez nous
        </h2>
        <div className="grid grid-cols-2 items-center gap-4 p-10 pt-16">
          <div className="flex flex-col items-center gap-10 px-8">
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-xl">Restons en contact</h3>
              <p className="text-center">
                Répondez à ce formulaire pour planifier un rendez-vous Google
                Meet avec nous.
              </p>
            </div>
            <Button onClick={() => openModal()}>Répondre en 2min</Button>
          </div>
          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <Input
              label="Nom"
              name="name"
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: formData.email || "",
                  name: e.target.value,
                })
              }
            />
            <Input
              label="Téléphone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: formData.email || "",
                  phone: e.target.value,
                })
              }
            />
            <div className="md:col-span-2">
              <Input
                label="E-mail"
                name="email"
                type="email"
                required
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Message"
                name="message"
                as="textarea"
                value={formData.message || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({
                    ...formData,
                    email: formData.email || "",
                    message: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Envoyer</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
