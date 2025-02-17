import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { PageCommentsType, UserCommentsType } from "./types/get-comments.type";
import { PoemsType } from "./types/poems.type";
import { BooksType } from "./types/books.type";
import { PinnedPoems } from "./types/pin-poems.type";
import { Reviews } from "./types/reviews.type";
import { ReviewsCategoryType } from "./types/reviews-category.type";
import { AboutTypes } from "./types/about.type";
import { StaticType } from "./types/static.type";
import { MomentsType } from "./types/moments.type";
import { MomentsSingleType } from "./types/moments-single-type";
import { NotificationsType } from "./types/notifications.type";

interface User {
  id: number;
  first_name: string;
  email: string;
  is_activated: boolean;
}

interface UserData {
  error?: string;
  token: string;
  user: User;
}

interface RegisterBody {
  first_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface IForgotPasswordBody {
  email: string;
}

interface IResetPasswordBody {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

class PoetService {
  private URl = "https://ezizhellen.com.tm/app/api/v1/";
  private URL_TOKEN = "https://ezizhellen.com.tm/app/api/";

  private authStore = useAuthStore;

  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest._isRefreshRequest
        ) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();

            if (newToken) {
              this.authStore
                .getState()
                .setAuthData(this.authStore.getState().name, newToken);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newToken}`;
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.log("Refresh token failed:", refreshError);
            this.authStore.getState().clearAuthData();
            return Promise.reject(refreshError);
          }
        }

        // Если ошибка 401 и это запрос на обновление токена - разлогиниваем
        if (error.config._isRefreshRequest && error.response?.status === 401) {
          this.authStore.getState().clearAuthData();
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  }
  postUser = async (body: RegisterBody) => {
    const { data } = await axios.post<UserData>(
      `${this.URL_TOKEN}signup`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.token) {
      this.authStore.getState().setAuthData(data.user.first_name, data.token);
    }
    return data;
  };

  loginUser = async (body: LoginBody) => {
    const { data } = await axios.post<UserData>(
      `${this.URL_TOKEN}login`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.token) {
      this.authStore.getState().setAuthData(data.user.first_name, data.token);
    }

    return data;
  };

  forgotPassword = async (body: IForgotPasswordBody) => {
    const res = await axios.post(`${this.URL_TOKEN}password/reset`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  };

  resetPassword = async (body: IResetPasswordBody) => {
    const res = await axios.post(
      `${this.URL_TOKEN}password/reset/confirm`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res;
  };

  refreshToken = async () => {
    try {
      const token = this.authStore.getState().accessToken;
      if (!token) throw new Error("No refresh token available");

      const { data } = await axios.post(
        `${this.URL_TOKEN}refresh`,
        { token },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // _isRefreshRequest: true, // Помечаем запрос как refresh
        }
      );

      return data.token;
    } catch (error) {
      this.authStore.getState().clearAuthData();
      throw error;
    }
  };

  postContacts = async (body: {
    name: string;
    email: string;
    text: string;
  }) => {
    return await axios.post(`${this.URl}contact_me`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  postComment = async (body: { comment_text: string }) => {
    const token = this.authStore.getState().accessToken;

    return await axios.post(`${this.URL_TOKEN}comments`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  postPoem = async (body: { poem_id: number }) => {
    const token = this.authStore.getState().accessToken;

    return await axios.post(`${this.URL_TOKEN}poems/pin`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  unPinPoem = async (body: { poem_id: number }) => {
    const token = this.authStore.getState().accessToken;

    return await axios.post(`${this.URL_TOKEN}poems/unpin`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // GET

  getComments = async () => {
    const { data } = await axios.get<PageCommentsType>(`${this.URl}comments`);

    return data.data;
  };

  getUserNotifications = async () => {
    const token = this.authStore.getState().accessToken;

    const { data } = await axios.get<NotificationsType>(
      `${this.URL_TOKEN}notifications`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  getUserComments = async () => {
    const token = this.authStore.getState().accessToken;

    const { data } = await axios.get<UserCommentsType>(
      `${this.URL_TOKEN}comments`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.comments;
  };

  getPinPoems = async () => {
    const token = this.authStore.getState().accessToken;

    const { data } = await axios.get<PinnedPoems>(
      `${this.URL_TOKEN}poems/pinned`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  getReviews = async () => {
    const { data } = await axios.get<Reviews>(`${this.URl}reviews`);

    return data;
  };

  getReviewsCategory = async () => {
    const { data } = await axios.get<ReviewsCategoryType>(
      `${this.URl}review_category`
    );

    return data.data;
  };

  getAbout = async () => {
    const { data } = await axios.get<AboutTypes>(`${this.URl}about_me`);

    return data;
  };

  getBooks = async () => {
    const { data } = await axios.get<BooksType>(`${this.URl}books`);

    return data;
  };

  getMoments = async () => {
    const { data } = await axios.get<MomentsType>(`${this.URl}moments`);

    return data;
  };

  getMomemntsSingle = async (id: string) => {
    const { data } = await axios.get<MomentsSingleType>(
      `${this.URl}moments/${id}`
    );

    return data;
  };

  getPoems = async () => {
    const { data } = await axios.get<PoemsType>(`${this.URl}poems`);

    return data;
  };

  getPoemsSingle = async (id: number | undefined) => {
    const { data } = await axios.get<PoemsType>(`${this.URl}poems/${id}`);

    return data;
  };

  getStatic = async (id: number) => {
    const { data } = await axios.get<StaticType>(
      `${this.URl}static_words_for_pages/${id}`
    );

    return data;
  };
}

export default new PoetService();
