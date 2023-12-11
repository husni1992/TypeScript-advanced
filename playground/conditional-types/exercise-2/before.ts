type _Car = {
  make: string;
  model: string;
  mileage: number;
};

type _Truck = {
  make: string;
  payloadCapacity: number;
};

type _Motorbike = {
  make: string;
  type: string; // e.g., "Cruiser", "Sport"
};

type _Vehicle = _Car | _Truck | _Motorbike;

function _checkVehicle(vehicle: _Vehicle, userRole: string) {
  if (userRole === "Mechanic") {
    if ("mileage" in vehicle) {
      return `Car Make: ${vehicle.make}, Model: ${vehicle.model}, Mileage: ${vehicle.mileage}`;
    } else if ("payloadCapacity" in vehicle) {
      return `Truck Make: ${vehicle.make}, Payload Capacity: ${vehicle.payloadCapacity}`;
    } else {
      return `Motorbike Make: ${vehicle.make}, Type: ${vehicle.type}`;
    }
  } else if (userRole === "Driver") {
    return `Drive the ${vehicle.make}`;
  } else if (userRole === "Inspector") {
    return `Inspecting ${vehicle.make}`;
  }
  throw new Error("Invalid role");
}

// Example usage:
const myCar: _Car = {
  make: "Toyota",
  model: "Corolla",
  mileage: 20000,
};

console.log(_checkVehicle(myCar, "Mechanic"));
