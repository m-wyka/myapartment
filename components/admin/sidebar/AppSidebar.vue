<script lang="ts" setup>
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const { t } = useI18n();

const menu = ref<MenuItem[]>([
  {
    id: 1,
    name: t("admin.menu.buildingsManagement"),
    to: "/admin/management/buildings",
    icon: "tabler:building-cog",
  },
  {
    id: 2,
    name: t("admin.menu.floorManagement"),
    to: "/admin/management/floors",
    icon: "ph:stairs-fill",
  },
  {
    id: 3,
    name: t("admin.menu.apartmentManagement"),
    to: "/admin/management/apartments",
    icon: "material-symbols:add-home-outline-rounded",
  },
]);
</script>

<template>
  <div>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in menu" :key="item.id">
                <SidebarMenuButton asChild>
                  <NuxtLink :to="item.to">
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </div>
</template>

<style></style>
