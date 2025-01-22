export const appconfig = {
  BASE_URL: import.meta.env.VITE_BASEURL,
  FONT_API: import.meta.env.VITE_FONT_KEY,
};

export const ApiEndPoints = {
  GET_CONSTANTS: "/constants/getConstants",
  LOGIN_USER: "/login",
  SIGNUP_USER: "/signup",
  UPDATE_BRANDING: "/branding/updateBranding",
  UPDATE_PROFILE: "/profile/updateProfile",
  GET_PROFILE: "/profile",
  GET_CONFIGURATION: "/configure/details",
  DELETE_SECTION: "/configure/remove",
  UPDATE_SECTION: "/configure/update",
  GET_ANALYTICS: "/analytics",
  BOOK: "/book",
};

export const returnHeader = (
  isToken,
  isContentTypeFormData,
  isContentTypeFormUrlEncoded
) => {
  let headers;
  if (isContentTypeFormData) {
    headers = { "content-type": "multipart/form-data" };
  } else if (isContentTypeFormUrlEncoded) {
    headers = { "content-type": "application/x-www-form-urlencoded" };
  } else {
    headers = { "content-type": "application/json" };
  }

  headers["Instanceid"] = appconfig.INSTANCE_ID;
  if (isToken) {
    let token = sessionStorage.getItem("token");

    if (!token) {
      token = sessionStorage.getItem("authToken");
    }
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  }
  return headers;
};
