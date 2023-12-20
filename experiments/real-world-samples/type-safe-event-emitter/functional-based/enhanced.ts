// feature #12 Literal Types enable string values as valid return types
// feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety
// feature #21 Template Literals used for defining types and string interpolation within backticks (`)

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};

function makeWatchedObjectV2<Type>(obj: Type): Type & PropEventSource<Type> {
  const eventHandlers: Record<string, Function[]> = {};

  function on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ) {
    if (!eventHandlers[eventName]) {
      eventHandlers[eventName] = [];
    }
    eventHandlers[eventName].push(callback);
  }

  const watchedObject = { ...obj } as Type;

  return {
    ...watchedObject,
    on,
  };
}

const _person = makeWatchedObjectV2({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

_person.on("firstNameChanged", (newName) => {
  console.log(`firstName was changed to ${newName}!`);
});

_person.on("ageChanged", (newAge) => {
  if (newAge < 0) {
    console.warn("Warning! Negative age");
  }
});

export {};
