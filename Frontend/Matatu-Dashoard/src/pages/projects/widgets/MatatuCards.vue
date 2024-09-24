<script setup lang="ts">
import { PropType } from 'vue'
import type {EmptyMatatu} from '../types'

defineProps({
  Matatus: {
    type: Array as PropType<Matatu[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'edit', Matatu: Matatu): void
  (event: 'delete', Matatu: Matatu): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <VaInnerLoading
    v-if="Matatus.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="Matatu in Matatus"
      :key="Matatu.matatu_name"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="text-[var(--va-secondary)]">{{ Matatu.creation_date }}</div>
        <div class="flex flex-col items-center gap-4 grow">
          <h4 class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            {{ Matatu.matatu_name }}
          </h4>
          <p>
            <span class="text-[var(--va-secondary)]">Owner: </span>
            <span>{{ Matatu.matatu_owner.fullname }}</span>
          </p>
          <VaAvatarGroup
            class="my-4"
            :options="
              Matatu.Capacity.map((user) => ({
                label: user.fullname,
                src: user.avatar,
                fallbackText: user.fullname[0],
                color: avatarColor(user.fullname),
              }))
            "
            :max="5"
          />
          <MatatuStatusBadge :status="Matatu.status" />
        </div>
        <VaDivider class="my-6" />
        <div class="flex justify-between">
          <VaButton preset="secondary" icon="mso-edit" color="secondary" @click="$emit('edit', Matatu)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('delete', Matatu)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No Matatus</div>
</template>
