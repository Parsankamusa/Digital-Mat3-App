import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Musa Parsanka',
      email: 'parsankamusa@gmail.com',
      memberSince: '8/05/2024',
      pfp: 'https://picsum.photos/id/22/200/300',
      is2FAEnabled: false,
    }
  },

  actions: {
    toggle2FA() {
      this.is2FAEnabled = !this.is2FAEnabled
    },

    changeUserName(userName: string) {
      this.userName = userName
    },
  },
})
