enum UserType {
  Driver = "Driver",
  Inspector = "Inspector",
  Mechanic = "Mechanic",
}

type Car = {
  noOfDoors: number;
  make: string;
  mileage: number;
};

type Truck = {
  make: string;
  payloadCapacity: number;
  mileage: number;
};

type Motorbike = {
  make: string;
  type: string; // e.g., "Cruiser", "Sport"
  mileage: number;
};

type Vehicle = Car | Truck | Motorbike;

type MechanicData<V extends Vehicle> = V;

type DriverData<V extends Vehicle> = V extends Car
  ? Pick<Car, "noOfDoors" | "make">
  : V extends Truck
    ? Pick<Truck, "make" | "payloadCapacity">
    : V extends Motorbike
      ? Pick<Motorbike, "make" | "type">
      : never;

type InspectorData<V extends Vehicle> = V extends Car
  ? Pick<Car, "make">
  : V extends Truck
    ? Pick<Truck, "make">
    : V extends Motorbike
      ? Pick<Motorbike, "make">
      : never;

type DataByVehicleAndUser<V extends Vehicle, U extends UserType> = U extends UserType.Mechanic
  ? V
  : U extends UserType.Driver
    ? DriverData<V>
    : U extends UserType.Inspector
      ? InspectorData<V>
      : never;

function isCar(vehicle: Vehicle): vehicle is Car {
  return (vehicle as Car).noOfDoors !== undefined;
}

function isTruck(vehicle: Vehicle): vehicle is Truck {
  return (vehicle as Truck).payloadCapacity !== undefined;
}

function isMotorBike(vehicle: Vehicle): vehicle is Motorbike {
  return (vehicle as Motorbike).type !== undefined;
}

function checkVehicle(vehicle: Vehicle, userType: UserType) {
  if (userType === UserType.Mechanic) {
    if (isCar(vehicle)) {
      return {
        noOfDoors: vehicle.noOfDoors,
        make: vehicle.make,
        mileage: vehicle.mileage,
      };
    }

    if (isTruck(vehicle)) {
      return {
        make: vehicle.make,
        payloadCapacity: vehicle.payloadCapacity,
        mileage: vehicle.mileage,
      };
    }

    if (isMotorBike(vehicle)) {
      return {
        make: vehicle.make,
        type: vehicle.type,
        mileage: vehicle.mileage,
      };
    }
  }

  if (userType === UserType.Driver) {
    if (isCar(vehicle)) {
      return {
        noOfDoors: vehicle.noOfDoors,
        make: vehicle.make,
      };
    }

    if (isTruck(vehicle)) {
      return {
        make: vehicle.make,
        payloadCapacity: vehicle.payloadCapacity,
      };
    }

    if (isMotorBike(vehicle)) {
      return {
        make: vehicle.make,
        type: vehicle.type,
      };
    }
  }

  if (userType === UserType.Inspector) {
    return {
      make: vehicle.make,
    };
  }

  throw new Error("Invalid userType");
}

function getVehicleData<V extends Vehicle, U extends UserType>(
  vehicle: V,
  userType: U,
): DataByVehicleAndUser<V, U> {
  return checkVehicle(vehicle, userType) as DataByVehicleAndUser<V, U>;
}

const carMock: Car = {
  noOfDoors: 4,
  make: "Toyota",
  mileage: 30.5,
};

const truckMock: Truck = {
  make: "Ford",
  payloadCapacity: 5000,
  mileage: 12.2,
};

const motorbikeMock: Motorbike = {
  make: "Harley-Davidson",
  type: "Cruiser",
  mileage: 45.8,
};

const Inspector = getVehicleData(carMock, UserType.Inspector);
const Mechanic = getVehicleData(carMock, UserType.Mechanic);
const Driver = getVehicleData(carMock, UserType.Driver);
console.log("car", { Inspector, Mechanic, Driver });

const i = getVehicleData(motorbikeMock, UserType.Inspector);
const m = getVehicleData(truckMock, UserType.Mechanic);
const d = getVehicleData(motorbikeMock, UserType.Driver);
console.log("truck", { Inspector: i, Mechanic: m, Driver: d });
