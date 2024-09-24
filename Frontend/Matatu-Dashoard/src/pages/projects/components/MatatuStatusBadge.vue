<script setup lang="ts">
import { PropType } from 'vue'
import { EmptyMatatu} from '../types'

defineProps({
  status: {
    type: String as PropType<Matatu['status']>,
    required: true,
  },
})

const badgeColorMap: Record<Matatu['status'], string> = {
  onservice : 'primary',
  coaches: 'secondary',
  minibus: 'success',
  bus: 'warning',
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="$props.status.toUpperCase()" />
</template>
