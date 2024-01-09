function genericDataFilter<T>(items: T[], predicate: (item: T) => boolean) {
  return items.filter(predicate);
}

type UserType = {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
};

const users: UserType[] = [
  {
    _id: "65995a123534c1cfa426479f",
    name: "Jamie Reese",
    age: 32,
    email: "jamiereese@quotezart.com",
    phone: "+1 (804) 557-3519",
  },
  {
    _id: "65995a12452a0443a7c4ed66",
    name: "Alyson Adkins",
    age: 33,
    email: "alysonadkins@quotezart.com",
    phone: "+1 (933) 502-2607",
  },
  {
    _id: "65995a121b5ad253dd2a6f27",
    name: "Chasity Valenzuela",
    age: 39,
    email: "chasityvalenzuela@quotezart.com",
    phone: "+1 (991) 538-3735",
  },
  {
    _id: "65995a12717758b838b00e63",
    name: "Garza Hess",
    age: 22,
    email: "garzahess@quotezart.com",
    phone: "+1 (847) 447-2849",
  },
];

const filteredUsers = genericDataFilter(users, (item: any) => item.age > 33);

export {};
