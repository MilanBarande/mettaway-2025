import { Button } from "@/components/Button";

type Step4Props = {
  onNext: () => void;
  onPrev: () => void;
};

export function Step4({ onNext, onPrev }: Step4Props) {
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

