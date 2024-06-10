<script setup lang="ts">
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Matatu } from '../../../projects/types'
import UserAvatar from '../../../users/widgets/UserAvatar.vue'
import MatatuStatusBadge from '../../../projects/components/MatatuStatusBadge.vue'

import { usematatus } from '../../../projects/composables/usematatu'
import { Pagination } from '../../../../data/pages/matatus'
import { ref } from 'vue'
import { getmatatus } from '../../../../data/pages/matatus'

const columns = defineVaDataTableColumns([
  { label: 'Name', key: 'matatu_name', sortable: true },
  { label: 'Street', key: 'Street', sortable: true },
  { label: 'Capacity', key: 'Capacity', sortable: true },
])

const pagination = ref<Pagination>({ page: 1, perPage: 5, total: 0 })
const { matatus, isLoading, sorting } = usematatus({
  pagination,
})

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">matatus</h1>
      <VaButton preset="primary" size="small" to="/matatus">View all matatus</VaButton>
    </VaCardTitle>
    <VaCardContent>
      <div v-if="matatus.length > 0">
        <VaDataTable
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          :items="matatus"
          :columns="columns"
          :loading="isLoading"
        >
          <template #cell(matatu_name)="{ rowData }">
            <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
              {{ rowData.matatu_name }}
            </div>
          </template>
          <template #cell(matatu_owner)="{ rowData }">
            <div class="flex items-center gap-2 ellipsis max-w-[230px]">
              <UserAvatar :user="rowData.matatu_owner" size="small" />
              {{ rowData.matatu_owner.fullname }}
            </div>
          </template>
          <template #cell(Capacity)="{ rowData: matatu }">
            <VaAvatarGroup
              size="small"
              :options="
                (matatu as Matatu).Capacity.map((user) => ({
                  label: user.fullname,
                  src: user.avatar,
                  fallbackText: user.fullname[0],
                  color: avatarColor(user.fullname),
                }))
              "
              :max="2"
            />
          </template>
          <template #cell(status)="{ rowData: matatu }">
            <matatustatusBadge :status="matatu.status" />
          </template>
        </VaDataTable>
      </div>
      <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No matatus</div>
    </VaCardContent>
  </VaCard>
</template>
