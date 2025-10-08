import { Button } from "@/components/Button";
import { BirdType, BIRD_VIDEO_MAP } from "./types";
import { PAYMENT_INFO } from "@/lib/constants";

type OracleResultProps = {
  birdCategory: BirdType;
  onBackToHome: () => void;
};

export function OracleResult({ birdCategory, onBackToHome }: OracleResultProps) {
  const videoSrc = `/bird-families/${BIRD_VIDEO_MAP[birdCategory]}`;

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">You are registered!</h2>
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
        
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 text-gray-200 text-sm leading-relaxed">
          <p className="mb-3">
            <strong>Welcome to the flock!</strong> Your registration is complete and your nest-spot is temporarily reserved for one week.
          </p>
          <p className="mb-3">
            <strong>Next:</strong> Complete your payment to secure your spot:
          </p>
          <ul className="mb-3 ml-4 text-xs space-y-1">
            <li>• <strong>Revolut:</strong> Send directly to {PAYMENT_INFO.revolut.name} ({PAYMENT_INFO.revolut.phone})</li>
            <li>• <strong>Bank Transfer:</strong> IBAN {PAYMENT_INFO.iban}, {PAYMENT_INFO.accountHolder}, {PAYMENT_INFO.address}</li>
            <li>• <strong>Twint:</strong> <a href={PAYMENT_INFO.twint.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">Pay now</a></li>
          </ul>
          <p className="italic">
            Even if this family doesn&apos;t seem like a perfect fit, embrace the Oracle&apos;s wisdom—you&apos;re part of our beautiful flock! 🐦✨
          </p>
        </div>

      </div>

      <div className="flex justify-center pt-4">
        <Button type="button" onClick={onBackToHome}>
          Back to Homepage
        </Button>
      </div>

    </div>
  );
}

