import { tenants, rooms } from "./mockData";

export const fetchTenants = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tenants), 500); // simulate 0.5s delay
  });
};

export const fetchRooms = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(rooms), 500);
  });
};
