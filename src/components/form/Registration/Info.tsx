import { Button } from "@/components/Button";

type InfoProps = {
  onNext: () => void;
};

export function Info({ onNext }: InfoProps) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="prose prose-lg max-w-none text-white">
        <p className="font-serif text-xl font-bold mb-4">Fellow winged explorers</p>

        <p className="mb-4 italic">
          <em>As old as wind, the ancient rhythms have echoed through the galaxies we call home.</em>
        </p>

        <p className="mb-4 italic">
          <em>It took millennia for these patterns to turn into melodies, the melodies into voices, and for us winged ones to shape these voices into songs. We have all heard them – we all know them – you know them.</em>
        </p>

        <p className="mb-4 italic">
          <em>But remember: No one felt this rhythm like the ancient winged one, </em>
          <strong>O&apos;Pteryx</strong>
          <em>, the mother of us all. Don&apos;t we still tell our hatchlings of her moves, of her songs? We pass on the tales – to catch the wind, to dance in it, to play with it, and to sing along as she once did to the rhythm that surrounds us.</em>
        </p>

        <p className="mb-4 italic">
          <em>And yet, while her name has been engraved into stone, her true dances and melodies have long slipped from our grasp. Since her time, many moons have gone through their cycles. Notes have faltered through mistake, steps have shifted through ignorance, and her harmonies have faded along the way. Though we still hear the faint rhythm, what we remember are only fragments, stories – not the songs themselves.</em>
        </p>

        <p className="mb-4 italic">
          <em>Explorers - the time has come and the chance to rejoice is nigh. Join us, fellow winged-ones , wherever you are. Join us on </em>
          <strong>Ventara</strong>
          <em>, the home planet of O&apos;Pteryx, to bring our voices together, to move collectively, and to rediscover this very rhythm.</em>
        </p>

        <p className="mb-4">
          <strong>Mission:</strong> Ventara is a prolonged weekend among friends — every bird partaking is responsible for their success and every helping wing, beak, and voice is needed.
        </p>

        <p className="mb-4">
          <strong>Timeline:</strong> Our 7th voyage will last from November 27th to 1st of December 2025 in earth time. Early arrival on Thursday morning to build up and on Monday to build down the mother-nest is possible and appreciated (we need every helping claw).
        </p>

        <p className="mb-4">
          <strong>Coordinates:</strong> We&apos;ll be in the same location of past voyages. You will be provided with further coordinates to find <strong>Ventara</strong> after your signup.
        </p>

        <p className="mb-4">
          <strong>Next steps:</strong> If you&apos;d like to join, please fill out the following scroll and wire your financial contribution: Participants will be chosen by two rounds:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <em><strong>Round 1:</strong>Invitation only through the flocks of Ventara. (First come – first serve.) Sign-up window stays open for two weeks until we start round two.</em>
          </li>
          <li>
            <em><strong>Round 2:</strong>The remaining spots will be posted as usual in our communication-Channel (First come – first serve)</em>
          </li>
        </ul>

        <p className="mb-4">There will be a waiting list once all nest-spots are reserved.</p>

        <p className="mb-4 font-semibold">
          Please remember: There are a few agreements the Flocks of Ventara came to terms with after the past voyages to ensure peace and harmony:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><em>This is a prolonged weekend amongst winged-ones</em></li>
          <li><em>Everybird participating contributes and takes responsibility to make the journey successful.</em></li>
          <li><em>The weekend is self-organised by its participants</em></li>
          <li><em>While being sensual and sexual creatures, we are always conscious about the space around us and keep the heated interactions in private or dedicated nests.</em></li>
          <li><em>Any decision is taken by the principle of &quot;consent&quot;</em></li>
          <li><em>Everything is transparent: Have a look at our notion space that we use for organization</em></li>
        </ul>

        <p className="mb-4 italic">
          <strong>Spread your feathers, catch the currents.</strong>
        </p>

        <p className="mb-4 italic">We shall be as loud and beautiful as O&apos;Pteryx.</p>

        <p className="mb-4 italic">We shall be as colorful as we were always meant to be.</p>

        <p className="mb-4 italic">
          From our nest to yours, with love and kindness
        </p>

        <p className="mb-4 italic font-bold">The Flocks of Ventara</p>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Spread Your Wings
        </Button>
      </div>
    </div>
  );
}

