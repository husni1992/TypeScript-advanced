export namespace InternalProject {
  export interface Ticket {
    d: number;
    title: string;
    description: string;
    priority: string;
  }

  export function test() {}
}

export namespace CustomerSupport {
  export type Ticket = {
    id: number;
    customerName: string;
    issueDetails: string;
    resolutionStatus: string;
  };
}
