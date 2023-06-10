import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import orderBy from "lodash.orderby";
import { useState } from "react";
import { Skill } from "../utils/models";

export interface SkillTableProps {
  skills: Skill[];
}

const sortedExperiences = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
  "Out of Practice": 4,
};

export function SkillTable(props: SkillTableProps) {
  const [skills, setSkills] = useState<Skill[]>(props.skills);

  const handleSort = (col: string, asc: boolean) => {
    let sorter: any = col;
    if (col === "experience") {
      sorter = (row: Skill) => sortedExperiences[row.experience];
    }
    return () => {
      setSkills(orderBy(skills, sorter, asc ? "asc" : "desc"));
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", minHeight: "300px" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              Name{" "}
              <IconButton onClick={handleSort("name", true)}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleSort("name", false)}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </TableCell>
            <TableCell>
              Experience{" "}
              <IconButton onClick={handleSort("experience", true)}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleSort("experience", false)}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </TableCell>
            <TableCell>
              First Used{" "}
              <IconButton onClick={handleSort("first_used", true)}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleSort("first_used", false)}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </TableCell>
            <TableCell>
              Last Used{" "}
              <IconButton onClick={handleSort("last_used", true)}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleSort("last_used", false)}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.map((skill) => (
            <TableRow>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.experience}</TableCell>
              <TableCell>{skill.first_used}</TableCell>
              <TableCell>
                {skill.last_used === 9999 ? "Currently Using" : skill.last_used}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
