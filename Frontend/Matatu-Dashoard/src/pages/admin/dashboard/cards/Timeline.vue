<script setup lang="ts">
import VaTimelineItem from '../../../../components/va-timeline-item.vue'
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Matatu Timeline & Routes</h1>
    </VaCardTitle>
    <VaCardContent>
      <table class="mt-4">
        <tbody>
          <VaTimelineItem date="1hr">
            <RouterLink class="va-link font-semibold" to="/matatus">Neo kenya</RouterLink> from Nairobi
            <RouterLink class="va-link font-semibold" to="/matatus"></RouterLink> to Thika
          </VaTimelineItem>
          <VaTimelineItem date="1h ">
            <RouterLink class="va-link font-semibold" to="/matatus">Supermetro</RouterLink> from Nairobi to thika
          </VaTimelineItem>
          <VaTimelineItem date="2hrs">
            <RouterLink class="va-link font-semibold" to="/matatus">Manchester from Nairobi</RouterLink> to thika
          </VaTimelineItem>
          <VaTimelineItem date="45 minutes">
            <RouterLink class="va-link font-semibold" to="/matatus">Naekana from nairobi</RouterLink> to ruiru
            customer response
          </VaTimelineItem>
          <VaTimelineItem date="5hrs">
            <RouterLink class="va-link font-semibold" to="/matatus">meru express</RouterLink> 
          </VaTimelineItem>
          <VaTimelineItem date="1hr 30 minutes">
            <RouterLink class="va-link font-semibold" to="/matatus">Lopha</RouterLink> 
          </VaTimelineItem>
          <VaTimelineItem date="45 minutes">
           <RouterLink class="va-link font-semibold" to="/matatus">kenya mpya</RouterLink> 
          </VaTimelineItem>
        </tbody>
      </table>
    </VaCardContent>
  </VaCard>
</template>
