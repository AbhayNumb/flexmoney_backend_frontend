import React from "react";
import Form from "./Form"; // Replace with the correct path to your Form component file
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const App = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Form />
    </AlertProvider>
  );
};

export default App;
