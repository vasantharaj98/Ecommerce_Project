import axios from "axios";

const API_URL = process.env.REACT_APP_ECOMMERCE_API_URL;

const register = (mobile_number) => {
  return axios.post(API_URL + "customer/signuplogin", {
    phone : mobile_number
  });
};

const login = async (mobile_number, otp) => {
  const response = await axios
    .post(API_URL + "customer/verifyotp", {
      phone: mobile_number,
      phoneOtp: otp,
    });
    console.log(response);
  if (response.data.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;