import {create} from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth';

//config, put cookies on to request header
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) =>({
    user: null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message: null,
    signup: async(email, password, name) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name})
            set({user:response.data.user, isAuthenticated:true, isLoading:false});//        } catch (error) {
            
        }
        catch(error){
            set({error: error.response.data.message || "Error signing up", isLoading:false})
            throw error;
        }
    },
    // login function
    login: async(email, password) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password})
            set({user:response.data.user, isAuthenticated:true, isLoading:false});//        } catch (error) {
            
        }
        catch(error){
            set({error: error.response.data.message || "Error signing up", isLoading:false})
            throw error;
        }
    },
    // logout
    logout: async () => {
        set({isLoading:true, error:null});
        try {
            await axios.post(`${API_URL}/logout`)
            set({user:null, isAuthenticated:false, error:null, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading:false})
            throw error;
        }
    },
    // verify email function
    verifyEmail: async(code) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{ code })
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading:false})
            throw error;
        }
    },
    // check auth check if authenticated or not
    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user:response.data.user, isAuthenticated:true,isCheckingAuth: false});
        } 
        catch (error) {
        console.error("checkAuth error:", error); 
        set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }

    },
forgotPassword: async (email) => {
  set({ isLoading: true, error: null, message: null });

  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    set({
      message: response.data.message, // optional if you want to show success
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    set({
      error: error.response?.data?.message || "Error sending reset password email"
    });
    throw error; // so your component can catch it
  } finally {
    set({ isLoading: false }); // ✅ Always stop loading!
  }
},

resetPassword: async(token, password) => {
       set({ isLoading: true, error: null });
       try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({message: response.data.message, isLoading: false });
       } catch (error) {
            set({
                error: error.response?.data?.message || "Error resetting password",
                isLoading: false
            });
            throw error; // so your component can catch it
       }
        finally {
         set({ isLoading: false }); // ✅ Always stop loading!
        }  
    }   
}));

