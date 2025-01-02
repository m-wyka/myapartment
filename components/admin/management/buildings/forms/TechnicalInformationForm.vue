<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const { basicStringSchema, numberRequiredNullableSchema, arrayRequiredSchema } =
  validationSchemas();

const formSchema = toTypedSchema(
  z.object({
    surface: numberRequiredNullableSchema,
    numberOfApartments: numberRequiredNullableSchema,
    numberOfElevators: numberRequiredNullableSchema,
    heatingSystem: basicStringSchema,
    utilitiesAvailable: basicStringSchema,
  })
);

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

interface Lorem {
  id: number;
  name: string;
  value: string;
}

const heatingSystemOptions = ref([
  {
    id: 1,
    name: "Centralne",
    value: "central",
  },
  { id: 2, name: "Gazowe", value: "gas" },
]);

const utilitiesAvailableModelValue = ref<Lorem[]>([]);
const utilitiesAvailableOptions = ref<Lorem[]>([
  {
    id: 1,
    name: "Gaz",
    value: "gas",
  },
  { id: 2, name: "Prąd", value: "electricity" },
  { id: 3, name: "Woda", value: "water" },
]);

const handleUtilitiesAvailableItem = (value: Lorem) => {
  const find = utilitiesAvailableModelValue.value.find(
    (item) => item.id === value.id
  );

  if (find) {
    utilitiesAvailableModelValue.value =
      utilitiesAvailableModelValue.value.filter((item) => item.id !== value.id);
  } else {
    utilitiesAvailableModelValue.value.push(value);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-4">
      <FormField v-slot="{ value }" name="surface">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.surface") }}
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
                  setFieldValue('surface', v);
                } else {
                  setFieldValue('surface', undefined);
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

      <FormField v-slot="{ value }" name="numberOfApartments">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.numberOfApartments") }}
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
                  setFieldValue('numberOfApartments', v);
                } else {
                  setFieldValue('numberOfApartments', undefined);
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

      <FormField v-slot="{ value }" name="numberOfElevators">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.numberOfElevators") }}
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
                  setFieldValue('numberOfElevators', v);
                } else {
                  setFieldValue('numberOfElevators', undefined);
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

      <FormField v-slot="{ componentField }" name="heatingSystem">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.heatingSystem") }}
          </FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in heatingSystemOptions"
                  :value="item.value"
                  :key="item.id"
                >
                  {{ item.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="utilitiesAvailable">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.utilitiesAvailable") }}
          </FormLabel>

          <Select v-bind="componentField">
            <FormControl class="min-h-10 h-auto">
              <SelectTrigger>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="item in utilitiesAvailableModelValue"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </Badge>
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent class="py-1">
              <div
                v-for="item in utilitiesAvailableOptions"
                :key="item.value"
                class="mx-1 p-2 rounded hover:bg-zinc-800 cursor-pointer"
                @click.prevent.stop="handleUtilitiesAvailableItem(item)"
              >
                <label
                  :for="item.value"
                  class="flex items-center relative cursor-pointer"
                >
                  <Checkbox
                    :id="item.value"
                    :checked="
                      !!utilitiesAvailableModelValue.find(
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
    </div>

    <Button type="submit">{{ $t("misc.save") }}</Button>
  </form>
</template>

<style></style>
