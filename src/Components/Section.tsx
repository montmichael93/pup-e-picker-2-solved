import { ReactNode, createContext, useContext, useState } from "react";
import { ActiveComponent } from "../types";
import { useDogs } from "./Dogs";

type TSectionProvider = {
  favoredStatusOrForm: ActiveComponent;
  setFavoredStatusOrForm: (buttons: ActiveComponent) => void;
};

const SectionContext = createContext<TSectionProvider>({} as TSectionProvider);

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs } = useDogs();
  const [favoredStatusOrForm, setFavoredStatusOrForm] =
    useState<ActiveComponent>("all-dogs");

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              favoredStatusOrForm === "favored" ? "active" : ""
            }`}
            onClick={() => {
              favoredStatusOrForm === "favored"
                ? setFavoredStatusOrForm("all-dogs")
                : setFavoredStatusOrForm("favored");
            }}
          >
            favorited ({" "}
            {allDogs.filter((dog) => dog.isFavorite === true).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              favoredStatusOrForm === "unfavored" ? "active" : ""
            }`}
            onClick={() => {
              favoredStatusOrForm === "unfavored"
                ? setFavoredStatusOrForm("all-dogs")
                : setFavoredStatusOrForm("unfavored");
            }}
          >
            unfavorited ({" "}
            {allDogs.filter((dog) => dog.isFavorite === false).length} )
          </div>

          <div
            className={`selector ${
              favoredStatusOrForm === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              favoredStatusOrForm === "create-dog-form"
                ? setFavoredStatusOrForm("all-dogs")
                : setFavoredStatusOrForm("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        <SectionContext.Provider
          value={{ favoredStatusOrForm, setFavoredStatusOrForm }}
        >
          {children}
        </SectionContext.Provider>
      </div>
    </section>
  );
};

export const useSection = () => useContext(SectionContext);
