// Right now these dogs are constant, but in reality we should be getting these from our server
import { useDogs } from "./Provider";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
const fixUrl = (url: string): string => {
  const matchResult = url.match(/\/src\//);
  if (matchResult !== null) {
    return url.replace(matchResult[0], "");
  }
  return url;
};

export const Dogs = () =>
  // no props allowed
  {
    const { filteredDogs, isLoading, deleteDogRequest, patchFavoriteForDog } =
      useDogs();

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
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
  };
