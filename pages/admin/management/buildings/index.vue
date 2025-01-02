<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BuildingsList from "~/components/admin/management/buildings/buildingsList/BuildingsList.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        {{ $t("admin.menu.buildingsManagement") }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <Button
        @click="navigateTo('/admin/management/buildings/add')"
        class="mb-4"
      >
        {{ $t("admin.buildingsManagement.addBuilding") }}
      </Button>

      <BuildingsList />
    </CardContent>
  </Card>
</template>

<style scoped></style>
