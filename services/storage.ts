interface User {
  userName: string;
  id: string;
  accessToken: string;
  role: string;
}

class Store {
  static user: User = {
    userName: "",
    id: "",
    role: "",
    accessToken: "",
  };

  saveUser(user: User) {
    Store.user = user;
  }

  saveToken(token: string) {
    Store.user.accessToken = token;
  }

  token() {
    return Store.user.accessToken;
  }

  user() {
    return Store.user;
  }

  clear() {
    Store.user = {
      userName: "",
      id: "",
      role: "",
      accessToken: "",
    };
  }
}

export const storage = new Store();
