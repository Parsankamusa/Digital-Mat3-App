<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Matatu fare</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-col gap-1">
      <div class="flex justify-between">
        <VaButtonToggle v-model="selectedPeriod" :options="periods" color="background-element" size="small" />

        <VaButton preset="primary" size="small" @click="exportAsCSV"> Export </VaButton>
      </div>

      <VaDataTable
        class="region-fare-table"
        :columns="[
          { key: 'name', label: 'Top matatu' },
          { key: 'fare', label: 'fare', align: 'right' },
        ]"
        :items="data"
      >
        <template #cell(fare)="{ rowData }"> ksh{{ rowData[`fare${selectedPeriod}`] }} </template>
      </VaDataTable>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { downloadAsCSV } from '../../../../services/toCSV'

const selectedPeriod = ref('Today')
const periods = ['Today', 'Week', 'Month'].map((period) => ({ label: period, value: period }))

const data = [
  {
    name: 'Neo Kenya',
    fareToday: '70',
    fareWeek: ' 490',
    fareMonth: ' 2100',
  },
  {
    name: 'Manchester',
    fareToday: '80',
    fareWeek: ' 560',
    fareMonth: ' 2400',
  },
  {
    name: 'Lopha',
    fareToday: '80',
    fareWeek: ' 560',
    fareMonth: ' 2400',
  },
  {
    name: 'Naekana sacco',
    fareToday: '80',
    fareWeek: ' 560',
    fareMonth: ' 2400',
  },
  {
    name: 'Meru express',
    fareToday: '500',
    fareWeek: '3500',
    fareMonth: '800,000',
  },
  {
    name: 'Supermetro',
    fareToday: '80',
    fareWeek: ' 560',
    fareMonth: ' 2400'
  },
  {
    name: 'kitui express',
    fareToday: '800',
    fareWeek: ' 5600',
    fareMonth: ' 24000',
  },
]

const exportAsCSV = () => {
  downloadAsCSV(data, 'matatu-fare')
}
</script>

<style lang="scss" scoped>
.region-fare-table {
  ::v-deep(tbody) {
    tr {
      border-top: 1px solid var(--va-background-border);
    }
  }
}
</style>
