import { CreateDogForm } from "./Components/CreateDogForm";
import { DogCard } from "./Components/DogCard";
import { Dogs, useDogs } from "./Components/Dogs";
import { Section, useSection } from "./Components/Section";
import { Dog } from "./types";

function DogsContainer() {
  const { allDogs, isLoading, deleteDogRequest, patchFavoriteForDog } =
    useDogs();
  const { favoredStatusOrForm } = useSection();

  const fixUrl = (url: string): string => {
    const matchResult = url.match(/\/src\//);
    if (matchResult !== null) {
      return url.replace(matchResult[0], "");
    }
    return url;
  };

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
  const filteredDogs = ((): Dog[] => {
    switch (favoredStatusOrForm) {
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
    <>
      {filteredDogs.map((dogEntry) => (
        <DogCard
          key={dogEntry.id}
          isLoading={isLoading}
          dog={{
            name: dogEntry.name,
            image: fixUrl(dogEntry.image),
            description: dogEntry.description,
            isFavorite: dogEntry.isFavorite,
            id: dogEntry.id,
          }}
          onTrashIconClick={() => {
            deleteDogRequest(dogEntry.id);
          }}
          onEmptyHeartClick={() => {
            patchFavoriteForDog(dogEntry.id, dogEntry.isFavorite);
          }}
          onHeartClick={() => {
            patchFavoriteForDog(dogEntry.id, dogEntry.isFavorite);
          }}
        />
      ))}
    </>
  );
}

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Dogs>
        <Section label={"Dogs: "}>
          <DogsContainer />
          <CreateDogForm />
        </Section>
      </Dogs>
    </div>
  );
}
