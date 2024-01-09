type ApiResponse<DataType> = {
  ok: boolean;
  data?: DataType;
  error?: string;
};

type ExtractApiResponseData<T extends ApiResponse<any>> = T extends ApiResponse<infer DataType>
  ? DataType
  : never;

function processApiResponse<T extends ApiResponse<any>>(response: T): ExtractApiResponseData<T> {
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
const mockApiResponse: ApiResponse<UserData> = {
  ok: true,
  data: {
    user: {
      id: "007",
      name: "Husny Ahamed",
    },
  },
};

const userData = processApiResponse(mockApiResponse);
userData.user.name // now userData is strongly typed

export {};
