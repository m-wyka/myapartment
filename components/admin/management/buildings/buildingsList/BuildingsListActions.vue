<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

defineProps<{
  data: {
    id: number;
  };
}>();

const handleDeleteBuilding = async (id: number) => {
  console.log(`Delete building: ${id}`);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">
          {{ $t("misc.open") }}
        </span>

        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem
        @click="navigateTo(`/admin/management/buildings/edit/${data.id}`)"
      >
        {{ $t("misc.edit") }}
      </DropdownMenuItem>

      <DropdownMenuItem @click="handleDeleteBuilding(data.id)">
        {{ $t("misc.delete") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
