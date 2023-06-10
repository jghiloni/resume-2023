// taken from https://mui.com/material-ui/react-tabs/

import { Box, Tab, Tabs } from "@mui/material";
import React, { useContext, useState } from "react";
import { ResumeContext } from "./Contexts";
import { Section } from "./Section";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ResumeContents() {
  const data = useContext(ResumeContext);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{borderBottom: 1, borderColor: "divider"}}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Sections">
          {
            data.sections?.map((section, index) => (
              <Tab label={section.name} {...a11yProps(index)} />
            ))
          }
        </Tabs>
      </Box>
      {
        data.sections?.map((section, index) => (<Section value={tabIndex} section={section} index={index} />))
      }
    </Box>
  )
}
