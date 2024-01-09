function processApiResponse(response) {
  if (!response.ok) {
    throw new Error(response.error || "Unknown error");
  }

  if (response.data) {
    return response.data;
  }

  throw new Error("No data available");
}

type UserData = {
  user: {
    id: string;
    name: string;
  };
};

// response from the server
const mockApiResponse: any = {
  ok: true,
  data: {
    user: {
      id: "007",
      name: "Husny Ahamed",
    },
  },
};

const userData = processApiResponse(mockApiResponse);

export {};
