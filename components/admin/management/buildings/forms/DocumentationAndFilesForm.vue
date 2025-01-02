<script lang="ts" setup>
import { useForm } from "vee-validate";
import { mimeTypes } from "~/constants/fileMimes";
import Btn from "~/components/Btn.vue";
import FileUploader from "~/components/admin/FileUploader.vue";
import type { FilesPreview } from "~/types/form/fileUploader";

const files = ref<FileList | null>(null);
const filesPreview = ref<FilesPreview[] | null>(null);
const saveFilesControl = ref(false);

provide("saveFilesControl", saveFilesControl);

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  if (!files.value) {
    return;
  }

  filesPreview.value = [...files.value].map((item, index) => {
    return { id: index + 1, file: item };
  });

  saveFilesControl.value = true;
});

const handleUpdateFiles = (value: FileList | null) => {
  files.value = value;
};

const handleDeleteFile = (value: number) => {};

const createFileImagePreview = (value: File) => {
  return URL.createObjectURL(value);
};

const isAllowedMimeType = (value: string) => {
  if (value === mimeTypes.PDF) {
    return;
  }

  return Object.values(mimeTypes).includes(value);
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8">
      <FileUploader name="files" multiple @update="handleUpdateFiles" />

      <div
        v-if="filesPreview"
        class="grid gap-2 xxs:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="(item, index) in filesPreview"
          :key="index"
          class="h-40 relative overflow-hidden border rounded-lg border-gray-300 dark:border-zinc-700"
        >
          <button
            type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 absolute top-1 left-1"
            @click="handleDeleteFile(item.id)"
          >
            <Icon name="ic:baseline-delete-forever" class="size-5" />
            <span class="sr-only">
              {{ $t("misc.delete") }}
            </span>
          </button>

          <img
            v-if="isAllowedMimeType(item.file.type)"
            :src="createFileImagePreview(item.file)"
            :alt="item.file.name"
            class="w-full h-full object-cover rounded-lg"
          />

          <div
            v-if="item.file.type === mimeTypes.PDF"
            class="flex justify-center items-center h-full bg-gray-900 rounded-lg"
          >
            <Icon name="ic:round-picture-as-pdf" class="size-12" />
          </div>

          <p
            class="w-full absolute bottom-0 left-0 p-1 bg-black/80 text-xs truncate"
          >
            {{ item.file.name }}
          </p>
        </div>
      </div>
    </div>

    <Btn type="submit">{{ $t("misc.save") }}</Btn>
  </form>
</template>

<style></style>
