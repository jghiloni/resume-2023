import { Link } from "@mui/material";

interface resumeData {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  sections: Array<section>;
}

interface link {
  href: string;
  text: string;
}

type stringish = string | link;

type line = string | Array<stringish>;

interface text {
  variant: "paragraph" | "lines" | "list";
  text: line | line[];
}

export interface Skill {
  name: string;
  first_used: number;
  last_used: number;
  experience:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Expert"
    | "Out of Practice";
}

interface sectionItem {
  header?: Array<stringish>;
  body: text | Array<Skill>;
}

export interface section {
  name: string;
  items: Array<sectionItem>;
}

export type ResumeData = Partial<resumeData>;

export function RenderStringish(s: stringish) {
  if (s === undefined) {
    return <></>;
  }

  if (typeof s === "string") {
    return <>{s}</>;
  }

  return RenderLink(s);
}

export function RenderLink(link: link) {
  return (
    <Link href={link.href} target="_blank">
      {link.text}
    </Link>
  );
}

export function RenderLine(line: line) {
  const lines = forceArray<stringish>(line);

  const renderedLines = lines.map((l) => RenderStringish(l));

  return <>{renderedLines}</>;
}

function forceArray<T>(t: T | T[]): T[] {
  return Array.isArray(t) ? t : [t];
}

export function RenderText(text: text) {
  const lines = forceArray<line>(text.text);
  let renderedLines: JSX.Element[] = [];
  switch (text.variant) {
    case "paragraph":
      renderedLines = lines.map((line) => RenderLine(line));
      for (let i = renderedLines.length - 1; i > 0; i--) {
        renderedLines.splice(i, 0, <span>&nbsp;</span>);
      }
      return (
        <div style={{ paddingLeft: "40px", margin: "16px 0" }}>
          {renderedLines}
          <br />
        </div>
      );
    case "lines":
      renderedLines = lines.map((line, idx) => {
        if (idx === 0) {
          return (
            <div>
              <strong>{RenderLine(line)}</strong>
            </div>
          );
        }
        return <div>{RenderLine(line)}</div>;
      });
      renderedLines.push(<div>&nbsp;</div>);
      return (
        <div style={{ paddingLeft: "40px", margin: "16px 0" }}>
          {renderedLines}
        </div>
      );
    case "list":
      renderedLines = lines.map((line) => <li>{RenderLine(line)}</li>);
      return <ul>{renderedLines}</ul>;
  }
}
