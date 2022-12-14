import { useSession, signOut } from "next-auth/react";
import { Button, styled } from "@nextui-org/react";
import Login from "../components/Login.js";
import { useState } from "react";

export default function App() {
  const [visible, setVisible] = useState(false);
  const { data: session } = useSession();

  const handler = () => setVisible(true)
  const Box = styled('div', {
    size: '100%',
    dflex: 'center',
    minWidth: '100vw',
    minHeight: '100vh'
  });

  return (
    <Box>
      <Login state={visible} close={setVisible} />
      {session ?
        <Button auto color="gradient" shadow onClick={() => signOut()}>
          Logout
        </Button>
        : <Button auto color="gradient" shadow onClick={handler}>
          Login
        </Button>}
    </Box>
  );
}