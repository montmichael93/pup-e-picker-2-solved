// Right now these dogs are constant, but in reality we should be getting these from our server

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogProvider = {
  allDogs: Dog[];
  isLoading: boolean;
  postDog: (dog: Omit<Dog, "id">) => void;
  deleteDogRequest: (dogId: number) => void;
  patchFavoriteForDog: (dogIdNumber: number, favoriteStatus: boolean) => void;
};

const DogsContext = createContext<TDogProvider>({} as TDogProvider);
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = ({ children }: { children: ReactNode }) =>
  // no props allowed
  {
    const [allDogs, setAllDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      //this function gets called whenever anything inside of b changes
      Requests.getAllDogs()
        .then(setAllDogs)
        .catch((error) => {
          alert(error);
        });
    }, []);

    const postDog = (dog: Omit<Dog, "id">) => {
      setIsLoading(true);
      const maxId = allDogs.map((dogs) => dogs.id).slice(-1)[0];

      const newDog: Dog = {
        id: maxId + 1,
        ...dog,
      };
      const addTheNewDog = [...allDogs, newDog];
      setAllDogs(addTheNewDog);
      Requests.postDog(dog)
        .then((response) => {
          if (!response) {
            setAllDogs(allDogs);
          } else return;
        })
        .then(() => {
          toast.success("Dog Created!");
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => setIsLoading(false));
    };

    const deleteDogRequest = (dogId: number) => {
      setIsLoading(true);
      setAllDogs(allDogs.filter((dog) => dogId != dog.id));
      Requests.deleteDogRequest(dogId)
        .then((response) => {
          if (!response) {
            setAllDogs(allDogs);
          } else return;
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => setIsLoading(false));
    };

    const patchFavoriteForDog = (
      dogIdNumber: number,
      favoriteStatus: boolean
    ) => {
      setIsLoading(true);
      setAllDogs(
        allDogs.map((dog) =>
          dog.id === dogIdNumber ? { ...dog, isFavorite: !favoriteStatus } : dog
        )
      );
      Requests.patchFavoriteForDog(dogIdNumber, !favoriteStatus)
        .then((response) => {
          if (!response.ok) {
            setAllDogs(allDogs);
          } else return;
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => setIsLoading(false));
    };

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <DogsContext.Provider
        value={{
          allDogs,
          isLoading,
          postDog,
          deleteDogRequest,
          patchFavoriteForDog,
        }}
      >
        {children}
      </DogsContext.Provider>
    );
  };

export const useDogs = () => useContext(DogsContext);
