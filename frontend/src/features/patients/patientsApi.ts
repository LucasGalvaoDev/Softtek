import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Patient = { id: string; nome: string; dataNascimento: string };
export type CreatePatient = { nome: string; dataNascimento: string };

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], string | void>({
      query: (name) => `/api/pacientes${name ? `?nome=${encodeURIComponent(name)}` : ""}`,
      providesTags: ["Patients"],
    }),
    addPatient: builder.mutation<Patient, CreatePatient>({
      query: (body) => ({
        url: "/api/pacientes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Patients"],
    }),
  }),
});

export const { useGetPatientsQuery, useAddPatientMutation } = patientsApi;
