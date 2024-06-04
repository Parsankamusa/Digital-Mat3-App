<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { usematatus} from './composables/usematatu'
import MatatuCards from './widgets/MatatuCards.vue';
import MatatuTable from './widgets/MatatusTable.vue'
import EditMatatuForm from './widgets/EditMatatuForm.vue'
import { Matatu } from './types'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('Matatus-view', true)

const { matatus, update, add, isLoading, remove, pagination, sorting } = usematatus()

const MatatuToEdit = ref<Matatu | null>(null)
const doShowMatatuFormModal = ref(false)

const editMatatu = (Matatu: Matatu) => {
  MatatuToEdit.value = Matatu
  doShowMatatuFormModal.value = true
}

const createNewMatatu = () => {
  MatatuToEdit.value = null
  doShowMatatuFormModal.value = true
}

const { init: notify } = useToast()

const onMatatuSaved = async (Matatu: Matatu) => {
  doShowMatatuFormModal.value = false
  if ('id' in Matatu) {
    await update(Matatu as Matatu)
    notify({
      message: 'Matatu updated',
      color: 'success',
    })
  } else {
    await add(Matatu as Matatu)
    notify({
      message: 'Matatu created',
      color: 'success',
    })
  }
}

const { confirm } = useModal()

const onMatatuDeleted = async (Matatu: Matatu) => {
  const response = await confirm({
    title: 'Delete Matatu',
    message: `Are you sure you want to delete Matatu "${Matatu.matatu_name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(Matatu)
  notify({
    message: 'Matatu deleted',
    color: 'success',
  })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">Matatus</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Cards', value: true },
              { label: 'Table', value: false },
            ]"
          />
        </div>
        <VaButton icon="add" @click="createNewMatatu">Matatu</VaButton>
      </div>

      <MatatuCards
        v-if="doShowAsCards"
        :Matatus="matatus"
        :loading="isLoading"
        @edit="editMatatu"
        @delete="onMatatuDeleted"
      />
      <MatatuTable
        v-else
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :Matatus="matatus"
        :loading="isLoading"
        @edit="editMatatu"
        @delete="onMatatuDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowMatatuFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="MatatuToEdit === null" class="va-h5 mb-4">Add Matatu</h1>
      <h1 v-else class="va-h5 mb-4">Edit Matatu</h1>
      <EditMatatuForm
        ref="editFormRef"
        :Matatu="MatatuToEdit"
        :save-button-label="MatatuToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (Matatu) => {
            onMatatuSaved(Matatu)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
