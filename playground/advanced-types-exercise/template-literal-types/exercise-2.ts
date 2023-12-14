type PropEventSource2<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};

function makeWatchedObjectV2<Type>(obj: Type): Type & PropEventSource2<Type> {
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
