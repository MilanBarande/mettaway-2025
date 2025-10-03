import { Button } from "@/components/Button";

type Step5Props = {
  onPrev: () => void;
};

export function Step5({ onPrev }: Step5Props) {
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

