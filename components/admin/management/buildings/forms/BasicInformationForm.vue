<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { DateFormatter, parseDate } from "@internationalized/date";

const props = defineProps<{
  initialValues?: any;
}>();

const datePickerPopover = ref(false);
const options = ref([
  {
    id: 1,
    name: "Mieszkalny",
    value: "lorem",
  },
  { id: 2, name: "Mieszkalno-usługowy", value: "Ipsum" },
]);

const df = new DateFormatter("pl-PL", {
  dateStyle: "short",
});

const dateOfConstructionValue = computed({
  get: () =>
    values.dateOfConstruction
      ? parseDate(values.dateOfConstruction)
      : undefined,
  set: (val) => val,
});

const { basicStringSchema, numberRequiredNullableSchema } = validationSchemas();

const formSchema = toTypedSchema(
  z.object({
    name: basicStringSchema,
    address: basicStringSchema,
    dateOfConstruction: basicStringSchema,
    numberOfFloors: numberRequiredNullableSchema,
    buildingType: basicStringSchema,
  })
);

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
});

const handleSaveDatePicker = (value: string) => {
  datePickerPopover.value = false;

  if (value) {
    setFieldValue("dateOfConstruction", value.toString());
  } else {
    setFieldValue("dateOfConstruction", undefined);
  }
};

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.buildingName") }}
          </FormLabel>

          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <FormLabel>
            {{ $t("datatable.address") }}
          </FormLabel>

          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="dateOfConstruction">
        <FormItem class="flex flex-col">
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.dateOfConstruction") }}
          </FormLabel>

          <Popover
            :open="datePickerPopover"
            @update:open="datePickerPopover = false"
          >
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  class="h-10"
                  @click="datePickerPopover = true"
                >
                  <span>
                    {{
                      dateOfConstructionValue
                        ? df.format(toDate(dateOfConstructionValue))
                        : ""
                    }}
                  </span>

                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>

                <input hidden />
              </FormControl>
            </PopoverTrigger>

            <PopoverContent class="w-auto p-0">
              <DatePicker
                @close="datePickerPopover = false"
                @save="handleSaveDatePicker"
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="numberOfFloors">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.numberOfFloors") }}
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
                  setFieldValue('numberOfFloors', v);
                } else {
                  setFieldValue('numberOfFloors', undefined);
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

      <FormField v-slot="{ componentField }" name="buildingType">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.buildingType") }}
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
                  v-for="item in options"
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
    </div>

    <Button type="submit">{{ $t("misc.save") }}</Button>
  </form>
</template>

<style></style>
