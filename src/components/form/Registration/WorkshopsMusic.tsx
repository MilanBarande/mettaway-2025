import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/form/inputs/TextInput";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { Checkbox } from "@/components/form/inputs/Checkbox";
import { Textarea } from "@/components/form/inputs/Textarea";
import { workshopsMusicSchema, WorkshopsMusicFormData } from "./types";
import { isDev } from "@/lib/constants";

type WorkshopsMusicProps = {
  onNext: (data: WorkshopsMusicFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<WorkshopsMusicFormData>;
};

export function WorkshopsMusic({ onNext, onPrev, defaultValues }: WorkshopsMusicProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<WorkshopsMusicFormData>({
    resolver: isDev ? undefined : zodResolver(workshopsMusicSchema),
    defaultValues,
  });

  const organizeWorkshopValue = watch("organizeWorkshop");
  const shareSpaceValue = watch("shareSpace");
  const playDjSetValue = watch("playDjSet");
  const playUnpluggedValue = watch("playUnplugged");

  const shareSpaceOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "if-need-be", label: "If need be" },
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-8 pt-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Workshops and Music</h2>
        <p className="text-gray-200">
          Further on, everyone is invited to contribute even more: DJ, play live music on 
          unplugged Sunday, offer a workshop, yoga class, space cookies, sound healing, you 
          name it. Would you care to give us a rough idea of what you have in mind? This is 
          not mandatory of course!
        </p>
      </div>

      {/* Workshops Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white">Workshops</h3>

        <Checkbox
          label="I would like to organize a workshop or performance"
          {...register("organizeWorkshop")}
        />

        {organizeWorkshopValue && (
          <div className="flex flex-col gap-6 ml-7">
            <TextInput
              label=""
              placeholder="Workshop title"
              {...register("workshopTitle")}
              error={errors.workshopTitle?.message}
            />

            <TextInput
              label=""
              placeholder="Preferred day/time"
              {...register("workshopDayTime")}
              error={errors.workshopDayTime?.message}
            />

            <Textarea
              label=""
              placeholder="Workshop description"
              {...register("workshopDescription")}
              error={errors.workshopDescription?.message}
            />

            <Textarea
              label=""
              placeholder="Characteristics (size, noise level) of the space you require for the workshop"
              {...register("workshopSpace")}
              error={errors.workshopSpace?.message}
            />

            <RadioGroup
              label="I can share the space with others"
              name="shareSpace"
              options={shareSpaceOptions}
              value={shareSpaceValue}
              onChange={(value) => setValue("shareSpace", value)}
              error={errors.shareSpace?.message}
            />
          </div>
        )}
      </div>

      {/* DJs Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white">DJs</h3>

        <div className="text-gray-200 space-y-2">
          <p>
            As we usually have many talented and creative creatures among us, it has proven a 
            challenging affair to give everyone the stage for a certain time. As we expect this 
            to be similar this time around, we will curate the DJ lineup based on the following 
            criteria:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>signup date (the earlier, the higher the chances to get a spot)</li>
            <li>previous appearances (the more, the lower the chances)</li>
            <li>gender (ensuring diversity)</li>
            <li>experience (providing spots for fresh DJs)</li>
          </ul>
        </div>

        <Checkbox
          label="I would like to play a DJ Set or play live music"
          {...register("playDjSet")}
        />

        {playDjSetValue && (
          <div className="flex flex-col gap-6 ml-7">
            <TextInput
              label=""
              placeholder="Preferred day/time"
              {...register("djDayTime")}
              error={errors.djDayTime?.message}
            />

            <TextInput
              label=""
              placeholder="Link to my soundcloud"
              {...register("soundcloudLink")}
              error={errors.soundcloudLink?.message}
            />

            <TextInput
              label=""
              placeholder="Style/description of music"
              {...register("musicStyle")}
              error={errors.musicStyle?.message}
            />
          </div>
        )}
      </div>

      {/* Unplugged Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white">Unplugged</h3>

        <Checkbox
          label="I would like to play on unplugged Sunday"
          {...register("playUnplugged")}
        />

        {playUnpluggedValue && (
          <div className="ml-7">
            <TextInput
              label=""
              placeholder="Music description"
              {...register("unpluggedDescription")}
              error={errors.unpluggedDescription?.message}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" type="button" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}

