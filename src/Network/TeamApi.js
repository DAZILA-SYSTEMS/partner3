import { fetchTeams } from "../reducers/TeamSlice";
import { ApiUrl } from "./Urls";

export const FetchTeam = (User, dispatch) => {
  return fetch(`${ApiUrl}/team/get`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${User.token}`,
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchTeams([...res.data]));
      }
    })
    .catch((err) => {
      return { status: "error" };
    });
};
