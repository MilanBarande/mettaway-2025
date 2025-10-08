import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/form/inputs/Textarea";
import { oracleSchema, OracleFormData, BirdType, BIRD_VIDEO_MAP } from "./types";
import { isDev } from "@/lib/constants";

type OracleQuestionsProps = {
  onNext: (data: OracleFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<OracleFormData>;
};

export function OracleQuestions({
  onNext,
  onPrev,
  defaultValues,
}: OracleQuestionsProps) {
  const [isConsulting, setIsConsulting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OracleFormData>({
    resolver: zodResolver(oracleSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: OracleFormData) => {
    setIsConsulting(true);

    try {
      const response = await fetch("/api/categorize-bird", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question1: data.question1,
          question2: data.question2,
          question3: data.question3,
          question4: data.question4,
          question5: data.question5,
          question6: data.question6,
        }),
      });

      const result = await response.json();

      if (result.success && result.birdCategory) {
        setValue("birdCategory", result.birdCategory);
        
        // Preload the bird video for instant rendering later
        const videoSrc = `/bird-families/${BIRD_VIDEO_MAP[result?.birdCategory as BirdType]}`;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = videoSrc;
        document.head.appendChild(link);
        
        onNext({ ...data, birdCategory: result.birdCategory });
      } else {
        console.error("Error consulting oracle:", result.error);
        setShowErrorModal(true);
        setIsConsulting(false);
      }
    } catch (error) {
      console.error("Oracle consultation error:", error);
      setShowErrorModal(true);
      setIsConsulting(false);
    }
  };

  const handleSkip = () => {
    // Mock data for skipping the oracle questions in dev mode
    const mockData: OracleFormData = {
      question1: "My soul appeared in ancient times, filled with mystical wisdom and cosmic energy that transcends the boundaries of time and space.",
      question2: "Good flying requires perfect harmony between body, mind, and spirit - a delicate balance of intuition, grace, and the unseen forces that guide us through the ether.",
      question3: "My ideal nest is hidden in the twilight zones - a sanctuary where shadows dance with fading light, surrounded by ancient trees and forgotten wisdom.",
      question4: "I would send out haunting calls that echo through the darkness - melodic combinations that carry emotion and location across vast distances.",
      question5: "I flourish in mysterious, shadowy environments with mystical energy - places where the veil between worlds grows thin and secrets unfold.",
      question6: "My mating ritual involves elaborate aerial displays under the full moon - weaving stories through movement and calling out in haunting melodies.",
      birdCategory: "Night Birds",
    };
    onNext(mockData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-8 pt-4"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Consult the Metta-Oracle 
        </h2>
        <p className="text-gray-200">
          First of all, the Metta-Oracle needs to know a few things about you...
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Textarea
          label="When did your soul appear on this planet?"
          placeholder="Share your answer..."
          required
          {...register("question1")}
          error={errors.question1?.message}
        />

        <Textarea
          label="What makes for good flying?"
          placeholder="Share your answer..."
          required
          {...register("question2")}
          error={errors.question2?.message}
        />

        <Textarea
          label="Describe your ideal nest"
          placeholder="Share your answer..."
          required
          {...register("question3")}
          error={errors.question3?.message}
        />

        <Textarea
          label="You just lost your group, how do you call them back?"
          placeholder="Share your answer..."
          required
          {...register("question4")}
          error={errors.question4?.message}
        />

        <Textarea
          label="In what kind of environment do you flourish the most?"
          placeholder="Share your answer..."
          required
          {...register("question5")}
          error={errors.question5?.message}
        />

        <Textarea
          label="Tell me about your mating ritual"
          placeholder="Share your answer..."
          required
          {...register("question6")}
          error={errors.question6?.message}
        />
      </div>

      {showErrorModal && (
        <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4 text-gray-200 text-sm leading-relaxed">
          <span className="font-semibold">
            The Oracle could not be reached...
          </span>{" "}
          Please try again and contact us on Telegram if the problem persists.
        </div>
      )}

      {isConsulting && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white text-sm">The Oracle is contemplating...</p>
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4 pt-4">
        <div className="flex gap-4">
          <Button variant="secondary" type="button" onClick={onPrev}>
            Back
          </Button>
          {isDev && (
            <Button
              type="button"
              onClick={handleSkip}
              className="bg-purple-600 hover:bg-purple-700"
            >
              🚀 Skip Oracle (Dev Only)
            </Button>
          )}
        </div>
        <Button type="submit" disabled={isConsulting}>
          {isConsulting
            ? "Consulting the Oracle..."
            : "Consult the Metta-Oracle"}
        </Button>
      </div>
    </form>
  );
}
