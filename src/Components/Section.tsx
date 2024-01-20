import { ReactNode } from "react";

import { useDogs } from "./Provider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, favoredStatusOrForm, setFavoredStatusOrForm } = useDogs();

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
      <div className="content-container">{children}</div>
    </section>
  );
};
