<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const { basicStringSchema, emailSchema, phoneSchema } = validationSchemas();

const formSchema = toTypedSchema(
  z.object({
    buildingOwner: basicStringSchema,
    buildingOwnerEmail: emailSchema,
    buildingOwnerPhone: phoneSchema,
    buildingAdministrator: basicStringSchema,
    buildingAdministratorEmail: emailSchema,
    buildingAdministratorPhone: phoneSchema,
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-4 md:grid-cols-2">
      <div class="grid gap-4">
        <h6 class="mb-0">
          {{ $t("admin.buildingsManagement.form.buildingOwner") }}
        </h6>

        <FormField v-slot="{ componentField }" name="buildingOwner">
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.name") }}
            </FormLabel>

            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="buildingOwnerEmail">
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.email") }}
            </FormLabel>

            <FormControl>
              <Input type="email" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="buildingOwnerPhone">
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.phone") }}
            </FormLabel>

            <FormControl>
              <Input type="tel" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="grid gap-4">
        <h6 class="mb-0">
          {{ $t("admin.buildingsManagement.form.buildingAdministrator") }}
        </h6>

        <FormField v-slot="{ componentField }" name="buildingAdministrator">
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.name") }}
            </FormLabel>

            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="buildingAdministratorEmail"
        >
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.email") }}
            </FormLabel>

            <FormControl>
              <Input type="email" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="buildingAdministratorPhone"
        >
          <FormItem>
            <FormLabel>
              {{ $t("form.fields.phone") }}
            </FormLabel>

            <FormControl>
              <Input type="tel" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <Button type="submit">{{ $t("misc.save") }}</Button>
  </form>
</template>

<style></style>
