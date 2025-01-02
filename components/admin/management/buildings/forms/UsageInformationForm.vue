<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { ParkingAvailabilityValues } from "~/enums/admin";
import type { VSelectFieldData } from "~/types/form/vSelectField";

const { t } = useI18n();
const parkingAvailabilitySelected = ref<VSelectFieldData[]>([]);
const parkingAvailabilityTab = ref<string>("");
const parkingAvailabilityOptions = ref([
  {
    id: 1,
    name: t(
      "admin.buildingsManagement.form.parkingAvailabilityData.underground"
    ),
    value: ParkingAvailabilityValues.Underground,
  },
  {
    id: 2,
    name: t("admin.buildingsManagement.form.parkingAvailabilityData.outside"),
    value: ParkingAvailabilityValues.Outside,
  },
  {
    id: 3,
    name: t("misc.none"),
    value: ParkingAvailabilityValues.None,
  },
]);

const { basicStringSchema, numberRequiredNullableSchema, arrayRequiredSchema } =
  validationSchemas();

const formSchema = toTypedSchema(
  z.object({
    recreationArea: basicStringSchema,
    accessibilityForPeopleWithDisabilities: z.boolean().optional(),
    parkingAvailability: z.array(z.string().min(1)),
    numberOfParkingLots_1: z.number().optional(),
    numberOfParkingSpaces_1: z.number().optional(),
    numberOfParkingLots_2: z.number().optional(),
    numberOfParkingSpaces_2: z.number().optional(),
  })
);

const { handleSubmit, setFieldValue, validate } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const handleParkingAvailabilityUpdate = (value: VSelectFieldData) => {
  const existItemIndex = parkingAvailabilitySelected.value.findIndex(
    (item) => item.id === value.id
  );

  if (existItemIndex !== -1) {
    parkingAvailabilitySelected.value.splice(existItemIndex, 1);

    if (parkingAvailabilitySelected.value.length) {
      setFieldValue(
        "parkingAvailability",
        parkingAvailabilitySelected.value.map((item) => item.value)
      );
    } else {
      setFieldValue("parkingAvailability", undefined);
    }

    return;
  }

  const findIndex = parkingAvailabilitySelected.value.findIndex(
    (selectedItem) => selectedItem.id === value.id
  );

  if (findIndex !== -1) {
    parkingAvailabilitySelected.value.splice(findIndex, 1);

    // If select field is empty
    if (!parkingAvailabilitySelected.value.length) {
      setFieldValue("parkingAvailability", undefined);
      return;
    }

    setFieldValue(
      "parkingAvailability",
      parkingAvailabilitySelected.value.map((item) => item.value)
    );
  } else {
    const findNone = value.value === ParkingAvailabilityValues.None;

    if (findNone) {
      parkingAvailabilitySelected.value = [value];

      setFieldValue("parkingAvailability", [value.value]);
      return;
    }

    parkingAvailabilitySelected.value.push(value);

    setFieldValue(
      "parkingAvailability",
      parkingAvailabilitySelected.value.map((item) => item.value)
    );

    const findSomeNone = parkingAvailabilitySelected.value.some(
      (item) => item.value === ParkingAvailabilityValues.None
    );

    if (findSomeNone) {
      const noneIndex = parkingAvailabilitySelected.value.findIndex(
        (item) => item.value === ParkingAvailabilityValues.None
      );

      if (noneIndex !== -1) {
        parkingAvailabilitySelected.value.splice(noneIndex, 1);

        setFieldValue(
          "parkingAvailability",
          parkingAvailabilitySelected.value.map((item) => item.value)
        );
      }
    }
  }
};

const handleParkingAvailabilityWthoutNone = computed(() =>
  parkingAvailabilitySelected.value.filter(
    (item) => item.value !== ParkingAvailabilityValues.None
  )
);

const utilitiesAvailablePlaceholder = computed(() => {
  return parkingAvailabilitySelected.value
    .map((item) => {
      return ` ${item.name}`;
    })
    .toString();
});

