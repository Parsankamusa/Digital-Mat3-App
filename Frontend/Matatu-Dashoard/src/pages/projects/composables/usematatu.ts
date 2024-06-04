import { Ref, ref, unref } from 'vue'
import {
  getmatatus,
  addmatatu,
  updatematatu,
  removematatu,
  Sorting,
  Pagination,
} from '../../../data/pages/matatus'
import { Matatu } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'creation_date', sortingOrder: 'desc' })

export const usematatus = (options?: { sorting?: Ref<Sorting>; pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false)
  const matatus = ref<Matatu[]>([])

  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getmatatus({
      ...unref(sorting),
      ...unref(pagination),
    })

    matatus.value = data.map((item: any) => ({
      id: item.id,
      matatu_name: item.matatu_name,
      matatu_owner: item.matatu_owner,
      Capacity: item.Capacity,
      status: item.status,
      creation_date: item.creation_date,
    }))

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    matatus,

    fetch,

    async add(matatu: Omit<Matatu, 'id' | 'creation_date'>) {
      isLoading.value = true
      await addmatatu({
        ...matatu,
        matatu_owner: matatu.matatu_owner.id,
        Capacity: matatu.Capacity.map((user) => user.id),
      })
      await fetch()
      isLoading.value = false
    },

    async update(matatu: Matatu) {
      isLoading.value = true
      await updatematatu({
        ...matatu,
        matatu_owner: matatu.matatu_owner.id,
        Capacity: matatu.Capacity.map((user) => user.id),
      })
      await fetch()
      isLoading.value = false
    },

    async remove(matatu: Matatu) {
      isLoading.value = true
      await removematatu({
        ...matatu,
        matatu_owner: matatu.matatu_owner.id,
        Capacity: matatu.Capacity.map((user) => user.id),
      })
      await fetch()
      isLoading.value = false
    },

    pagination,
    sorting,
  }
}
