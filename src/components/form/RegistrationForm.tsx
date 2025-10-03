"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);

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

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-4">
      <div className="bg-black/40 backdrop-blur-md rounded shadow-xl h-[92vh] md:h-[85vh] overflow-y-auto scrollbar-hide">
        <div className="p-4 md:p-8 lg:p-12">
          {currentStep === 1 && <Step1 onNext={nextStep} />}
          {currentStep === 2 && <Step2 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 3 && <Step3 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 4 && <Step4 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 5 && <Step5 onPrev={prevStep} />}
        </div>
      </div>
    </div>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="prose prose-lg max-w-none text-white">
        <p className="font-serif italic mb-4">Dearest Space Explorers,</p>
        
        <p className="mb-4">
          As Laser Sun completes its seventh orbit around Point 0, the mighty Space Council 
          once again hosts the METTA GAMES: four days of challenges requiring combined strength, 
          skills and collaboration during the day, followed by lavish festivities at night. 
          Star athletes from all over the universe gather to demonstrate and celebrate the 
          power of community.
        </p>

        <p className="mb-4">
          As a representative of your species, you have been preparing for this moment your 
          entire life: <strong>You are in.</strong>
        </p>

        <p className="mb-4">
          <strong>Mission:</strong> The Metta Games are a prolonged weekend among space friends — 
          everyone partaking is responsible for their success and every helping hand, tentacle, 
          or telekinetic power is needed.
        </p>

        <p className="mb-4">
          <strong>Timeline:</strong> Our 6th journey will last from November 21st to November 25th 
          the year #2024 in earth time. Early arrival on Thursday morning to build up the arena is 
          possible, as a small group of space coaches will prepare the athletes&apos; quarters.
        </p>

        <p className="mb-4">
          <strong>Coordinates:</strong> The Metta Games will take place at a location that has 
          proven itself during past journeys. You will be provided with further info after signup.
        </p>

        <p className="mb-4">
          If you&apos;d like to join, please fill out the following scroll and wire the money 
          (only earth payment accepted: the outer worlds and galactic ones would generate some 
          unnecessary fees). Participants will be chosen by first come, first served. There will 
          be a waiting list once all outpost beds are reserved.
        </p>

        <p className="mb-4 font-semibold">
          Please remember: There are a few agreements the Intergalactic Space Council came to 
          terms with after the sixth big bang to ensure harmony and prevent further universal resets:
        </p>

        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>This is a prolonged weekend among space friends</li>
          <li>Everyone participating contributes and takes responsibility to make the journey successful.</li>
          <li>The weekend is self organised by its participants</li>
          <li>
            While being sensual and sexual creatures, we are always conscious about the space 
            around us and keep the heated interactions in private or dedicated spaces.
          </li>
          <li>
            Any decision is taken by the principle of{" "}
            <a 
              href="https://patterns.sociocracy30.org/principle-consent.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
            >
              &quot;consent&quot;
            </a>
          </li>
          <li>
            Everything is space transparent: Have a look at our notion space that we use for{" "}
            <a 
              href="https://nmdl.notion.site/Mettaway-7a7725d2de4748c0988cd65acd17e44d" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
            >
              organisation
            </a>
          </li>
        </ol>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Embark on the Journey
        </Button>
      </div>
    </div>
  );
}

function Step2({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h2 className="text-2xl font-bold text-white">Step 2</h2>
      <p className="text-gray-200">Step 2 content will go here.</p>
      
      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onPrev}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

function Step3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h2 className="text-2xl font-bold text-white">Step 3</h2>
      <p className="text-gray-200">Step 3 content will go here.</p>
      
      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onPrev}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

function Step4({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h2 className="text-2xl font-bold text-white">Step 4</h2>
      <p className="text-gray-200">Step 4 content will go here.</p>
      
      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onPrev}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

function Step5({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h2 className="text-2xl font-bold text-white">Step 5</h2>
      <p className="text-gray-200">Step 5 content will go here.</p>
      
      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onPrev}>Back</Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}

