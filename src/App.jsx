import { Box } from "@mui/material";
import "./App.css";
import Footer from "./componants/Footer";
import MyAppBar from "./componants/MyAppBar";
import MyRoutes from "./componants/MyRoutes";

function App() {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <MyAppBar />

        {/* Main content area */}
        <Box flex="1">
          <MyRoutes />
        </Box>

        {/* Sticky footer */}
        <Footer />
      </Box>
    </>
  );
}

export default App;
