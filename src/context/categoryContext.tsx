import React, { createContext, useState } from "react";

export const CategoryContext = createContext({
  category: "",
  setCategory: (value) => {},
});

const CategoryContextProvider = (props) => {
  const [filter, setFilter] = useState("");
  return (
    <CategoryContext.Provider
      value={{
        category: filter,
        setCategory: setFilter,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
