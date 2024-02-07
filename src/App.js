import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import { useState, useEffect } from "react";
import SearchPage from "./Components/SearchPage";
import StarredPage from "./Components/StarredPage";
import "./App.css";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Search Page" />
          <Tab label="Starred Page" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <SearchPage/>
        )}
        {tabIndex === 1 && (
         <StarredPage/>
        )}
      </Box>
    </Box>
  );
}

export default App;
