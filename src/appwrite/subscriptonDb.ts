import { FormCreateSubscription, Subscription } from '@/app/types'
import config from '@/config/config'
import { handleCustomEndDate, handleRegularEndDate } from '@/utils/date'
import { ID, Query } from 'appwrite'
import { DateTime } from 'luxon'
import appwriteAuthService from './auth'
import { databases } from './config'

export class SubscriptionService {
  async createSubscription(formData: FormCreateSubscription) {
    const currentUser = await appwriteAuthService.getCurrentUser()
    if (!currentUser) return null

    let subscriptionDetails: Subscription = {
      ...formData,
      user_id: currentUser.$id,
      user_email: currentUser.email,
      is_active: true,
    }

    if (formData.recurring_frequency === 'custom') {
      const end_date = handleCustomEndDate(formData.start_date, formData.custom_recurring_frequency)
      subscriptionDetails = { ...subscriptionDetails, end_date: end_date }
    } else {
      const end_date = handleRegularEndDate(formData.start_date, formData.recurring_frequency)
      subscriptionDetails = { ...subscriptionDetails, end_date: end_date }
    }

    try {
      return await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        subscriptionDetails
      )
    } catch (error) {
      throw error
    }
  }

  async getSubscriptionList(queries = [Query.equal('is_active', true)]) {
    try {
      const currentUser = await appwriteAuthService.getCurrentUser()
      if (!currentUser) return null

      queries.push(Query.equal('user_id', currentUser.$id))

      return await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      )
    } catch (error) {
      throw error
    }
  }

  async getSubscription(subscriptionId: string) {
    try {
      return await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        subscriptionId
      )
    } catch (error) {
      throw error
    }
  }

  async deleteSubscription(subscriptionId: string) {
    try {
      return await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        subscriptionId
      )
    } catch (error) {
      throw error
    }
  }

  async getAllExpiringSubscriptions() {
    const tomorrow = DateTime.now().plus({ days: 1 })
    const query = [Query.equal('end_date', tomorrow.toISODate()), Query.equal('is_active', true)]

    try {
      return await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        query
      )
    } catch (error) {
      throw error
    }
  }
}

const subscriptionService = new SubscriptionService()

export default subscriptionService
