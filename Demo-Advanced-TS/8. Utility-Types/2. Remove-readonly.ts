// how to remove 'readonly' attributes from a type
type RemoveReadonly<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ReadonlyUser = {
  readonly name: string;
  address: {
    readonly line1: string;
    line2: string;
  };
};

const user1: RemoveReadonly<ReadonlyUser> = {
  name: "foo",
  address: {
    line1: "l1",
    line2: "l2"
  }
}


user1.name = "different name"