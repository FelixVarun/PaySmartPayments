import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supabase/supabaseService';

interface AuthState {
  user: any;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: any, { rejectWithValue }) => {
   

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {

      return rejectWithValue(error.message);
    }

    return data.user;
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: any, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) return rejectWithValue(error.message);

    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {

    const { error } = await supabase.auth.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }

    return true;
  }
);





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
     updateUser: (state, action) => {
    if (state.user) {
      state.user = {
        ...state.user,
        user_metadata: {
          ...state.user.user_metadata,
          full_name: action.payload,
        },
      };
    }
  },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
  state.loading = true;
})
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
})

      .addCase(registerUser.pending, (state) => {
  state.loading = true;
})
        .addCase(registerUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(registerUser.rejected, (state) => {
  state.loading = false;
})
.addCase(logoutUser.pending, (state) => {
  state.loading = true;
})
.addCase(logoutUser.fulfilled, (state) => {
  state.loading = false;
  state.user = null;
})
.addCase(logoutUser.rejected, (state, action) => {
  state.loading = false;
});

  },
});

export const { logout,setUser,updateUser   } = authSlice.actions;
export default authSlice.reducer;
