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
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  isLoading: boolean;
  favoredStatusOrForm: ActiveComponent;
  setFavoredStatusOrForm: Dispatch<SetStateAction<ActiveComponent>>;
  postDog: (dog: Omit<Dog, "id">) => void;
  deleteDogRequest: (dogId: number) => void;
  patchFavoriteForDog: (dogIdNumber: number, favoriteStatus: boolean) => void;
};

const DogsContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading] = useState(false);
  const [favoredStatusOrForm, setFavoredStatusOrForm] =
    useState<ActiveComponent>("all-dogs");

  useEffect(() => {
    //this function gets called whenever anything inside of b changes
    Requests.getAllDogs()
      .then(setAllDogs)
      .catch((error) => {
        alert(error);
      });
  }, []);

  const postDog = (dog: Omit<Dog, "id">) => {
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
      });
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
        alert(error);
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
        alert(error);
      });
  };

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        setAllDogs,
        isLoading,
        favoredStatusOrForm,
        setFavoredStatusOrForm,
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
