import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { contributionSchema, ContributionFormData } from "./types";
import { isDev, PAYMENT_INFO } from "@/lib/constants";

type ContributionProps = {
  onSubmit: (data: ContributionFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<ContributionFormData>;
};

export function Contribution({ onSubmit, onPrev, defaultValues }: ContributionProps) {
  const [ibanCopied, setIbanCopied] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ContributionFormData>({
    resolver: isDev ? undefined : zodResolver(contributionSchema),
    defaultValues,
  });

  const contributionAmountValue = watch("contributionAmount");

  const copyIban = () => {
    navigator.clipboard.writeText(PAYMENT_INFO.iban.replace(/\s/g, ""));
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 2000);
  };

  const contributionOptions = [
    { value: "200", label: "200+ CHF/EUR" },
    { value: "175", label: "175 CHF/EUR" },
    { value: "150", label: "150 CHF/EUR" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Contribution</h2>
        <div className="text-gray-200 space-y-4">
          <p>
            To make the journey to Ventara possible for as many as possible, we provide 
            you three price suggestions.
          </p>
          <p>
            The price includes a bed and food for the whole journey. Since we&apos;ll only provide 
            plant based Earth food, don&apos;t hesitate to bring what ever else you feel like. Please 
            also note that alcoholic drinks and transport cost are not included.
          </p>
          <div className="space-y-2">
            <p>
              <strong>A: 200+ CHF/EUR</strong>
              <br />
              if you can buy things without thinking about cash.
              <br />
              This price covers for a traveller with fewer means.
            </p>
            <p>
              <strong>B: 175 CHF/EUR</strong>
              <br />
              if you have to be a bit conscious about your spendings, but you&apos;re generally fine.
              <br />
              This price covers the cost.
            </p>
            <p>
              <strong>C: 150 CHF/EUR</strong>
              <br />
              if you have to keep track of your monthly budget.
            </p>
          </div>
        </div>
      </div>

      <RadioGroup
        label="Cool cool cool, you can expect this amount from me:"
        name="contributionAmount"
        options={contributionOptions}
        required
        value={contributionAmountValue}
        onChange={(value) => setValue("contributionAmount", value)}
        error={errors.contributionAmount?.message}
      />

      <div className="text-gray-200">
        <p>
          If the financial contribution prohibits you from participating, please reach out to 
          us - we are your friends:{" "}
          <a
            href={`mailto:${PAYMENT_INFO.contactEmail}`}
            className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
          >
            {PAYMENT_INFO.contactEmail}
          </a>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white">Payment Channels</h3>
        
        <div className="text-gray-200 space-y-4">
          <p>
            With the completion of this form, your seat will be temporarily reserved for a week. 
            Only once you paid the travel fee, your seat will be unconditionally reserved for you. 
            Money transfers can be made in the following ways:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Revolut directly to {PAYMENT_INFO.revolut.name} ({PAYMENT_INFO.revolut.phone})</li>
            <li>
              Bank transfer to{" "}
              <span className="relative inline-block">
                <button
                  type="button"
                  onClick={copyIban}
                  className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-100 underline cursor-pointer font-mono"
                  title="Click to copy IBAN"
                >
                  {PAYMENT_INFO.iban}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
                {ibanCopied && (
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </span>
              , {PAYMENT_INFO.accountHolder}, {PAYMENT_INFO.address}
            </li>
            <li>
              Twint using{" "}
              <a
                href={PAYMENT_INFO.twint.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
              >
                this link
              </a>
            </li>
          </ul>
          
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" type="button" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}

