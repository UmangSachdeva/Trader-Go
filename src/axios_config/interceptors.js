import axios from "axios";

// Create a private Axios instance with an interceptor that adds and checks for tokens
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_API,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosPrivate.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    console.log("access_token", accessToken);
    if (!accessToken) {
      return Promise.reject({
        response: {
          status: 403,
          data: "No access token provided",
        },
      });
    }
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.response;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem("refresh_token"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        console.log("refresh_token", refreshToken);
        const response = await axios.post(
          `${import.meta.env.VITE_DJANGO_API}/users/refresh/`,
          {
            refresh: refreshToken,
          }
        );
        const { access: access_token } = response.data;
        console.log(response.data);
        console.log("access_token", access_token);
        // Store the new access and refresh tokens.
        localStorage.setItem("access_token", access_token);

        // localStorage.setItem("refresh_token", newRefreshToken);
        // Update the authorization header with the new access token.
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return axiosPrivate(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // window.location.href =
        // redirect("/login");
        return Promise.reject(refreshError);
      }
    }
    console.log(error);
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

// Create a public Axios instance without an interceptor that adds and checks for tokens
export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// function refreshToken() {
//   if (refreshTokenPromise) {
//     return refreshTokenPromise;
//   }

//   const refreshToken = localStorage.getItem("refresh_token");
//   if (!refreshToken) {
//     return Promise.reject(new Error("No refresh token"));
//   }

//   refreshTokenPromise = axiosPublic
//     .post("users/refresh/", {
//       refresh_token: refreshToken,
//     })
//     .then((response) => {
//       const newAccessToken = response.data.access_token;
//       localStorage.setItem("access_token", newAccessToken);
//       return newAccessToken;
//     })
//     .catch((error) => {
//       refreshTokenPromise = null;
//       throw error;
//     });

//   return refreshTokenPromise;
// }
