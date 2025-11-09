import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/form/inputs/TextInput";
import { Select } from "@/components/form/inputs/Select";
import { RadioGroup } from "@/components/form/inputs/RadioGroup";
import { CheckboxGroup } from "@/components/form/inputs/CheckboxGroup";
import { Checkbox } from "@/components/form/inputs/Checkbox";
import { Textarea } from "@/components/form/inputs/Textarea";
import { logisticsSchema, LogisticsFormData } from "./types";
import { isDev } from "@/lib/constants";

type LogisticsProps = {
  onNext: (data: LogisticsFormData) => void;
  onPrev: () => void;
  defaultValues?: Partial<LogisticsFormData>;
};

export function Logistics({ onNext, onPrev, defaultValues }: LogisticsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<LogisticsFormData>({
    resolver: isDev ? undefined : zodResolver(logisticsSchema),
    defaultValues,
  });

  const transportationValue = watch("transportation");
  const sleepingValue = watch("sleepingArrangement");
  const takeMealLeadValue = watch("takeMealLead");
  const hasMedicalValue = watch("hasMedicalEducation");

  const nightOptions = [
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const transportationOptions = [
    { value: "own-car", label: "My own car/van" },
    { value: "riding-with-someone", label: "Riding with someone" },
    { value: "public-transport", label: "Public transport" },
    { value: "dont-know", label: "Don't know yet" },
  ];

  const sleepingOptions = [
    { value: "own-van", label: "I'll be sleeping in my own van" },
    { value: "someone-else-van", label: "I'll be sleeping in someone else's van (and that person knows it)" },
    { value: "tent", label: "I'll be sleeping in a tent" },
    { value: "bring-mattress", label: "I will bring my own mattress" },
    { value: "sharing-bed", label: "I'll be sharing the single-bed with someone (who knows about it)" },
  ];

  const countryOptions = [
    { value: "switzerland", label: "Switzerland" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "austria", label: "Austria" },
    { value: "italy", label: "Italy" },
    { value: "spain", label: "Spain" },
    { value: "netherlands", label: "The Netherlands" },
    { value: "belgium", label: "Belgium" },
    { value: "sweden", label: "Sweden" },
    { value: "finland", label: "Finland" },
    { value: "poland", label: "Poland" },
    { value: "denmark", label: "Denmark" },
    { value: "other", label: "Other" },
  ];

  const timelineItems = [
    { day: "Thursday", activity: "Arrival & Building" },
    { day: "Friday", activity: "Decoration" },
    { day: "Saturday", activity: "We let the winds take us" },
    { day: "Sunday", activity: "Build down and relax" },
    { day: "Monday", activity: "Tear down" },
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-8 pt-4">
      {/* Timeline Overview */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Timeline overview</h2>
        <div className="space-y-2">
          {timelineItems.map((item, index) => (
            <div
              key={item.day}
              className="flex items-center gap-4 p-3 bg-white/10 rounded-md backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="text-white font-semibold">{item.day}</div>
                  <div className="text-gray-300 text-sm">{item.activity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logistics Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white">Logistics</h2>

        <Controller
          name="nights"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              label="Which nights would you like to spend at Ventara?"
              name="nights"
              options={nightOptions}
              required
              values={field.value || []}
              onChange={field.onChange}
              error={errors.nights?.message}
            />
          )}
        />

        <RadioGroup
          label="Are you travelling to the destination by"
          name="transportation"
          options={transportationOptions}
          required
          value={transportationValue}
          onChange={(value) => setValue("transportation", value)}
          error={errors.transportation?.message}
        />

        <div className="space-y-2">
          <p className="text-white font-medium">
            In case you&apos;re coming with a car/van, can you transport material from Zurich?
          </p>
          <Checkbox
            label="Yes, I can transport stuff"
            {...register("canTransportMaterial")}
          />
          {errors.canTransportMaterial && (
            <span className="text-red-400 text-sm">{errors.canTransportMaterial.message}</span>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-white font-medium">
            My starting location is
            <span className="text-red-400 ml-1">*</span>
          </label>
          <TextInput
            label=""
            placeholder="City"
            required
            {...register("city")}
            error={errors.city?.message}
          />
          <Select
            label=""
            options={countryOptions}
            required
            {...register("country")}
            error={errors.country?.message}
          />
        </div>

        <RadioGroup
          label="If you have your own van/bus that you'll be coming with or you can bring a mattress, please indicate this here. And might we ask you to help transport stuff?"
          name="sleepingArrangement"
          options={sleepingOptions}
          required
          value={sleepingValue}
          onChange={(value) => setValue("sleepingArrangement", value)}
          error={errors.sleepingArrangement?.message}
        />
      </div>

      {/* Shifts & Kitchen Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white">Shifts & Kitchen</h2>
        
        <div className="text-gray-200 space-y-4">
          <p>
            Since everything is self organised, we ask everyone to cover at least one space work 
            shift (kitchen help, cleaning, logistics – detailed information and a shift plan will 
            follow in due time).
          </p>
          <p>
            The Minister of Nutrition (Sascha) is going to plan all the food for the entire duration 
            of the games. He&apos;s looking for sou-chefs who take the lead for one of the 10 meals 
            (brunches, dinners, late night snacks).
          </p>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="I would like to take over the lead for a meal"
            {...register("takeMealLead")}
          />
          
          {takeMealLeadValue && (
            <>
              <TextInput
                label="Meal type/day/time preference"
                placeholder="e.g., Saturday dinner"
                {...register("mealPreference")}
                error={errors.mealPreference?.message}
              />
              
              <Textarea
                label="My kitchen experience and/or general comments"
                placeholder="Kitchen experience"
                {...register("kitchenExperience")}
                error={errors.kitchenExperience?.message}
              />
            </>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-gray-200">
            Do you have any medical experience/education and would be open to act as an emergency 
            doctor during certain times (not all the time of course)?
          </p>
          
          <Checkbox
            label="I have a medical education"
            {...register("hasMedicalEducation")}
          />
          
          {hasMedicalValue && (
            <Textarea
              label="Background"
              placeholder="What kind of medical training or experience do you have?"
              {...register("medicalBackground")}
              error={errors.medicalBackground?.message}
            />
          )}
        </div>
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

