import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogProvider = {
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
  activeComponent: ActiveComponent;
  filteredDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
  postDog: (dog: Omit<Dog, "id">) => void;
  deleteDogRequest: (dogId: number) => void;
  patchFavoriteForDog: (dogIdNumber: number, favoriteStatus: boolean) => void;
};

const DogsContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all-dogs");

  useEffect(() => {
    //this function gets called whenever anything inside of b changes
    Requests.getAllDogs()
      .then(setAllDogs)
      .catch((error) => {
        console.log(error);
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
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => {
        setAllDogs(addTheNewDog);
      })
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        toast.success("Dog Created!");
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDogRequest = (dogId: number) => {
    setAllDogs(allDogs.filter((dog) => dogId != dog.id));
    Requests.deleteDogRequest(dogId)
      .then((response) => {
        if (!response) {
          setAllDogs(allDogs);
        } else return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const patchFavoriteForDog = (
    dogIdNumber: number,
    favoriteStatus: boolean
  ) => {
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
        console.log(error);
      });
  };

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
  const filteredDogs = ((): Dog[] => {
    switch (activeComponent) {
      case "all-dogs":
        return allDogs;
      case "create-dog-form":
        return [];
      case "favored":
        return favoritedDogs;
      case "unfavored":
        return unfavoritedDogs;
    }
  })();

  return (
    <DogsContext.Provider
      value={{
        favoritedDogs,
        unfavoritedDogs,
        isLoading,
        activeComponent,
        filteredDogs,
        setAllDogs,
        setActiveComponent,
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
