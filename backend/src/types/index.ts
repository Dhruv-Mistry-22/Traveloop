export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ITrip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  budget: number;
}

export interface IStop {
  id: string;
  tripId: string;
  city: string;
  country: string;
  order: number;
  startDate: Date;
  endDate: Date;
}

export interface IActivity {
  id: string;
  stopId: string;
  title: string;
  description?: string;
  category: string;
  cost: number;
  duration: number;
}

export interface IExpense {
  id: string;
  userId: string;
  tripId: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}
