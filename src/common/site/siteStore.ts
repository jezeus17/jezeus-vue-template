import { defineStore } from "pinia";
import { useSendRequest } from "../http/fetch";
import { reactive } from "vue";
import useEvents from "../composables/useEvents";
import TokenHandler from "./token-handler";
import { sendRequest } from "@/common/http/sendRequest";
import { useLocalI18n } from "../composables/useLocalI18n";

const localMessages = {
  es: {
    "close-session": {
      header: "Salir",
      message: "¿Desea cerrar sesión?",
    },
    login: {
      error: "Credenciales incorrectas",
      something_wrong: "Algo ha salido mal",
    },
  },
  en: {
    "close-session": {
      header: "Logout",
      message: "Do you want to log out?",
    },
    login: {
      error: "Invalid credentials",
      something_wrong: "Something went wrong",
    },
  },
};

export const siteStore = defineStore("site", {
  actions: {
    getUserInLocal() {
      let user;
      try {
        const userStorage = localStorage.getItem("user");
        if (userStorage) user = JSON.parse(userStorage);
        else throw new Error("Not Authenticated");
      } catch (err) {
        console.log(err);
      }

      return user;
    },

    async loadUser() {
      const token: string | null = TokenHandler.getToken();
      let user;
      try {
        if (token) {
          user = await sendRequest({
            url: `me`,
          });
          user.group_owner = await this.getGroupOwner(user.groups[0].id_group)
          localStorage.setItem("user", JSON.stringify(user));
        } else throw new Error("Not Authenticated");
      } catch (err) {
        console.log(err);
      }

      return user;
    },
    async getGroupOwner(group_id: number) {
      const token: string | null = TokenHandler.getToken();
      let owner;
      try {
        if (token) {
          const response =
            await sendRequest({
              url: `groups/parents/${group_id
                }`,
            })
          owner = response[0].id_group;
        } else throw new Error("Not Authenticated");
      } catch (err) {
        console.log(err);
      }

      return owner;
    },

    useLogin() {
      const t = useLocalI18n(localMessages);
      const request = useSendRequest();

      const loginRequestHandler = (async () => {
        if (!request.error.value) {
          console.log(request.result)
          if (request.result.value.groups) {

            useEvents().dispatch("login", {
              temporalToken: request.result.value.token,
              groups: request.result.value.groups,
            });
          } else {
            selectGroupRequestHandler(request.result.value)
          }
        } else {
          useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t(
              [401, 400].includes(request.status.value)
                ? "login.error"
                : "login.something_wrong"
            ),
            life: 3000,
          });
        }
      }).bind(this);

      const selectGroupRequestHandler = (async (response: { token: string, refresh_token: string }) => {
        if (!request.error.value) {
          TokenHandler.storeToken(response.token);
          TokenHandler.storeRefreshToken(response.refresh_token);

          const user = await this.loadUser();
          //userStore().$patch(user);
          const id_test_from_local = localStorage.getItem("id_test")
          const user_test_from_local = localStorage.getItem("user_test")
          let id_test = null
          let user_test = null
          if (id_test_from_local && user_test_from_local) {
            id_test = JSON.parse(id_test_from_local);
            user_test = JSON.parse(user_test_from_local);
          }

          // if (id_test && user_test == userStore().user_id) {
          //   useEvents().dispatch("redirect", "select-test/");
          // } else {
          //   useEvents().dispatch("redirect", "/");
          // }
        } else {
          useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t("login.something_wrong"),
            life: 3000,
          });
        }
      }).bind(this);

      function login(credentials: { email: string, password: string }) {
        request.sendRequest(
          `login`,
          credentials,
          "POST",
          loginRequestHandler
        );
      }
      function selectGroup(group: number, temporalToken: string) {
        request.sendRequest(
          `select_group/${group}`,
          {},
          "GET",
          () => selectGroupRequestHandler(request.result.value),
          temporalToken
        );
      }

      return reactive({ loading: request.loading, login, selectGroup, selectGroupRequestHandler });
    },

    logout() {
      const t = useLocalI18n(localMessages);

      useEvents().dispatch("confirm", {
        message: t("close-session.message"),
        header: t("close-session.header"),

        accept: () => {
          //userStore().$reset();
          localStorage.removeItem("user");
          TokenHandler.removeRefreshToken();
          TokenHandler.removeToken();
          useEvents().dispatch("redirect", "/login");
        },
      });
    },
  },
});
