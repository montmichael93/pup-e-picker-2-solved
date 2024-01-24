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
  const {
    favoritedDogs,
    unfavoritedDogs,
    activeComponent,
    setActiveComponent,
  } = useDogs();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeComponent === "favored" ? "active" : ""
            }`}
            onClick={() => {
              activeComponent === "favored"
                ? setActiveComponent("all-dogs")
                : setActiveComponent("favored");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeComponent === "unfavored" ? "active" : ""
            }`}
            onClick={() => {
              activeComponent === "unfavored"
                ? setActiveComponent("all-dogs")
                : setActiveComponent("unfavored");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>

          <div
            className={`selector ${
              activeComponent === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              activeComponent === "create-dog-form"
                ? setActiveComponent("all-dogs")
                : setActiveComponent("create-dog-form");
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
