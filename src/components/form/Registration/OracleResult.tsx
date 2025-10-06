import { Button } from "@/components/Button";
import { BirdType, BIRD_VIDEO_MAP } from "./types";

type OracleResultProps = {
  birdCategory: BirdType;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
};

export function OracleResult({ birdCategory, onSubmit, onPrev, isSubmitting }: OracleResultProps) {
  const videoSrc = `/bird-families/${BIRD_VIDEO_MAP[birdCategory]}`;

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Your Bird Family</h2>
        <p className="text-gray-200">
          The Metta-Oracle has spoken and revealed your true nature.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Bird family video */}
        <div className="rounded-lg overflow-hidden max-w-md mx-auto">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>
        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-6 text-center animate-fade-in max-w-md mx-auto">
        
          <p className="text-blue-200 text-2xl font-bold">
            You are part of the {birdCategory} family
          </p>
        </div>
        
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 text-gray-200 text-sm leading-relaxed italic">
          The Oracle is all knowing and might have placed you in a family that you didn&apos;t know you were part of deep down in your unconscious. Even if this doesn&apos;t seem like a perfect fit, we&apos;d like to encourage you to embrace the oracle&apos;s wisdom and always remember that you sure as hell will be part of a beautiful flock of birdies
        </div>

      </div>

      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4 pb-4">
       
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Join the Ventara Adventure'}
        </Button>
      </div>
    </div>
  );
}

