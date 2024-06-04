<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyMatatu, Matatu } from '../types'
import { SelectOption } from 'vuestic-ui'
import { useUsers } from '../../users/composables/useUsers'
import MatatuStatusBadge from '../components/MatatuStatusBadge.vue'
import UserAvatar from '../../users/widgets/UserAvatar.vue'

const props = defineProps<{
  Matatu: Matatu | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', Matatu: Matatu): void
  (event: 'close'): void
}>()

const defaultNewMatatu: EmptyMatatu = {
  matatu_name: '',
  matatu_owner: undefined,
  Capacity: [],
  status: undefined,
}

const newMatatu = ref({ ...defaultNewMatatu })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newMatatu.value).some((key) => {
    if (key === 'team') {
      return false
    }

    return (
      newMatatu.value[key as keyof EmptyMatatu] !== (props.Matatu ?? defaultNewMatatu)?.[key as keyof EmptyMatatu]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.Matatu,
  () => {
    if (!props.Matatu) {
      return
    }

    newMatatu.value = {
      ...props.Matatu,
      matatu_owner: props.Matatu.matatu_owner,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || 'This field is required'

const { users: teamUsers, filters: teamFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
const { users: ownerUsers, filters: ownerFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newMatatu.matatu_name" label="Matatu name" :rules="[required]" />
    <VaSelect
      v-model="newMatatu.matatu_owner"
      v-model:search="ownerFilters.search"
      searchable
      label="Owner"
      text-by="fullname"
      track-by="id"
      :rules="[required]"
      :options="ownerUsers"
    >
      <template #content="{ value: user }">
        <div v-if="user" :key="user.id" class="flex items-center gap-1 mr-4">
          <UserAvatar :user="user" size="18px" />
          {{ user.fullname }}
        </div>
      </template>
    </VaSelect>
    <VaSelect
      v-model="newMatatu.Capacity"
      v-model:search="teamFilters.search"
      label="Team"
      text-by="fullname"
      track-by="id"
      multiple
      :rules="[(v: any) => ('length' in v && v.length > 0) || 'This field is required']"
      :options="teamUsers"
      :max-visible-options="$vaBreakpoint.mdUp ? 3 : 1"
    >
      <template #content="{ valueArray }">
        <template v-if="valueArray">
          <div v-for="(user, index) in valueArray" :key="user.id" class="flex items-center gap-1 mr-2">
            <UserAvatar :user="user" size="18px" />
            {{ user.fullname }}{{ index < valueArray.length - 1 ? ',' : '' }}
          </div>
        </template>
      </template>
    </VaSelect>
    <VaSelect
      v-model="newMatatu.status"
      label="Status"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: 'In progress', value: 'in progress' },
        { text: 'Archived', value: 'archived' },
        { text: 'Completed', value: 'completed' },
        { text: 'Important', value: 'important' },
      ]"
    >
      <template #content="{ value }">
        <MatatuStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
      <VaButton @click="validate() && $emit('save', newMatatu as Matatu)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
