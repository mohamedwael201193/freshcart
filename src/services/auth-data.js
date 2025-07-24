import { apiclinet } from "./api-clinet";

export async function sendDataToSignup(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/signup`,
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone,
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendDataToLogin(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/signin`,
      data: {
        email: values.email,
        password: values.password,
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function sendDataToForgotPassword(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/forgotPasswords`,
      data: {
        email: values.email,
        
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function sendDataToVerifyResetCode(values) {
  try {
    const options = {
      method: "POST",
      url: `/auth/verifyResetCode`,
      data: {
        resetCode: values.resetCode,
        
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function resetPassword(values) {
  try {
    const options = {
      method: "PUT",
      url: `/auth/resetPassword`,
      data: {
        email: values.email,
        newPassword: values.newPassword,
        
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

