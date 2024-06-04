import { sleep } from '../../services/utils'
import matatusDb from './matatus-db.json'
import usersDb from './users-db.json'

// Simulate API calls
export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof (typeof matatusDb)[number] | undefined
  sortingOrder: 'asc' | 'desc' | null
}

const getSortItem = (obj: any, sortBy: keyof (typeof matatusDb)[number]) => {
  if (sortBy === 'matatu_owner') {
    return obj.matatu_owner.fullname
  }

  if (sortBy === 'Capacity') {
    return obj.Capacity.map((user: any) => user.fullname).join(', ')
  }

  if (sortBy === 'creation_date') {
    return new Date(obj[sortBy])
  }

  return obj[sortBy]
}

export const getmatatus = async (options: Sorting & Pagination) => {
  await sleep(1000)

  const matatus = matatusDb.map((matatu) => ({
    ...matatu,
    matatu_owner: usersDb.find((user) => user.id === matatu.matatu_owner)! as (typeof usersDb)[number],
    Capacity: usersDb.filter((user) => matatu.Capacity.includes(user.id)) as (typeof usersDb)[number][],
  }))

  if (options.sortBy && options.sortingOrder) {
    matatus.sort((a, b) => {
      a = getSortItem(a, options.sortBy!)
      b = getSortItem(b, options.sortBy!)
      if (a < b) {
        return options.sortingOrder === 'asc' ? -1 : 1
      }
      if (a > b) {
        return options.sortingOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const normalizedmatatus = matatus.slice((options.page - 1) * options.perPage, options.page * options.perPage)

  return {
    data: normalizedmatatus,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: matatusDb.length,
    },
  }
}

export const addmatatu = async (matatu: Omit<(typeof matatusDb)[number], 'id' | 'creation_date'>) => {
  await sleep(1000)

  const newmatatu = {
    ...matatu,
    id: matatusDb.length + 1,
    creation_date: new Date().toLocaleDateString('gb', { day: 'numeric', month: 'short', year: 'numeric' }),
  }

  matatusDb.push(newmatatu)

  return {
    ...newmatatu,
    matatu_owner: usersDb.find((user) => user.id === matatu.matatu_owner)! as (typeof usersDb)[number],
    Capacity: usersDb.filter((user) => matatu.Capacity.includes(user.id)),
  }
}

export const updatematatu = async (matatu: (typeof matatusDb)[number]) => {
  await sleep(1000)

  const index = matatusDb.findIndex((p) => p.id === matatu.id)
  matatusDb[index] = matatu

  return matatu
}

export const removematatu = async (matatu: (typeof matatusDb)[number]) => {
  await sleep(1000)

  const index = matatusDb.findIndex((p) => p.id === matatu.id)
  matatusDb.splice(index, 1)

  return matatu
}
