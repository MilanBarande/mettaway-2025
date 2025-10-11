import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/form/inputs/TextInput";
import { Select } from "@/components/form/inputs/Select";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { Textarea } from "@/components/form/inputs/Textarea";
import { identitySchema, IdentityFormData } from "./types";
import { isDev } from "@/lib/constants";

type IdentityProps = {
  onNext: (data: IdentityFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<IdentityFormData>;
};

export function Identity({ onNext, onPrev, defaultValues }: IdentityProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IdentityFormData>({
    resolver: isDev ? undefined : zodResolver(identitySchema),
    defaultValues,
  });

  const genderValue = watch("genderIdentity");

  const voyageOptions = [
    { value: "0", label: "0 - First time!" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];

  const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "diverse", label: "Diverse" },
    { value: "prefer not to choose", label: "Prefer not to say" },
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6 pt-4">
      <h2 className="text-3xl font-bold text-white mb-2">Explorers Data</h2>

      <TextInput
        label="What's your first space name?"
        placeholder="First Name"
        required
        {...register("firstName")}
        error={errors.firstName?.message}
      />

      <TextInput
        label="What's your space last name?"
        placeholder="Last Name"
        required
        {...register("lastName")}
        error={errors.lastName?.message}
      />

      <TextInput
        label="What's your space email?"
        type="email"
        placeholder="Email"
        required
        {...register("email")}
        error={errors.email?.message}
      />

      <TextInput
        label="As soon as the contribution is paid, we'll invite you to the voyage chat on Telegram. What's your phone number or Telegram handle?"
        placeholder="Phone or Telegram"
        required
        {...register("phone")}
        error={errors.phone?.message}
      />

      <TextInput
        label="Please let us know who invited you, as we would like to keep this among friends."
        placeholder="Friend's name"
        required
        {...register("referredBy")}
        error={errors.referredBy?.message}
      />

      <Select
        label="This isn't your first rodeo? How many previous voyages did you partake in?"
        options={voyageOptions}
        required
        {...register("previousVoyages")}
        error={errors.previousVoyages?.message}
      />

      <Textarea
        label="Known food allergies (provided food will be all vegan)."
        placeholder="Allergies"
        {...register("allergies")}
        error={errors.allergies?.message}
      />

      <Textarea
        label="Should we know about any physical or mental conditions/limitations of yours?"
        placeholder="Stuff you should know about me"
        {...register("conditions")}
        error={errors.conditions?.message}
      />

      <RadioGroup
        label="What do you identify as?"
        name="genderIdentity"
        options={genderOptions}
        required
        value={genderValue}
        onChange={(value) => setValue("genderIdentity", value)}
        error={errors.genderIdentity?.message}
      />

      <div className="flex justify-between pt-4">
        <Button variant="secondary" type="button" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}

