// initial.ts (non-type-safe version)

function makeWatchedObject(obj) {
  const eventHandlers = {};

  function on(eventName, callback) {
    if (!eventHandlers[eventName]) {
      eventHandlers[eventName] = [];
    }
    eventHandlers[eventName].push(callback);
  }

  const watchedObject = { ...obj };

  return {
    ...watchedObject,
    on,
  };
}

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", (newName) => {
  console.log(`firstName was changed to ${newName}!`);
});

person.on("ageChanged", (newAge) => {
  if (newAge < 0) {
    console.warn("Warning! Negative age");
  }
});

export {};
