import { User } from '../users/types'

export type Matatu = {
  id: number
  matatu_name: string
  matatu_owner: Omit<User, 'matatus'>
  Capacity: Omit<User, 'matatus'>[]
  status: 'minibus' | 'bus' | 'coaches' | 'on service'
  creation_date: string
}

export type EmptyMatatu = Omit<Matatu, 'id' | 'matatu_owner' | 'creation_date' | 'status'> & {
  matatu_owner: Matatu['matatu_owner'] | undefined
  status: Matatu['status'] | undefined
}
