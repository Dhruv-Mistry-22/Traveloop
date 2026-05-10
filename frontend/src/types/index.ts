// Frontend Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  stops?: Stop[];
}

export interface Stop {
  id: string;
  tripId: string;
  city: string;
  country: string;
  order: number;
  startDate: Date;
  endDate: Date;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  stopId: string;
  title: string;
  description?: string;
  category: string;
  cost: number;
  duration: number;
  startTime?: Date;
}

export interface Expense {
  id: string;
  userId: string;
  tripId: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
