import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090/api";

// Cookie utilities
const COOKIE_NAME = "yhealth_access_token";
const COOKIE_MAX_AGE = 3 * 24 * 60 * 60; // 3 days - match JWT_EXPIRES_IN

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  // Don't use Secure flag in development (localhost uses HTTP)
  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secureFlag = isSecure ? "; Secure" : "";
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface RequestConfig {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private initialized = false;
  private axios: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axios = axios.create({
      baseURL: this.baseUrl,
      withCredentials: false,
    });

    // Attach auth token automatically on every request
    this.axios.interceptors.request.use((config) => {
      const token = this.getToken();

      const headers = (config.headers =
        config.headers ?? this.axios.defaults.headers.common);

      // Ensure JSON by default unless caller overrides (uploads override this)
      const hasContentType =
        "Content-Type" in headers &&
        typeof headers["Content-Type"] !== "undefined";

      if (!(config.data instanceof FormData) && !hasContentType) {
        headers["Content-Type"] = "application/json";
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (process.env.NODE_ENV === "development") {
        console.debug(
          "[API Client] Request",
          config.method,
          config.url,
          "hasToken:",
          !!token
        );
      }

      return config;
    });

    // Normalize errors
    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse<unknown> & { message?: string; code?: string }>) => {
        if (error.response) {
          const status = error.response.status;
          const payload = error.response.data;

          // Handle both error formats:
          // 1. { error: { code, message } } - standard format
          // 2. { code, message } - server format
          const errorMessage = payload?.error?.message || payload?.message || "Request failed";
          const errorCode = payload?.error?.code || payload?.code || "REQUEST_FAILED";
          const errorDetails = payload?.error?.details;

          throw new ApiError(
            errorMessage,
            status,
            errorCode,
            errorDetails
          );
        }

        if (error.request) {
          throw new ApiError("Network error", 0, "NETWORK_ERROR");
        }

        throw new ApiError(
          error.message || "Unexpected error",
          0,
          "UNKNOWN_ERROR"
        );
      }
    );
  }

  // Initialize token from cookie (call this on client side)
  initFromCookie(): void {
    if (this.initialized) return;
    const cookieToken = getCookie(COOKIE_NAME);
    if (cookieToken) {
      this.accessToken = cookieToken;
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[API Client] Token loaded from cookie:",
          `${cookieToken.substring(0, 20)}...`
        );
      }
    }
    this.initialized = true;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;

    // Persist to cookie for global access
    if (token) {
      setCookie(COOKIE_NAME, token, COOKIE_MAX_AGE);
    } else {
      deleteCookie(COOKIE_NAME);
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[API Client] Token set:",
        token ? `${token.substring(0, 20)}...` : "null"
      );
    }
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  // Get current token, auto-initializing from cookie if needed
  private getToken(): string | null {
    // If we have an in-memory token, use it
    if (this.accessToken) {
      return this.accessToken;
    }

    // Try to read from cookie (even if initialized, token might have been set externally)
    const cookieToken = getCookie(COOKIE_NAME);
    if (cookieToken) {
      this.accessToken = cookieToken;
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[API Client] Token recovered from cookie:",
          `${cookieToken.substring(0, 20)}...`
        );
      }
      return cookieToken;
    }

    return null;
  }

  private async request<T>(
    endpoint: string,
    config: AxiosRequestConfig & RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      url: endpoint,
      method: config.method || "GET",
      params: config.params,
      data: config.data,
      signal: config.signal,
      headers: config.headers,
    };

    const response: AxiosResponse<ApiResponse<T>> = await this.axios.request<
      ApiResponse<T>
    >(axiosConfig);

    return response.data;
  }

  async get<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      data: body,
    });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      data: body,
    });
  }

  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }

  // Upload method for multipart form data (don't set Content-Type - let browser set it with boundary)
  async upload<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axios.post<
      ApiResponse<T>
    >(endpoint, formData);

    return response.data;
  }

  // Getter for access token (useful for external calls)
  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const api = new ApiClient(API_URL);
export default api;
