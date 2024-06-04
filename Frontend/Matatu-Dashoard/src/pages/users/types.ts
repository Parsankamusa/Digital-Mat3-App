import { Matatu } from '../projects/types'

export type UserRole = 'admin' | 'user' | 'owner'

export type User = {
  id: number
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  matatus: Matatu[]
  notes: string
  active: boolean
}
