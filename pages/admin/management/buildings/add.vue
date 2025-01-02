<script lang="ts" setup>
import DottedLine from "@/components/DottedLine.vue";
import AdditionalInformationForm from "@/components/admin/management/buildings/forms/AdditionalInformationForm.vue";
import AdministrativeInformationForm from "@/components/admin/management/buildings/forms/AdministrativeInformationForm.vue";
import BasicInformationForm from "@/components/admin/management/buildings/forms/BasicInformationForm.vue";
import DocumentationAndFilesForm from "@/components/admin/management/buildings/forms/DocumentationAndFilesForm.vue";
import TechnicalInformationForm from "@/components/admin/management/buildings/forms/TechnicalInformationForm.vue";
import UsageInformationForm from "@/components/admin/management/buildings/forms/UsageInformationForm.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});

const dottedLineVerticalClass =
  "w-px absolute -left-[9px] top-[-88px] h-[calc(100%+88px+16px)]";
const dottedLineHorizontalClass = "absolute -top-[9px] left-0 right-0 h-px";
</script>

<template>
  <div
    class="relative grid gap-4 sm:gap-[17px] grid-cols-2 sm:grid-cols-[repeat(16,_minmax(0,_1fr))]"
  >
    <!-- <DottedLine
      direction="vertical"
      class="col-start-1 xl:col-start-1 hidden sm:block"
      :class="dottedLineVerticalClass"
    />

    <DottedLine
      direction="vertical"
      class="col-start-9 xl:col-start-5 hidden sm:block"
      :class="dottedLineVerticalClass"
    />

    <DottedLine
      direction="vertical"
      class="col-start-6 hidden xl:block"
      :class="dottedLineVerticalClass"
    />

    <DottedLine
      direction="vertical"
      class="col-start-11 hidden xl:block"
      :class="dottedLineVerticalClass"
    />

    <DottedLine
      direction="horizontal"
      class="row-start-2 w-full hidden sm:block"
      :class="dottedLineHorizontalClass"
    />

    <DottedLine
      direction="horizontal"
      class="row-start-3 w-full hidden sm:block xl:hidden"
      :class="dottedLineHorizontalClass"
    /> -->

    <!-- <Card
      :title="$t('admin.buildingsManagement.form.basicInformation')"
      class="col-span-8 xl:col-span-5"
    >
      <BasicInformationForm />
    </Card> -->

    <Card class="col-span-8 xl:col-span-5">
      <CardHeader>
        <CardTitle>
          {{ $t("admin.buildingsManagement.form.basicInformation") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <BasicInformationForm />
      </CardContent>
    </Card>

    <Card class="col-span-8 xl:col-span-5">
      <CardHeader>
        <CardTitle>
          {{ $t("admin.buildingsManagement.form.technicalInformation") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <TechnicalInformationForm />
      </CardContent>
    </Card>

    <Card class="col-span-8 xl:col-span-6">
      <CardHeader>
        <CardTitle>
          {{ $t("admin.buildingsManagement.form.administrativeInformation") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <AdministrativeInformationForm />
      </CardContent>
    </Card>

    <Card class="col-span-8 xl:col-span-4">
      <CardHeader>
        <CardTitle>
          {{ $t("admin.buildingsManagement.form.usageInformation") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <UsageInformationForm />
      </CardContent>
    </Card>

    <Card class="col-span-8 xl:col-span-6">
      <CardHeader>
        <CardTitle>
          {{ $t("admin.buildingsManagement.form.additionalInformation") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <AdditionalInformationForm />
      </CardContent>
    </Card>

    <!-- 

    <Card
      :title="$t('admin.buildingsManagement.form.documentationAndFiles')"
      class="col-span-8 xl:col-span-6"
    >
      <DocumentationAndFilesForm />
    </Card> -->
  </div>
</template>

<style></style>
