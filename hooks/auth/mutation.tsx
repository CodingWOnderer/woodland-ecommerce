import { apiRequest } from "@/config/request";
import { setCookieAsync } from "@/lib/cookies/cookies";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { z } from "zod";

const verifyGuestLoginSchema = z.object({
  credential: z.string().regex(/^\+91\d{10}$/, "Invalid phone number"),
  circleName: z.string(),
  otp: z.string().length(6, "OTP should be 6 digits"),
});

export type VerifyGuestLoginPayload = z.infer<typeof verifyGuestLoginSchema>;

const VERIFY_GUEST_LOGIN_URL = "/go-auth/verifyGuestLogin";
const AUTH_URL = "/go-auth/guestLogin";

const GuestLogin = async (
  data: Omit<VerifyGuestLoginPayload, "otp">
): Promise<ResponseModal<{ newRegistration: boolean }>> => {
  const response = await apiRequest.post<
    ResponseModal<{ newRegistration: boolean }>
  >(AUTH_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const verifyGuestLogin = async (
  data: VerifyGuestLoginPayload
): Promise<{ token: string }> => {
  const response = await apiRequest.post<{ token: string }>(
    VERIFY_GUEST_LOGIN_URL,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useAuthGuestLoginMutation = (): UseMutationResult<
  ResponseModal<{ newRegistration: boolean }>,
  unknown,
  Omit<VerifyGuestLoginPayload, "otp">,
  unknown
> => {
  return useMutation<
    ResponseModal<{ newRegistration: boolean }>,
    unknown,
    Omit<VerifyGuestLoginPayload, "otp">,
    unknown
  >({
    mutationKey: ["auth"],
    mutationFn: ({ circleName, credential }) =>
      GuestLogin({ credential, circleName }),
  });
};

export const useVerifyGuestLoginMutation = (): UseMutationResult<
  { token: string },
  unknown,
  VerifyGuestLoginPayload,
  unknown
> => {
  return useMutation<
    { token: string },
    unknown,
    VerifyGuestLoginPayload,
    unknown
  >({
    mutationKey: ["verifyauth"],
    mutationFn: ({ credential, circleName, otp }) =>
      verifyGuestLogin({ credential, circleName, otp }),
    onSuccess: (data) => setCookieAsync("token", data.token),
  });
};
