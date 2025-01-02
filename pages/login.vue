<script lang="ts" setup>
import Card from "~/components/Card.vue";
import Logo from "~/components/Logo.vue";
import LoginForm from "~/components/admin/forms/LoginForm.vue";

definePageMeta({
  layout: "login",
  middleware: "admin-layout",
});
</script>

<template>
  <div class="flex justify-center sm:items-center h-full mt-8 sm:mt-0">
    <div class="max-w-[28rem] w-full">
      <Logo class="justify-center mb-8" />
      <Card title="Logowanie">
        <template #content>
          <LoginForm />
        </template>
      </Card>
    </div>
  </div>
</template>
