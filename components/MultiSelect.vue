<script lang="ts" setup>
interface Lorem {
  id: number;
  name: string;
  value: string;
}

const props = defineProps<{
  modelValue: Lorem[];
  options: Lorem[];
  name: string;
  label: string;
}>();

const asd = ref();

const lorem = (value: Lorem) => {
  const find = props.modelValue.find((item) => item.id === value.id);

  if (find) {
    asd.value = props.modelValue.filter((item) => item.id !== value.id);
  } else {
    props.modelValue.push(value);
    asd.value = props.modelValue;
  }
};
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>
        {{ label }}
      </FormLabel>

      <Select v-bind="componentField">
        <FormControl class="min-h-10 h-auto">
          <SelectTrigger>
            <div class="flex flex-wrap gap-1">
              <Badge v-for="item in modelValue" :key="item.id">
                {{ item.name }}
              </Badge>
            </div>
          </SelectTrigger>
        </FormControl>

        <SelectContent class="py-1">
          <div
            v-for="item in options"
            :key="item.value"
            class="mx-1 p-2 rounded hover:bg-zinc-800 cursor-pointer"
            @click.prevent.stop="lorem(item)"
          >
            <label
              :for="item.value"
              class="flex items-center relative cursor-pointer"
            >
              <Checkbox
                :id="item.value"
                :checked="!!modelValue.find((x) => x.id === item.id)"
                class="absolute left-0"
              />

              <span class="pl-6 text-sm leading-noge font-medium select-none">
                {{ item.name }}
              </span>
            </label>
          </div>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style></style>
