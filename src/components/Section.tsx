// taken from https://mui.com/material-ui/react-tabs/

import { Box, Paper, Stack, Typography } from "@mui/material";
import { RenderStringish, RenderText, section } from "../utils/models";
import { SkillTable } from "./SkillTable";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function Section(props: {
  section: section;
  value: number;
  index: number;
}) {
  const { section, value, index } = props;
  return (
    <TabPanel value={value} index={index}>
      {section.items.map((item) => {
        const nodes: JSX.Element[] = [];
        if (item.header) {
          nodes.push(
            <Paper elevation={6} sx={{ padding: "12px" }}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                {item.header.map((hi, idx) => (
                  <Typography
                    variant="overline"
                    sx={{
                      textAlign:
                        idx === (item.header ?? []).length - 1
                          ? "right"
                          : "left",
                    }}
                  >
                    {RenderStringish(hi)}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          );
        }

        if (item.body) {
          if ("variant" in item.body) {
            nodes.push(RenderText(item.body));
          } else {
            nodes.push(<SkillTable skills={item.body} />);
          }
        }
        return <>{nodes}</>;
      })}
    </TabPanel>
  );
}
