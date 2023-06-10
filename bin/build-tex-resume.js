#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const repoRoot = path.dirname(__dirname);
const texRoot = path.join(repoRoot, "tex");
const pubRoot = path.join(repoRoot, "public");

const resJSON = fs.readFileSync(path.join(pubRoot, "resume.json"));

const resume = JSON.parse(resJSON);

let texFileContents = `\\documentclass{res}
\\usepackage{hyperref}
\\setlength{\\textheight}{9.5in}

\\newcommand\\textline[4][t]{%
  \\par\\smallskip\\noindent\\parbox[#1]{.333\\textwidth}{\\raggedright\\textbf{#2}}%
  \\parbox[#1]{.333\\textwidth}{\\centering#3}%
  \\parbox[#1]{.333\\textwidth}{\\raggedleft#4}\\par\\smallskip%
}

\\begin{document}

\\name{${resume.name.toUpperCase()}\\\\[12pt]}
\\address{\\href{mailto:${resume.email}}{${resume.email}}\\\\
\\href{tel:+1${resume.phone}}{(${resume.phone.substr(
  0,
  3
)}) ${resume.phone.substr(3, 3)}-${resume.phone.substr(6)}}}

\\address{\\href{${resume.linkedin}}{LinkedIn}\\\\
\\href{${resume.github}}{Github}}

\\begin{resume}
`;

function renderStringish(hItem) {
  if (typeof hItem === "string") {
    return hItem;
  }

  if (hItem.href) {
    return `\\href{${hItem.href}}{${hItem.text}}`;
  }
}

function renderSection(section) {
  let sectionText = `\\section{${section.name.toUpperCase()}}`;
  section.items.forEach((item) => {
    if (item.header) {
      sectionText = `${sectionText}
    \\textline[t]{${renderStringish(item.header[0])}}{${renderStringish(
        item.header[1]
      )}}{${renderStringish(item.header[2])}}`;
    }

    if (Array.isArray(item.body)) {
      sectionText = `${sectionText}

      \\begin{table}[h!]
        \\begin{center}
          \\begin{tabular}{llrr}
            \\hline
            {\\bf Name} & {\\bf Experience} & {\\bf First Used} & {\\bf Last Used} \\\\
            \\hline`;
      item.body.forEach((skill) => {
        sectionText = `${sectionText}
            ${skill.name} & ${skill.experience} & ${
          skill.first_used
        } & ${skill.last_used === 9999 ? "Currently Using" : skill.last_used} \\\\`;
      });
      sectionText = `${sectionText}
          \\end{tabular}
        \\end{center}
      \\end{table}
      `;
    } else {
      if (item.body.variant) {
        switch (item.body.variant) {
          case "paragraph":
            let text = item.body.text;
            if (!Array.isArray(text)) {
              text = [text];
            }

            const texts = text.map((t) => renderStringish(t));
            sectionText = `${sectionText}
    ${texts.join(" ")}`;
            break;
          case "lines":
            item.body.text.forEach((line, idx) => {
              const rendered = `${idx === 0 ? "{\\bf " : ""}${renderStringish(
                line
              )}${idx === 0 ? "}" : ""}`;
              sectionText = `${sectionText}
    ${rendered}${idx === item.body.text.length - 1 ? "\n" : " \\\\"}`;
            });
            break;
          case "list":
            sectionText = `${sectionText}
    \\begin{itemize}`;
            item.body.text.forEach((line) => {
              sectionText = `${sectionText}
      \\item ${renderStringish(line)}`;
            });
            sectionText = `${sectionText}
    \\end{itemize}`;
            break;
          default:
            break;
        }
      }
    }
  });

  return sectionText;
}

resume.sections.forEach((section) => {
  texFileContents = `${texFileContents}

${renderSection(section)}`;
});

texFileContents = `${texFileContents}

\\end{resume}
\\end{document}`

fs.writeFileSync(path.join(texRoot, "resume.tex"), texFileContents);
