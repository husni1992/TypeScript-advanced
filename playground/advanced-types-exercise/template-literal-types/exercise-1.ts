function removeChangedFromEnd(input: string) {
  // Check if the input ends with "Changed"
  if (input.endsWith("Changed")) {
    // Remove the last 7 characters (i.e., "Changed")
    return input.substring(0, input.length - 7);
  }
  // Return the input unchanged if it doesn't end with "Changed"
  return input;
}

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};

function makeWatchedObject<Type extends Record<any, any>>(
  baseObject: Type,
): Type & PropEventSource<Type> {
  return {
    ...baseObject,
    on: function (eventName: string, callback: Function) {
      const keyOfChangedProp = removeChangedFromEnd(eventName);

      callback(baseObject[keyOfChangedProp]);
    },
  };
}

const person = makeWatchedObject({
  firstName: "Husny Ahamed",
  lastName: "Mohomed Gazzali",
  age: 31,
});

// based on the eventType, the type of the callback argument is inferred, can feel like magic
person.on("ageChanged", (newLastName) => {
  console.log("callback run", typeof newLastName, newLastName);
});
