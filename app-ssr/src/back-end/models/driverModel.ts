export interface DriverPosition {
  lat: number;
  lng: number;
}

export interface Driver {
  driverId?: number | string;
  position?: DriverPosition;
  status?: 'available' | 'onRoute' | 'offline' | string; // optional, flexible
  vehicle?: string; // optional
  name?: string;    // optional
  route?: string;   // optional
  totalServices?: number;
  servicesCompleted?: number;
  timestamp?: number; // optional: epoch for update time
}
