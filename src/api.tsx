import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  // fill out method
  return fetch(`${baseUrl}/dogs`).then((response) => response.json());
};

const postDog = (dog: Omit<Dog, "id">) => {
  // fill out method
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const deleteDogRequest = (dogId: number) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const patchFavoriteForDog = (dogId: number, isFavored: boolean) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    body: JSON.stringify({ isFavorite: isFavored }),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
