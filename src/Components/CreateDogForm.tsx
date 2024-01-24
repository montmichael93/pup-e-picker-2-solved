import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "./Provider";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { activeComponent, postDog } = useDogs();
    const wasTheFormSelected = activeComponent === "create-dog-form";
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    return (
      <>
        {wasTheFormSelected && (
          <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
              e.preventDefault();
              postDog({
                name: nameInput,
                description: descriptionInput,
                image:
                  selectedImage === "" ? dogPictures.BlueHeeler : selectedImage,
                isFavorite: false,
              })
                .then(() => {
                  setNameInput("");
                  setDescriptionInput("");
                  setSelectedImage("");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
              type="text"
              name="name"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              //disabled={isLoading}
            />
            <label htmlFor="description">Dog Description</label>
            <textarea
              name="description"
              cols={80}
              rows={10}
              value={descriptionInput}
              onChange={(e) => {
                setDescriptionInput(e.target.value);
              }}
              //disabled={isLoading}
            ></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
              id=""
              onChange={(e) => {
                setSelectedImage(e.target.value);
              }}
            >
              {Object.entries(dogPictures).map(([label, pictureValue]) => {
                return (
                  <option value={pictureValue} key={pictureValue}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="submit" />
          </form>
        )}
      </>
    );
  };
