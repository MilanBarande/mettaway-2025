"use client";

import { useState } from "react";
import { Info } from "./Info";
import { Identity } from "./Identity";
import { Logistics } from "./Logistics";
import { WorkshopsMusic } from "./WorkshopsMusic";
import { Oracle } from "./Oracle";
import { Contribution } from "./Contribution";
import { RegistrationData, IdentityFormData, LogisticsFormData, WorkshopsMusicFormData, OracleFormData, ContributionFormData, BirdType } from "./types";
import { isDev } from "@/lib/constants";
import { Button } from "@/components/Button";

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({});

  const nextStep = () => {
    if (currentStep < 6) {
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

  const handleOracleSubmit = (data: OracleFormData) => {
    setFormData({ ...formData, birdCategory: data.birdCategory as BirdType });
    nextStep();
  };

  const handleContributionSubmit = async (data: ContributionFormData) => {
    const finalData = { ...formData, contribution: data };
    setFormData(finalData);
    
    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Registration submitted successfully! Submission ID:', result.submissionId);
        console.log('Notion page created:', result.notionPageId);
      } else {
        alert(`Error submitting registration: ${result.details || result.error}`);
        console.error('Submission error:', result);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      console.error('Network error:', error);
    }
  };

  const handleTestSubmit = async () => {
    const mockData: RegistrationData = {
      identity: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+41 79 123 45 67",
        referredBy: "Friend Name",
        previousVoyages: "2",
        genderIdentity: "diverse",
        allergies: "None",
        conditions: "All good",
      },
      logistics: {
        nights: ["thursday", "friday", "saturday", "sunday"],
        transportation: "own-car",
        canTransportMaterial: true,
        city: "Zurich",
        country: "switzerland",
        sleepingArrangement: "own-van",
        takeMealLead: true,
        mealPreference: "Saturday dinner",
        kitchenExperience: "I make great pasta!",
        hasMedicalEducation: false,
      },
      workshopsMusic: {
        organizeWorkshop: true,
        workshopTitle: "Space Meditation",
        workshopDayTime: "Saturday morning",
        workshopDescription: "A journey through the cosmos",
        workshopSpace: "Quiet space, max 15 people",
        shareSpace: "yes",
        playDjSet: true,
        djDayTime: "Friday night",
        soundcloudLink: "https://soundcloud.com/test",
        musicStyle: "Cosmic techno",
        playUnplugged: true,
        unpluggedDescription: "Acoustic guitar vibes",
      },
      contribution: {
        contributionAmount: "200",
      },
      birdCategory: "Birds of Paradise",
    };

    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Test submission successful! Submission ID: ${result.submissionId}`);
        console.log('Notion page created:', result.notionPageId);
      } else {
        alert(`Error: ${result.details || result.error}`);
        console.error('Submission error:', result);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      console.error('Network error:', error);
    }
  };

  const testOracleAPI = async () => {
    try {
      const response = await fetch('/api/categorize-bird', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question1: "antiquity",
          question2: "mystical",
          question3: "shadows",
          question4: "lightning",
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Oracle API Test Successful!\n\nBird Category: ${result.birdCategory}`);
        console.log('Bird category:', result.birdCategory);
      } else {
        alert(`Oracle API Error: ${result.error}`);
        console.error('Oracle error:', result);
      }
    } catch (error) {
      alert('Network error testing Oracle API.');
      console.error('Oracle API test error:', error);
    }
  };

  const goToOracle = () => {
    setCurrentStep(5);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-4">
      <div className="mb-4 flex justify-center gap-4">
        <Button onClick={goToOracle} className="bg-indigo-600 hover:bg-indigo-700">
          🔮 Go straight to the Oracle
        </Button>
        {isDev && (
          <>
            <Button onClick={testOracleAPI} className="bg-purple-600 hover:bg-purple-700">
              🔬 Test Oracle API (Dev Only)
            </Button>
            <Button onClick={handleTestSubmit} className="bg-green-600 hover:bg-green-700">
              🧪 Test Submit (Dev Only)
            </Button>
          </>
        )}
      </div>
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
            <Oracle
              onNext={handleOracleSubmit}
              onPrev={prevStep}
              defaultValues={undefined}
            />
          )}
          {currentStep === 6 && (
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

