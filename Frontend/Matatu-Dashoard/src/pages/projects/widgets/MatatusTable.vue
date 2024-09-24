<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { EmptyMatatu} from '../types'
import UserAvatar from '../../users/widgets/UserAvatar.vue'
import MatatuStatusBadge from '../components/MatatuStatusBadge.vue'
import { Sorting, Pagination } from '../../../data/pages/matatus'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  { label: 'Matatu name', key: 'Matatu_name', sortable: true },
  { label: 'Matatu owner', key: 'Matatu_owner', sortable: true },
  { label: 'Capacity', key: 'Capacity', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
  { label: 'Creation Date', key: 'creation_date', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  Matatus: {
    type: Array as PropType<Matatu[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: Object as PropType<Sorting['sortBy']>,
    required: true,
  },
  sortingOrder: {
    type: Object as PropType<Sorting['sortingOrder']>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'edit', Matatu: Matatu): void
  (event: 'delete', Matatu: Matatu): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}

const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="Matatus"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(Matatu_name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.Matatu_name }}
        </div>
      </template>
      <template #cell(Matatu_owner)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          <UserAvatar :user="rowData.Matatu_owner" size="small" />
          {{ rowData.Matatu_owner.fullname }}
        </div>
      </template>
      <template #cell(Capacity)="{ rowData: Matatu }">
        <VaAvatarGroup
          size="small"
          :options="
            (Matatu as Matatu).Capacity.map((user) => ({
              label: user.fullname,
              src: user.avatar,
              fallbackText: user.fullname[0],
              color: avatarColor(user.fullname),
            }))
          "
          :max="5"
        />
      </template>
      <template #cell(status)="{ rowData: Matatu }">
        <MatatuStatusBadge :status="Matatu.status" />
      </template>

      <template #cell(actions)="{ rowData: Matatu }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit Matatu"
            @click="$emit('edit', Matatu as Matatu)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete Matatu"
            @click="$emit('delete', Matatu as Matatu)"
          />
        </div>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>{{ $props.pagination.total }} results.</b>
        Results per page
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
