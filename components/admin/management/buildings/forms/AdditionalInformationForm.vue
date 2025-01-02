<script lang="ts" setup>
import { useForm } from "vee-validate";
import MultiSelect from "@/components/MultiSelect.vue";

const { t } = useI18n();
const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

interface Lorem {
  id: number;
  name: string;
  value: string;
}

const energyCertificatesModelValue = ref<Lorem[]>([]);
const energyCertificatesOptions = ref<Lorem[]>([
  { id: 1, name: "A+++", value: "a+++" },
  { id: 2, name: "A++", value: "a++" },
  { id: 3, name: "A+", value: "a+" },
  { id: 4, name: "A", value: "a" },
  { id: 5, name: "B", value: "B" },
  { id: 6, name: "C", value: "c" },
  { id: 8, name: "D", value: "d" },
]);

const handleEnergyCertificatesItem = (value: Lorem) => {
  const find = energyCertificatesModelValue.value.find(
    (item) => item.id === value.id
  );

  if (find) {
    energyCertificatesModelValue.value =
      energyCertificatesModelValue.value.filter((item) => item.id !== value.id);
  } else {
    energyCertificatesModelValue.value.push(value);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <div class="col-span-2">
        <FormField v-slot="{ componentField }" name="buildingHistory">
          <FormItem>
            <FormLabel>
              {{ $t("admin.buildingsManagement.form.buildingHistory") }}
            </FormLabel>

            <FormControl>
              <Textarea class="resize-none" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <MultiSelect
        v-model="energyCertificatesModelValue"
        :options="energyCertificatesOptions"
        name="energyCertificates"
        :label="$t('admin.buildingsManagement.form.energyCertificates')"
      />

      <!-- <FormField v-slot="{ componentField }" name="energyCertificates">
        <FormItem>
          <FormLabel>
            {{ $t("admin.buildingsManagement.form.energyCertificates") }}
          </FormLabel>

          <Select v-bind="componentField">
            <FormControl class="min-h-10 h-auto">
              <SelectTrigger>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="item in energyCertificatesModelValue"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </Badge>
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent class="py-1">
              <div
                v-for="item in energyCertificatesOptions"
                :key="item.value"
                class="mx-1 p-2 rounded hover:bg-zinc-800 cursor-pointer"
                @click.prevent.stop="handleEnergyCertificatesItem(item)"
              >
                <label
                  :for="item.value"
                  class="flex items-center relative cursor-pointer"
                >
                  <Checkbox
                    :id="item.value"
                    :checked="
                      !!energyCertificatesModelValue.find(
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
      </FormField> -->

      <FormField v-slot="{ value, handleChange }" name="monitoringAndSecurity">
        <FormItem>
          <div class="space-y-2">
            <FormLabel>
              {{ $t("admin.buildingsManagement.form.monitoringAndSecurity") }}
            </FormLabel>

            <FormControl>
              <div class="flex items-center space-x-2">
                <Switch
                  id="monitoringAndSecurity"
                  :checked="value"
                  @update:checked="handleChange"
                />

                <Label for="monitoringAndSecurity">
                  {{ value ? t("misc.yes") : t("misc.no") }}
                </Label>
              </div>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
    </div>

    <Button type="submit">{{ $t("misc.save") }}</Button>
  </form>
</template>

<style></style>
