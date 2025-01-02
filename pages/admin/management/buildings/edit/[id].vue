<script lang="ts" setup>
import Card from "~/components/Card.vue";
import DottedLine from "~/components/DottedLine.vue";
import AdditionalInformationForm from "~/components/admin/management/buildings/forms/AdditionalInformationForm.vue";
import AdministrativeInformationForm from "~/components/admin/management/buildings/forms/AdministrativeInformationForm.vue";
import BasicInformationForm from "~/components/admin/management/buildings/forms/BasicInformationForm.vue";
import DocumentationAndFilesForm from "~/components/admin/management/buildings/forms/DocumentationAndFilesForm.vue";
import TechnicalInformationForm from "~/components/admin/management/buildings/forms/TechnicalInformationForm.vue";
import UsageInformationForm from "~/components/admin/management/buildings/forms/UsageInformationForm.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});

const route = useRoute();
const {
  params: { id },
} = route;

const dottedLineClass = {
  vertical: "w-px absolute -left-[9px] top-[-88px] h-[calc(100%+88px+16px)]",
  horizontal: "absolute -top-[9px] left-0 right-0 h-px",
};

const initialValues = {
  basic: {
    name: "Skyline Residence",
    address: "ul. Wysoka 15, 02-123 Warszawa",
    dateOfConstruction: 1990,
    numberOfFloors: 16,
    buildingType: [
      {
        id: 1,
        name: "Mieszkalny",
        value: "lorem",
      },
    ],
  },
};
</script>

<template>
  <div>
    <h1 class="mb-8">
      {{ $t("admin.buildingsManagement.editing") }}
      {{ initialValues.basic.name }}
    </h1>

    <div
      class="relative grid gap-4 sm:gap-[17px] grid-cols-2 sm:grid-cols-[repeat(16,_minmax(0,_1fr))]"
    >
      <DottedLine
        direction="vertical"
        class="col-start-1 xl:col-start-1 hidden sm:block"
        :class="dottedLineClass.vertical"
      />

      <DottedLine
        direction="vertical"
        class="col-start-9 xl:col-start-5 hidden sm:block"
        :class="dottedLineClass.vertical"
      />

      <DottedLine
        direction="vertical"
        class="col-start-6 hidden xl:block"
        :class="dottedLineClass.vertical"
      />

      <DottedLine
        direction="vertical"
        class="col-start-11 hidden xl:block"
        :class="dottedLineClass.vertical"
      />

      <DottedLine
        direction="horizontal"
        class="row-start-2 w-full hidden sm:block"
        :class="dottedLineClass.horizontal"
      />

      <DottedLine
        direction="horizontal"
        class="row-start-3 w-full hidden sm:block xl:hidden"
        :class="dottedLineClass.horizontal"
      />

      <Card
        :title="$t('admin.buildingsManagement.form.basicInformation')"
        class="col-span-8 xl:col-span-5"
      >
        <BasicInformationForm :initial-values="initialValues.basic" />
      </Card>

      <Card
        :title="$t('admin.buildingsManagement.form.technicalInformation')"
        class="col-span-8 xl:col-span-5"
      >
        <TechnicalInformationForm />
      </Card>

      <Card
        :title="$t('admin.buildingsManagement.form.administrativeInformation')"
        class="col-span-8 xl:col-span-6"
      >
        <AdministrativeInformationForm />
      </Card>

      <Card
        :title="$t('admin.buildingsManagement.form.usageInformation')"
        class="col-span-8 xl:col-span-4"
      >
        <UsageInformationForm />
      </Card>

      <Card
        :title="$t('admin.buildingsManagement.form.additionalInformation')"
        class="col-span-8 xl:col-span-6"
      >
        <AdditionalInformationForm />
      </Card>

      <Card
        :title="$t('admin.buildingsManagement.form.documentationAndFiles')"
        class="col-span-8 xl:col-span-6"
      >
        <DocumentationAndFilesForm />
      </Card>
    </div>
  </div>
</template>

<style></style>
