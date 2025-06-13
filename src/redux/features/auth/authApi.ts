/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/constant/tagType.constant";


import { getEmail, setEmail, setToken, setVerifyEmail } from "@/helper/SessionHelper";
import { ErrorToast, SuccessToast } from "@/helper/ValidationHelper";
import { SetChangePasswordError, SetForgotError, SetLoginError, SetRegisterError, SetResetPasswordError, SetVerifyAccountError, SetVerifyAccountOtpError, SetVerifyOtpError } from "./authSlice";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({email}, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setVerifyEmail(email);
          SuccessToast("Please check you email");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          dispatch(SetRegisterError(message));
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
          const role = res?.data?.data?.user?.authId?.role;
          if (role === "USER" || role === "EMPLOYER") {
            SuccessToast("Login Success");
            setToken(token);
            setTimeout(() => {
             window.location.href = "/";
            }, 300);
          } else {
            dispatch(SetLoginError("You are admin"));
          }
        } catch (err: any) {
          const message = err?.error?.data?.message;
          dispatch(SetLoginError(message));
        }
      },
    }),
    forgotPasswordSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Cannot read properties of null (reading 'email')"){
            dispatch(SetForgotError("Couldn't find this email address"))
          }
          else{
            dispatch(SetForgotError(message))
          }
        }
      },
    }),
    forgotPasswordResendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-resend",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Cannot read properties of null (reading 'email')"){
            ErrorToast("Couldn't find this email address");
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Otp is verified successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          dispatch(SetVerifyOtpError(message));
        }
      },
    }),
    forgotPasswordReset: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password?email=${getEmail()}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is reset successfully!");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
          }, 300);
        } catch (err: any) {
          const message = err?.error?.data?.message;
          dispatch(SetResetPasswordError(message));
        }
      },
    }),
    changeStatus: builder.mutation({
      query: (data) => ({
        url: `/auth/block`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.users];
        }
        return [];
      },
      async onQueryStarted({is_block}, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`User is ${is_block ? "blocked" : "activated"} successfully`)
        } catch (err:any) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is updated successfully");
          setTimeout(() => {
            localStorage.clear()
            window.location.href = "/login";
          }, 300);
        } catch (err:any) {
          const message = err?.error?.data?.message;
          if(message === "password is incorrect"){
            dispatch(SetChangePasswordError("Wrong Current Password"))
          }else{
            dispatch(SetChangePasswordError(message))
          }
        }
      },
    }),
    verifyAccountSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/active-resend",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setVerifyEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Cannot read properties of null (reading 'email')"){
            dispatch(SetVerifyAccountError("Couldn't find this email address"))
          }
          else{
            dispatch(SetVerifyAccountError(message));
          }
        }
      },
    }),
    verifyAccountResendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/active-resend",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          setVerifyEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Cannot read properties of null (reading 'email')"){
            ErrorToast("Couldn't find this email address");
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    verifyAccountVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/activate-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Account is verified successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          dispatch(SetVerifyAccountOtpError(message));
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordSendOtpMutation,
  useForgotPasswordVerifyOtpMutation,
  useForgotPasswordResetMutation,
  useChangeStatusMutation,
  useChangePasswordMutation,
  useVerifyAccountSendOtpMutation,
  useVerifyAccountResendOtpMutation,
  useVerifyAccountVerifyOtpMutation
} = authApi;
