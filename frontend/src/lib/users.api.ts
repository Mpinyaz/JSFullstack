import type { User, UserFormData } from "@/types";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const usersApi = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/user`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  },

  // Get single user by ID
  getUser: async (id: string): Promise<User> => {
    try {
      const response = await axios.get<User>(`${API_BASE_URL}/user/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw error;
    }
  },

  // Create new user
  createUser: async (data: UserFormData): Promise<User> => {
    try {
      const response = await axios.post<User>(`${API_BASE_URL}/user`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.statusText ||
          "Failed to create user";
        throw new Error(message);
      }
      throw error;
    }
  },

  // Update user
  updateUser: async (id: string, data: UserFormData): Promise<User> => {
    try {
      const response = await axios.patch<User>(
        `${API_BASE_URL}/user/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("User not found");
        }
        const message =
          error.response?.data?.message ||
          error.response?.statusText ||
          "Failed to update user";
        throw new Error(message);
      }
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw error;
    }
  },
};
