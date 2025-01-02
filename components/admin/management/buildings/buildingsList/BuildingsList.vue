<script lang="ts" setup>
import DataTable from "@/components/datatable/DataTable.vue";
import BuildingsListActions from "@/components/admin/management/buildings/buildingsList/BuildingsListActions.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { buildings } from "~/data/buildings";

const { t } = useI18n();

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: t("datatable.name"),
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("name")),
  },
  {
    accessorKey: "address",
    header: t("datatable.address"),
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("address")),
  },
  {
    accessorKey: "dateOfConstruction",
    header: t("datatable.dateOfConstruction"),
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("dateOfConstruction")),
  },
  {
    accessorKey: "numberOfFloors",
    header: t("datatable.numberOfFloors"),
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("numberOfFloors")),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      return h(
        "div",
        { class: "relative" },
        h(BuildingsListActions, {
          data,
        })
      );
    },
  },
];
</script>

<template>
  <DataTable :columns="columns" :data="buildings" />
</template>

<style></style>
