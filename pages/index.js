import { Button } from "@nextui-org/react";
import Login from "../components/Login.js";
import { useState } from "react";

export default function App() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true)

  return (
    <div>
      <Button auto color="gradient" shadow onClick={handler}>
        Login
      </Button>
      <Login state={visible} close={setVisible}/>
    </div>
  );
}