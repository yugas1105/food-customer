import { Box } from "@mui/material";
import "./App.css";
import Footer from "./componants/Footer";
import MyAppBar from "./componants/MyAppBar";
import MyRoutes from "./componants/MyRoutes";
import { CssBaseline, GlobalStyles } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { overflowX: "hidden" },
          body: { overflowX: "hidden", margin: 0, padding: 0 },
        }}
      />
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
