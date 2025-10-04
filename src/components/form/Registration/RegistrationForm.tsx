"use client";

import { useState } from "react";
import { Info } from "./Info";
import { Identity } from "./Identity";
import { Logistics } from "./Logistics";
import { WorkshopsMusic } from "./WorkshopsMusic";
import { Contribution } from "./Contribution";
import { RegistrationData, IdentityFormData, LogisticsFormData, WorkshopsMusicFormData, ContributionFormData } from "./types";

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({});

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIdentitySubmit = (data: IdentityFormData) => {
    setFormData({ ...formData, identity: data });
    nextStep();
  };

  const handleLogisticsSubmit = (data: LogisticsFormData) => {
    setFormData({ ...formData, logistics: data });
    nextStep();
  };

  const handleWorkshopsMusicSubmit = (data: WorkshopsMusicFormData) => {
    setFormData({ ...formData, workshopsMusic: data });
    nextStep();
  };

  const handleContributionSubmit = (data: ContributionFormData) => {
    const finalData = { ...formData, contribution: data };
    setFormData(finalData);
    // TODO: Submit the complete form data to API
    console.log("Complete registration data:", finalData);
    alert("Registration submitted! (This is a placeholder - implement API submission)");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-4">
      <div className="bg-black/40 backdrop-blur-md rounded shadow-xl h-[92vh] md:h-[85vh] overflow-y-auto scrollbar-hide">
        <div className="p-4 md:p-8 lg:p-12">
          {currentStep === 1 && <Info onNext={nextStep} />}
          {currentStep === 2 && (
            <Identity
              onNext={handleIdentitySubmit}
              onPrev={prevStep}
              defaultValues={formData.identity}
            />
          )}
          {currentStep === 3 && (
            <Logistics
              onNext={handleLogisticsSubmit}
              onPrev={prevStep}
              defaultValues={formData.logistics}
            />
          )}
          {currentStep === 4 && (
            <WorkshopsMusic
              onNext={handleWorkshopsMusicSubmit}
              onPrev={prevStep}
              defaultValues={formData.workshopsMusic}
            />
          )}
          {currentStep === 5 && (
            <Contribution
              onSubmit={handleContributionSubmit}
              onPrev={prevStep}
              defaultValues={formData.contribution}
            />
          )}
        </div>
      </div>
    </div>
  );
}

