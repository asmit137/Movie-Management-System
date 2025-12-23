import { useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [tab, setTab] = useState(0);

  return (
    <Paper sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {tab === 0 && <Login />}
      {tab === 1 && <Register onSuccess={() => setTab(0)} />}
    </Paper>
  );
}
