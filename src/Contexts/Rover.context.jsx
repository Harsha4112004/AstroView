// context/FormContext.jsx
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function RoverProvider({ children }) {
  const [date, setDate] = useState(null);
  const [camera, setCamera] = useState("");

  return (
    <FormContext.Provider value={{ date, setDate, camera, setCamera }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook for convenience
export function useFormData() {
  return useContext(FormContext);
}
