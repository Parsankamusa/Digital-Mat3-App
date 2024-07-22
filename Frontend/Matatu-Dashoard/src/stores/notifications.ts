import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => {
    return {
      notifications: {
        searchingForAJob: {
          name: 'Searching for a matatu route',
          isEnabled: true,
        },
        hiringSomeone: {
          name: 'Searching for a matatu street',
          isEnabled: false,
        },
        connectingWithOthers: {
          name: 'Connecting with others',
          isEnabled: true,
        },
        postingAndCommenting: {
          name: 'Posting and commenting',
          isEnabled: true,
        },
        messaging: {
          name: 'Messaging',
          isEnabled: true,
        },
        groups: {
          name: 'Groups',
          isEnabled: false,
        },
        pages: {
          name: 'Pages',
          isEnabled: true,
        },
        attendingEvents: {
          name: 'attending avents I need matatu details ',
          isEnabled: true,
        },
        newsAndReports: {
          name: 'News and reports',
          isEnabled: false,
        },
        updatingYourProfile: {
          name: 'Updating your profile',
          isEnabled: true,
        },
        verifications: {
          name: 'Verifications',
          isEnabled: true,
        },
      },
    }
  },
})
