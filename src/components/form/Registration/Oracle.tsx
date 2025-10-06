import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { TextInput } from "@/components/form/inputs/TextInput";
import { oracleSchema, OracleFormData, BirdType } from "./types";
import { isDev } from "@/lib/constants";

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
    watch,
    setValue,
    getValues,
  } = useForm<OracleFormData>({
    resolver: isDev ? undefined : zodResolver(oracleSchema),
    defaultValues,
  });

  const question1Value = watch("question1");
  const question2Value = watch("question2");
  const question3Value = watch("question3");
  const question4Value = watch("question4");

  const question1Options = [
    { value: "antiquity", label: "Antiquity" },
    { value: "20th-century", label: "The 20th century" },
    { value: "prehistory", label: "Prehistory" },
    { value: "2078", label: "2078" },
    { value: "tropical-paradise", label: "A tropical paradise" },
    { value: "other", label: "Other" },
  ];

  const question2Options = [
    { value: "paper", label: "Made of paper" },
    { value: "motor", label: "Equipped with a motor" },
    { value: "young", label: "Young and energetic" },
    { value: "mystical", label: "Full of mystical energy" },
    { value: "aerodynamic", label: "Aerodynamically perfect" },
    { value: "other", label: "Other" },
  ];

  const question3Options = [
    { value: "modern", label: "Modern and functional" },
    { value: "cozy", label: "Cozy and comfortable" },
    { value: "auto-hatching", label: "With advanced auto-hatching features" },
    { value: "shadows", label: "Hidden in the shadows" },
    { value: "shores", label: "Built on sandy shores" },
    { value: "other", label: "Other" },
  ];

  const question4Options = [
    { value: "scream", label: "Scream" },
    { value: "vibrate", label: "Vibrate at 8000 hertz" },
    { value: "lightning", label: "Trigger some lightning in the sky" },
    { value: "6g", label: "Use 6G connection" },
    { value: "melodious", label: "Sing a melodious tune" },
    { value: "other", label: "Other" },
  ];

  const consultOracle = async () => {
    // In non-dev mode, only allow consulting once
    if (!isDev && hasConsulted) {
      alert("The Metta-Oracle has already spoken. Your destiny has been revealed!");
      return;
    }

    const values = getValues();
    
    // Check if all questions are answered
    if (!values.question1 || !values.question2 || !values.question3 || !values.question4) {
      alert("Please answer all questions before consulting the Metta-Oracle");
      return;
    }

    // Check if "other" is selected, that the text field is filled
    if (values.question1 === "other" && (!values.question1Other || values.question1Other.trim() === "")) {
      alert("Please specify your answer for question 1");
      return;
    }
    if (values.question2 === "other" && (!values.question2Other || values.question2Other.trim() === "")) {
      alert("Please specify your answer for question 2");
      return;
    }
    if (values.question3 === "other" && (!values.question3Other || values.question3Other.trim() === "")) {
      alert("Please specify your answer for question 3");
      return;
    }
    if (values.question4 === "other" && (!values.question4Other || values.question4Other.trim() === "")) {
      alert("Please specify your answer for question 4");
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
          question1Other: values.question1Other,
          question2: values.question2,
          question2Other: values.question2Other,
          question3: values.question3,
          question3Other: values.question3Other,
          question4: values.question4,
          question4Other: values.question4Other,
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
          Answer these questions to discover your spirit bird for this journey.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <RadioGroup
            label="Your soul is definitely from"
            name="question1"
            options={question1Options}
            required
            value={question1Value}
            onChange={(value) => setValue("question1", value)}
            error={errors.question1?.message}
          />
          <div className="mt-2 md:max-w-md">
            <TextInput
              label="If other, please specify"
              placeholder="Your answer..."
              {...register("question1Other")}
              onChange={(e) => {
                if (e.target.value && question1Value !== "other") {
                  setValue("question1", "other");
                }
              }}
              error={errors.question1Other?.message}
            />
          </div>
        </div>

        <div>
          <RadioGroup
            label="For good flying, it's best to be"
            name="question2"
            options={question2Options}
            required
            value={question2Value}
            onChange={(value) => setValue("question2", value)}
            error={errors.question2?.message}
          />
          <div className="mt-2 md:max-w-md">
            <TextInput
              label="If other, please specify"
              placeholder="Your answer..."
              {...register("question2Other")}
              onChange={(e) => {
                if (e.target.value && question2Value !== "other") {
                  setValue("question2", "other");
                }
              }}
              error={errors.question2Other?.message}
            />
          </div>
        </div>

        <div>
          <RadioGroup
            label="A good nest is"
            name="question3"
            options={question3Options}
            required
            value={question3Value}
            onChange={(value) => setValue("question3", value)}
            error={errors.question3?.message}
          />
          <div className="mt-2 md:max-w-md">
            <TextInput
              label="If other, please specify"
              placeholder="Your answer..."
              {...register("question3Other")}
              onChange={(e) => {
                if (e.target.value && question3Value !== "other") {
                  setValue("question3", "other");
                }
              }}
              error={errors.question3Other?.message}
            />
          </div>
        </div>

        <div>
          <RadioGroup
            label="To call your flock, you"
            name="question4"
            options={question4Options}
            required
            value={question4Value}
            onChange={(value) => setValue("question4", value)}
            error={errors.question4?.message}
          />
          <div className="mt-2 md:max-w-md">
            <TextInput
              label="If other, please specify"
              placeholder="Your answer..."
              {...register("question4Other")}
              onChange={(e) => {
                if (e.target.value && question4Value !== "other") {
                  setValue("question4", "other");
                }
              }}
              error={errors.question4Other?.message}
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 py-4">
          <Button
            type="button"
            onClick={consultOracle}
            disabled={isConsulting || (!isDev && hasConsulted)}
            className="min-w-[250px]"
          >
            {isConsulting ? "Consulting..." : hasConsulted && !isDev ? "Oracle Consulted" : "Consult the Metta-Oracle"}
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

