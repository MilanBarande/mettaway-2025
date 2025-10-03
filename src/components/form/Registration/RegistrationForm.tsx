"use client";

import { useState } from "react";
import { Info } from "./Info";
import { Identity } from "./Identity";
import { Logistics } from "./Logistics";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { RegistrationData, IdentityFormData, LogisticsFormData } from "./types";

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
          {currentStep === 4 && <Step4 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 5 && <Step5 onPrev={prevStep} />}
        </div>
      </div>
    </div>
  );
}

