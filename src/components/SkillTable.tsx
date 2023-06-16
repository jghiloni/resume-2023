import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Skill } from "../utils/models";

export interface SkillTableProps {
  skills: Skill[];
}

export function SkillTable(props: SkillTableProps) {
  const { skills } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", minHeight: "300px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "33%"}}>Name</TableCell>
            <TableCell sx={{width: "33%"}}>Level</TableCell>
            <TableCell sx={{width: "33%"}}>Period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.map((skill) => (
            <TableRow>
              <TableCell sx={{width: "33%"}}>{skill.name}</TableCell>
              <TableCell sx={{width: "33%"}}>{skill.experience}</TableCell>
              <TableCell sx={{width: "33%"}}>
                {skill.first_used}&mdash;
                {skill.last_used === 9999 ? "Present" : skill.last_used}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
