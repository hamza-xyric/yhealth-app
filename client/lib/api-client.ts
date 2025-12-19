const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090/api";

// Cookie utilities
const COOKIE_NAME = "yhealth_access_token";
const COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

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
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
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

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
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

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Initialize token from cookie (call this on client side)
  initFromCookie(): void {
    if (this.initialized) return;
    const cookieToken = getCookie(COOKIE_NAME);
    if (cookieToken) {
      this.accessToken = cookieToken;
      if (process.env.NODE_ENV === "development") {
        console.log("[API Client] Token loaded from cookie:", `${cookieToken.substring(0, 20)}...`);
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

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  // Get current token, auto-initializing from cookie if needed
  private getToken(): string | null {
    if (!this.accessToken && !this.initialized) {
      this.initFromCookie();
    }
    return this.accessToken;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config;
    const url = this.buildUrl(endpoint, params);
    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    if (token) {
      (headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[API Client] ${config.method || "GET"} ${endpoint}`, {
        hasToken: !!token,
      });
    }

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error?.message || "Request failed",
          response.status,
          data.error?.code || "REQUEST_FAILED",
          data.error?.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Network error", 0, "NETWORK_ERROR");
    }
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
      body: body ? JSON.stringify(body) : undefined,
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
      body: body ? JSON.stringify(body) : undefined,
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
    const url = this.buildUrl(endpoint);
    const token = this.getToken();

    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[API Client] UPLOAD ${endpoint}`, {
        hasToken: !!token,
      });
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error?.message || "Upload failed",
          response.status,
          data.error?.code || "UPLOAD_FAILED",
          data.error?.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Network error", 0, "NETWORK_ERROR");
    }
  }

  // Getter for access token (useful for external calls)
  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const api = new ApiClient(API_URL);
export default api;
