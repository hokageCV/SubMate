import { ID } from 'appwrite'
import { account } from './config'

type CreateUserAccount = {
  email: string
  password: string
  name: string
}

type LoginUserAccount = {
  email: string
  password: string
}

export class AppwriteAuthService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name)

      if (userAccount) {
        return this.login({ email, password })
      } else {
        userAccount
      }
    } catch (error) {
      throw error
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password)
    } catch (error) {
      throw error
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser()
      return Boolean(data)
    } catch (error) {}

    return false
  }

  async getCurrentUser() {
    try {
      return account.get()
    } catch (error) {
      console.log('getcurrentUser error: ' + error)
    }

    return null
  }

  async logout() {
    try {
      return await account.deleteSession('current')
    } catch (error) {
      console.log('logout error: ' + error)
    }
  }
}

const appwriteAuthService = new AppwriteAuthService()

export default appwriteAuthService