const stringifiedValues = computed({
  get: () => JSON.stringify(parkingAvailabilitySelected.value),
  set: (val) => {
    try {
      parkingAvailabilitySelected.value = JSON.parse(val);
    } catch {
      parkingAvailabilitySelected.value = [];
    }
  },
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-4">
      <div class="grid gap-4 content-start">
        <FormField v-slot="{ componentField }" name="recreationArea">
          <FormItem>
            <FormLabel>
              {{ $t("admin.buildingsManagement.form.recreationArea") }}
            </FormLabel>

            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ value, handleChange }"
          name="accessibilityForPeopleWithDisabilities"
        >
          <FormItem>
            <div class="space-y-2">
              <FormLabel>
                {{
                  $t(
                    "admin.buildingsManagement.form.accessibilityForPeopleWithDisabilities"
                  )
                }}
              </FormLabel>

              <FormControl>
                <div class="flex items-center space-x-2">
                  <Switch
                    id="accessibilityForPeopleWithDisabilities"
                    :checked="value"
                    @update:checked="handleChange"
                  />

                  <Label for="accessibilityForPeopleWithDisabilities">
                    {{ value ? t("misc.yes") : t("misc.no") }}
                  </Label>
                </div>
              </FormControl>
            </div>
          </FormItem>
        </FormField>

        <div class="grid gap-4">
          <FormField v-slot="{ componentField }" name="parkingAvailability">
            <FormItem>
              <FormLabel>
                {{ $t("admin.buildingsManagement.form.parkingAvailability") }}
              </FormLabel>

              <Select v-bind="componentField" v-model="stringifiedValues">
                <FormControl>
                  <SelectTrigger>
                    {{ utilitiesAvailablePlaceholder || "&nbsp;" }}
                  </SelectTrigger>
                </FormControl>

                <SelectContent class="py-1">
                  <div
                    v-for="item in parkingAvailabilityOptions"
                    :key="item.value"
                    class="mx-1 p-2 rounded hover:bg-zinc-800 cursor-pointer"
                    @click.prevent.stop="handleParkingAvailabilityUpdate(item)"
                  >
                    <label
                      :for="item.value"
                      class="flex items-center relative cursor-pointer"
                    >
                      <Checkbox
                        :id="item.value"
                        :checked="
                          !!parkingAvailabilitySelected.find(
                            (x) => x.id === item.id
                          )
                        "
                        class="absolute left-0"
                      />

                      <span
                        class="pl-6 text-sm leading-noge font-medium select-none"
                      >
                        {{ item.name }}
                      </span>
                    </label>
                  </div>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          </FormField>

          <template
            v-if="
              parkingAvailabilitySelected.length &&
              handleParkingAvailabilityWthoutNone.length
            "
          >
            <ToggleGroup
              v-model="parkingAvailabilityTab"
              type="single"
              variant="outline"
            >
              <ToggleGroupItem
                v-for="item in handleParkingAvailabilityWthoutNone"
                :key="item.id"
                :value="item.value as string"
              >
                {{ item.name }}
              </ToggleGroupItem>
            </ToggleGroup>

            <div
              v-show="
                parkingAvailabilityTab === ParkingAvailabilityValues.Underground
              "
              class="grid gap-4"
            >
              <FormField v-slot="{ value }" name="numberOfParkingLots_1">
                <FormItem>
                  <FormLabel>
                    {{
                      $t("admin.buildingsManagement.form.numberOfParkingLots")
                    }}
                  </FormLabel>

                  <NumberField
                    :model-value="value"
                    :min="0"
                    :format-options="{
                      useGrouping: false,
                    }"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          setFieldValue('numberOfParkingLots_1', v);
                        } else {
                          setFieldValue('numberOfParkingLots_1', undefined);
                        }
                      }
                    "
                  >
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <FormControl>
                        <NumberFieldInput />
                      </FormControl>
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ value }" name="numberOfParkingSpaces_1">
                <FormItem>
                  <FormLabel>
                    {{
                      $t("admin.buildingsManagement.form.numberOfParkingSpaces")
                    }}
                  </FormLabel>

                  <NumberField
                    :model-value="value"
                    :min="0"
                    :format-options="{
                      useGrouping: false,
                    }"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          setFieldValue('numberOfParkingSpaces_1', v);
                        } else {
                          setFieldValue('numberOfParkingSpaces_1', undefined);
                        }
                      }
                    "
                  >
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <FormControl>
                        <NumberFieldInput />
                      </FormControl>
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div
              v-show="
                parkingAvailabilityTab === ParkingAvailabilityValues.Outside
              "
              class="grid gap-4"
            >
              <FormField v-slot="{ value }" name="numberOfParkingLots_2">
                <FormItem>
                  <FormLabel>
                    {{
                      $t("admin.buildingsManagement.form.numberOfParkingLots")
                    }}
                  </FormLabel>

                  <NumberField
                    :model-value="value"
                    :min="0"
                    :format-options="{
                      useGrouping: false,
                    }"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          setFieldValue('numberOfParkingLots_2', v);
                        } else {
                          setFieldValue('numberOfParkingLots_2', undefined);
                        }
                      }
                    "
                  >
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <FormControl>
                        <NumberFieldInput />
                      </FormControl>
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ value }" name="numberOfParkingSpaces_2">
                <FormItem>
                  <FormLabel>
                    {{
                      $t("admin.buildingsManagement.form.numberOfParkingSpaces")
                    }}
                  </FormLabel>

                  <NumberField
                    :model-value="value"
                    :min="0"
                    :format-options="{
                      useGrouping: false,
                    }"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          setFieldValue('numberOfParkingSpaces_2', v);
                        } else {
                          setFieldValue('numberOfParkingSpaces_2', undefined);
                        }
                      }
                    "
                  >
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <FormControl>
                        <NumberFieldInput />
                      </FormControl>
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </template>
        </div>
      </div>
    </div>

    <Button type="submit">{{ $t("misc.save") }}</Button>
  </form>
</template>

<style></style>
