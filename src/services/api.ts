import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '../store/auth'

interface PageContent {
  [key: string]: unknown
}

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password })
    return response.data
  }

  async register(email: string, password: string, firstName: string, lastName: string, tenantSlug: string, tenantName: string) {
    const response = await this.api.post('/auth/register', { 
      firstName, 
      lastName, 
      email, 
      password, 
      tenantSlug, 
      tenantName 
    })
    return response.data
  }

  // Pages endpoints
  async getPages(params: { 
    search?: string
    status?: string
    page?: number
    limit?: number
  } = {}) {
    const response = await this.api.get('/pages', { params })
    return response.data
  }

  async getPage(id: string) {
    const response = await this.api.get(`/pages/${id}`)
    return response.data
  }

  async createPage(data: {
    title: string
    slug: string
    content: PageContent
    status?: 'draft' | 'published'
  }) {
    const response = await this.api.post('/pages', data)
    return response.data
  }

  async updatePage(id: string, data: {
    title?: string
    slug?: string
    content?: PageContent
    status?: 'draft' | 'published'
  }) {
    const response = await this.api.put(`/pages/${id}`, data)
    return response.data
  }

  async deletePage(id: string) {
    const response = await this.api.delete(`/pages/${id}`)
    return response.data
  }

  // Media endpoints
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await this.api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async getMediaFiles() {
    const response = await this.api.get('/media')
    return response.data
  }

  async deleteMediaFile(id: string) {
    const response = await this.api.delete(`/media/${id}`)
    return response.data
  }
}

export const apiService = new ApiService()
export default apiService
