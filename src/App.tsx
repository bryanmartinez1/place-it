import React, { useState, createContext, useContext } from "react";
import "./App.css";
import TopBar from "./components/bars/Topbar";

interface AppContextType {
  addElement: (Component: React.ReactElement) => void;
  children: React.ReactElement[];
  setChildren: React.Dispatch<React.SetStateAction<React.ReactElement[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext.Provider");
  }
  return context;
};

function App() {
  const [children, setChildren] = useState<React.ReactElement[]>([]);

  const addElement = (Component: React.ReactElement) => {
    const id = Component.props.id;
    setChildren((prevChildren) => [
      ...prevChildren,
      React.cloneElement(Component, { key: id }),
    ]);
  };

  return (
    <AppContext.Provider value={{ addElement, children, setChildren }}>
      <main>
        <TopBar />
        <div className="container">{children}</div>
      </main>
    </AppContext.Provider>
  );
}

export default App;

export { useAppContext };
