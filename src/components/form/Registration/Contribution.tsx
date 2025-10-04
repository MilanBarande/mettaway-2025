import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { contributionSchema, ContributionFormData } from "./types";
import { isDev } from "@/lib/constants";

type ContributionProps = {
  onSubmit: (data: ContributionFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<ContributionFormData>;
};

export function Contribution({ onSubmit, onPrev, defaultValues }: ContributionProps) {
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
  const paymentMethodValue = watch("paymentMethod");

  const contributionOptions = [
    { value: "195", label: "195+ CHF/EUR" },
    { value: "160", label: "160 CHF/EUR" },
    { value: "125", label: "125 CHF/EUR" },
  ];

  const paymentMethodOptions = [
    { value: "revolut", label: "Revolut" },
    { value: "bank-transfer", label: "Bank Transfer" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Contribution</h2>
        <div className="text-gray-200 space-y-4">
          <p>
            To make the journey to the Metta Games possible for as many as possible, we provide 
            you three price suggestions.
          </p>
          <p>
            The price includes a bed and food for the whole journey. Since we&apos;ll only provide 
            plant based Earth food, don&apos;t hesitate to bring what ever else you feel like. Please 
            also note that alcoholic drinks and transport cost are not included.
          </p>
          <div className="space-y-2">
            <p>
              <strong>A: 195+ CHF/EUR</strong>
              <br />
              if you can buy things without thinking about cash.
              <br />
              This price covers for a traveller with fewer means.
            </p>
            <p>
              <strong>B: 160 CHF/EUR</strong>
              <br />
              if you have to be a bit conscious about your spendings, but you&apos;re generally fine.
              <br />
              This price covers the cost.
            </p>
            <p>
              <strong>C: 125 CHF/EUR</strong>
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
            href="mailto:hotzluc@pm.me"
            className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
          >
            hotzluc@pm.me
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
            <li>Revolut directly to Lukas Hotz (+41 79 288 68 53)</li>
            <li>
              Bank transfer to CH76 0839 0035 9569 1000 2, Alternative Bank Schweiz, 
              (Lukas Hotz, Zentralstrasse 37, 8003 Zürich, Switzerland)
            </li>
          </ul>
        </div>

        <RadioGroup
          label="Twint has some transaction limits unfortunately, if it fails, please use Revolut or a bank transfer."
          name="paymentMethod"
          options={paymentMethodOptions}
          required
          value={paymentMethodValue}
          onChange={(value) => setValue("paymentMethod", value)}
          error={errors.paymentMethod?.message}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" type="button" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

