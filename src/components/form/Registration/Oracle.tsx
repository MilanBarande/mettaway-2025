import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/form/inputs/Textarea";
import { oracleSchema, OracleFormData, BirdType, BIRD_VIDEO_MAP } from "./types";

type OracleProps = {
  onNext: (data: OracleFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<OracleFormData>;
};

export function Oracle({ onNext, onPrev, defaultValues }: OracleProps) {
  const [isConsulting, setIsConsulting] = useState(false);
  const [birdCategory, setBirdCategory] = useState<BirdType | null>(null);
  const [hasConsulted, setHasConsulted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<OracleFormData>({
    resolver: zodResolver(oracleSchema),
    defaultValues,
  });

  // Preload the bird video once we know the category
  useEffect(() => {
    if (birdCategory) {
      const videoSrc = `/bird-families/${BIRD_VIDEO_MAP[birdCategory]}`;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoSrc;
      document.head.appendChild(link);

      // Cleanup
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [birdCategory]);

  const consultOracle = async () => {
    // Only allow consulting once
    if (hasConsulted) {
      alert("The Metta-Oracle has already spoken. Your destiny has been revealed!");
      return;
    }

    const values = getValues();
    
    // Check if all questions are answered
    if (!values.question1 || !values.question2 || !values.question3 || !values.question4 || !values.question5 || !values.question6) {
      alert("Please answer all questions before consulting the Metta-Oracle");
      return;
    }

    setIsConsulting(true);

    try {
      const response = await fetch('/api/categorize-bird', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question1: values.question1,
          question2: values.question2,
          question3: values.question3,
          question4: values.question4,
          question5: values.question5,
          question6: values.question6,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setBirdCategory(result.birdCategory);
        setValue("birdCategory", result.birdCategory);
        setHasConsulted(true);
      } else {
        alert(`Error consulting oracle: ${result.error}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      console.error('Oracle consultation error:', error);
    } finally {
      setIsConsulting(false);
    }
  };

  const handleFormSubmit = (data: OracleFormData) => {
    if (!birdCategory) {
      alert("Please consult the Metta-Oracle before proceeding");
      return;
    }
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Consult the Metta-Oracle</h2>
        <p className="text-gray-200">
          The Metta-Oracle needs to know a few things about you
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

        <div className="flex flex-col items-center md:items-end gap-4 py-4">
          <Button
            type="button"
            onClick={consultOracle}
            disabled={isConsulting || hasConsulted}
            className="min-w-[250px]"
          >
            {isConsulting ? "Consulting..." : hasConsulted ? "Oracle Consulted" : "Consult the Metta-Oracle"}
          </Button>
          
          {isConsulting && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-white text-sm">The Oracle is contemplating...</p>
            </div>
          )}
          
          {birdCategory && !isConsulting && (
            <>
              <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-6 text-center animate-fade-in md:self-stretch">
                <p className="text-white text-xl font-semibold mb-2">
                  The Metta-Oracle has spoken...
                </p>
                <p className="text-blue-200 text-2xl font-bold">
                  You are part of the {birdCategory} family
                </p>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 text-gray-200 text-sm leading-relaxed italic md:self-stretch">
                The Oracle is all knowing and might have placed you in a family that you didn&apos;t know you were part of deep down in your unconscious. Even if this doesn&apos;t seem like a perfect fit, we&apos;d like to encourage you to embrace the oracle&apos;s wisdom and always remember that you sure as hell will be part of a beautiful flock of birdies
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4 pt-4">
        <Button variant="secondary" type="button" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit" disabled={!birdCategory}>
          Join the Ventara Adventure
        </Button>
      </div>
    </form>
  );
}

