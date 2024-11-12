import { login } from "../reducers/AuthSlice";
import { ApiUrl } from "./Urls";

export const CheckLiveUser = (logger) => {
  return fetch(`${ApiUrl}/auth/check`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      logger,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 404) {
        return "login";
      } else {
        return "register";
      }
    })
    .catch((err) => {
      return 0;
    });
};

export const RegisterUser = (
  logger,
  password,
  linker,
  trace,
  Phone,
  Country,
  Name,
  teamId
) => {
  return fetch(`${ApiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      logger,
      password,
      linker,
      trace,
      phone: Phone,
      country: Country,
      name: Name,
      teamId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      console.log(err);
      return { status: "error" };
    });
};

export const ForgotPassword = (logger) => {
  return fetch(`${ApiUrl}/auth/forgot`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      logger,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      return { status: "error" };
    });
};

export const ResetPasswordApi = (logger, reset, password) => {
  return fetch(`${ApiUrl}/auth/reset`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      logger,
      reset,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      return { status: "error" };
    });
};

export const LiveLogIn = (logger, password) => {
  return fetch(`${ApiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      logger,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      return { status: "error" };
    });
};

export const EditLiveUser = (User, newName, phone, trace, dispatch) => {
  return fetch(`${ApiUrl}/auth/edit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${User.token}`,
    },
    body: JSON.stringify({
      name: newName,
      trace,
      phone: phone,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        dispatch(
          login({
            ...res.user,
            name: res.user.name,
            password: User.password,
            trace,
          })
        );
      }
    })
    .catch((err) => {
      return { status: "error" };
    });
};
