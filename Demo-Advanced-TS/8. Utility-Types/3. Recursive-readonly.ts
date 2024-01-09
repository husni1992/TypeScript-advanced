type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface UserXYZ {
  name: string;
  contact: {
    phone: string;
    email: string;
    address: {
      address1: string;
      houseNo: number;
    };
  };
}

const foo_11: DeepReadonly<UserXYZ> = {
  name: "Husa",
  contact: {
    email: "mgha123@gmail.com",
    phone: "+312222222",
    address: {
      address1: "1212",
      houseNo: 34,
    },
  },
};

foo_11.name = "Ahamed";

export {};
