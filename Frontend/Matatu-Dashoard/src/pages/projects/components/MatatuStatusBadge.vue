<script setup lang="ts">
import { PropType } from 'vue'
import { Matatu } from '../types'

defineProps({
  status: {
    type: String as PropType<Matatu['status']>,
    required: true,
  },
})

const badgeColorMap: Record<Matatu['status'], string> = {
  'in progress': 'primary',
  archived: 'secondary',
  completed: 'success',
  important: 'warning',
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="$props.status.toUpperCase()" />
</template>
