"use client";

import { useState, useEffect, useRef } from "react";
import { Info } from "./Info";
import { Identity } from "./Identity";
import { Logistics } from "./Logistics";
import { WorkshopsMusic } from "./WorkshopsMusic";
import { OracleQuestions } from "./OracleQuestions";
import { OracleResult } from "./OracleResult";
import { Contribution } from "./Contribution";
import {
  RegistrationData,
  IdentityFormData,
  LogisticsFormData,
  WorkshopsMusicFormData,
  OracleFormData,
  ContributionFormData,
  BirdType,
} from "./types";
import { Button } from "@/components/Button";
import { isDev } from "@/lib/constants";

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever step changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < 7) {
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
    setFormData({ 
      ...formData, 
      oracle: data,
      birdCategory: data.birdCategory as BirdType 
    });
    nextStep();
  };

  const handleContributionSubmit = async (data: ContributionFormData) => {
    setFormData({ ...formData, contribution: data });

    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log(
          "Registration submitted successfully! Submission ID:",
          result.submissionId
        );
        console.log("Notion page created:", result.notionPageId);
        // Go to step 7 to show the oracle result
        nextStep();
      } else {
        alert(
          `Error submitting registration: ${result.details || result.error}`
        );
        console.error("Submission error:", result);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      console.error("Network error:", error);
      setIsSubmitting(false);
    }
  };


  const handleBackToHome = () => {
    window.location.href = "/?registered=true";
  };

  const handleTestSubmit = async () => {
    const mockData: RegistrationData = {
      identity: {
        firstName: "Milan",
        lastName: "Test",
        email: "milan.barande@hotmail.fr",
        phone: "+41 79 123 45 67",
        referredBy: "Sarah the Cosmic Traveler",
        previousVoyages: "3",
        genderIdentity: "male",
        allergies: "Slightly allergic to pollen, but manageable with antihistamines",
        conditions: "I have a deep connection with nocturnal activities and prefer moonlit gatherings. Sometimes I get migraines from too much direct sunlight.",
      },
      logistics: {
        nights: ["thursday", "friday", "saturday", "sunday"],
        transportation: "own-car",
        canTransportMaterial: true,
        city: "Zurich",
        country: "switzerland",
        sleepingArrangement: "own-tent",
        takeMealLead: true,
        mealPreference: "I'd love to prepare a special Saturday dinner - my famous cosmic curry that fuels interstellar journeys",
        kitchenExperience: "I've been cooking for groups of 20+ people for the past 5 years. I specialize in fusion cuisine and love creating memorable dining experiences.",
        hasMedicalEducation: false,
        medicalBackground: "",
      },
      workshopsMusic: {
        organizeWorkshop: true,
        workshopTitle: "Journey Through the Cosmic Soundscape",
        workshopDayTime: "Saturday afternoon (preferably after lunch, around 3 PM)",
        workshopDescription: "An immersive sound meditation combining crystal bowls, gongs, and electronic ambience. We'll explore the frequencies that connect us to the universe and each other. No experience needed - just bring your curiosity and open heart.",
        workshopSpace: "Quiet indoor space with good acoustics, can accommodate 15-20 people. Needs access to power for electronic equipment.",
        shareSpace: "yes",
        playDjSet: true,
        djDayTime: "Friday night - deep house set to welcome everyone into the weekend vibes",
        soundcloudLink: "https://soundcloud.com/cosmicvibes",
        musicStyle: "Deep house, melodic techno, with cosmic ambient transitions. I love building journeys that take people from introspection to collective celebration.",
        playUnplugged: true,
        unpluggedDescription: "Morning acoustic guitar sessions - gentle melodies to welcome the sunrise and ease everyone into the day. Think meditative folk meets world music.",
      },
      contribution: {
        contributionAmount: "250",
      },
      oracle: {
        question1: "My soul emerged when the first stars began to whisper secrets to the void. I've always felt like an old spirit in this modern world, carrying memories of countless moonlit nights and mystical ceremonies that transcend time itself.",
        question2: "Good flying comes from trusting the darkness and embracing the unknown. It's about using your inner compass when the world is shrouded in mystery, letting intuition guide you through the shadows with grace and precision.",
        question3: "My ideal nest is hidden in the twilight zones - a sanctuary where shadows dance with fading light. High up in ancient trees or forgotten towers, surrounded by the sounds of nocturnal life awakening. A place where mysteries unfold and the veil between worlds grows thin.",
        question4: "I would send out haunting calls that echo through the darkness - a melodic combination of whistles and deep resonant sounds that carry emotion and location. My tribe knows my voice in the night, it's unmistakable and carries the weight of shared experiences.",
        question5: "I flourish in liminal spaces - the transition between day and night, the edges of forests where wilderness meets civilization. Places where shadows provide cover and the moon illuminates just enough to see the path ahead. Mysterious environments that keep most others away.",
        question6: "My mating ritual involves elaborate aerial displays under the full moon - swooping, diving, and creating shadow patterns in the moonlight. I weave stories through movement and call out in haunting melodies that speak of depth, mystery, and the promise of adventures in the darkness.",
        birdCategory: "Night Birds",
      },
      birdCategory: "Night Birds",
    };

    try {
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockData),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `Test submission successful! Submission ID: ${result.submissionId}`
        );
        console.log("Notion page created:", result.notionPageId);
      } else {
        alert(`Error: ${result.details || result.error}`);
        console.error("Submission error:", result);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      console.error("Network error:", error);
    }
  };

  const testOracleAPI = async () => {
    try {
      const response = await fetch("/api/categorize-bird", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question1:
            "My soul appeared in ancient times, filled with mystical wisdom",
          question2:
            "Good flying requires mystical energy and spiritual connection",
          question3:
            "My ideal nest is hidden in the shadows, dark and protected",
          question4: "I would trigger lightning in the sky to call them back",
          question5:
            "I flourish in mysterious, shadowy environments with mystical energy",
          question6:
            "My mating ritual involves dramatic displays of power and lightning",
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `Oracle API Test Successful!\n\nBird Category: ${result.birdCategory}`
        );
        console.log("Bird category:", result.birdCategory);
      } else {
        alert(`Oracle API Error: ${result.error}`);
        console.error("Oracle error:", result);
      }
    } catch (error) {
      alert("Network error testing Oracle API.");
      console.error("Oracle API test error:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-4">
      <div className="mb-4 flex justify-center gap-4">
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
      <div
        ref={scrollContainerRef}
        className="bg-black/40 backdrop-blur-md rounded shadow-xl h-[92vh] md:h-[85vh] overflow-y-auto scrollbar-hide"
      >
        <div className="p-4 md:p-8 lg:p-12">
          {currentStep === 1 && <Info onNext={nextStep} />}
          {currentStep === 2 && (
            <OracleQuestions
              onNext={handleOracleSubmit}
              onPrev={prevStep}
              defaultValues={formData.oracle}
            />
          )}
          {currentStep === 3 && (
            <Identity
              onNext={handleIdentitySubmit}
              onPrev={prevStep}
              defaultValues={formData.identity}
            />
          )}
          {currentStep === 4 && (
            <Logistics
              onNext={handleLogisticsSubmit}
              onPrev={prevStep}
              defaultValues={formData.logistics}
            />
          )}
          {currentStep === 5 && (
            <WorkshopsMusic
              onNext={handleWorkshopsMusicSubmit}
              onPrev={prevStep}
              defaultValues={formData.workshopsMusic}
            />
          )}
          {currentStep === 6 && (
            <Contribution
              onSubmit={handleContributionSubmit}
              onPrev={prevStep}
              defaultValues={formData.contribution}
              isSubmitting={isSubmitting}
            />
          )}
          {currentStep === 7 && formData.birdCategory && (
            <OracleResult
              birdCategory={formData.birdCategory}
              onBackToHome={handleBackToHome}
            />
          )}
        </div>
      </div>
    </div>
  );
}
