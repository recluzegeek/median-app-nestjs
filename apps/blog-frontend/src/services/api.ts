const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export class ApiService {
  private static accessToken: string | null = null
  private static refreshToken: string | null = null

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
        ...options.headers,
      },
    }

    const config = { ...defaultOptions, ...options }

    try {
      let response = await fetch(url, config)
      let data = await response.json()

      if (!response.ok) {
        if (response.status === 401 && this.refreshToken) {
          const refreshed = await this.refreshAccessToken()
          if (refreshed) {
            const retryConfig = {
              ...config,
              headers: {
                ...(config.headers || {}),
                Authorization: `Bearer ${this.accessToken}`,
              },
            }
            response = await fetch(url, retryConfig)
            data = await response.json()
            if (!response.ok) {
              throw new Error(data.message || `HTTP error! status: ${response.status}`)
            }
          } else {
            throw new Error(data.message || `HTTP error! status: ${response.status}`)
          }
        } else {
          throw new Error(data.message || `HTTP error! status: ${response.status}`)
        }
      }

      return {
        data,
        status: response.status,
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Network error')
    }
  }

  // Articles
  static async getArticles(): Promise<ApiResponse<any[]>> {
    return this.request('/articles')
  }

  static async getArticle(id: number): Promise<ApiResponse<any>> {
    return this.request(`/articles/${id}`)
  }

  static async createArticle(articleData: any): Promise<ApiResponse<any>> {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    })
  }

  static async updateArticle(id: number, articleData: any): Promise<ApiResponse<any>> {
    return this.request(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(articleData),
    })
  }

  static async deleteArticle(id: number): Promise<ApiResponse<void>> {
    return this.request(`/articles/${id}`, {
      method: 'DELETE',
    })
  }

  // Auth
  static async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    // Save tokens
    this.accessToken = (res.data as any).accessToken
    this.refreshToken = (res.data as any).refreshToken
    return res
  }

  static async register(userData: {
    email: string
    password: string
    name: string
    username: string
  }): Promise<ApiResponse<any>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  static async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      })
      if (!res.ok) return false
      const data = await res.json()
      this.accessToken = data.accessToken
      return true
    } catch (e) {
      return false
    }
  }

  // Users
  static async getUsers(): Promise<ApiResponse<any[]>> {
    return this.request('/user')
  }

  static async getUser(id: number): Promise<ApiResponse<any>> {
    return this.request(`/user/${id}`)
  }

  static async createUser(userData: any): Promise<ApiResponse<any>> {
    return this.request('/user', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  static async updateUser(id: number, userData: any): Promise<ApiResponse<any>> {
    return this.request(`/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  }

  static async deleteUser(id: number): Promise<ApiResponse<void>> {
    return this.request(`/user/${id}`, {
      method: 'DELETE',
    })
  }
}
