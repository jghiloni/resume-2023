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
\\usepackage{tabularx}
\\usepackage{fancyhdr}

\\setlength{\\textheight}{9in}

\\newcommand\\textline[3]{%
  \\par\\smallskip\\noindent%
  \\parbox[t]{.35\\textwidth}{\\raggedright\\textbf{#1}}%
  \\parbox[t]{.45\\textwidth}{\\centering{#2}}%
  \\parbox[t]{.2\\textwidth}{\\raggedleft{#3}}%
  \\par\\smallskip}

\\newcolumntype{b}{X}
\\newcolumntype{s}{>{\\hsize=.5\\hsize}X}

\\begin{document}
\\pagestyle{fancy}
\\renewcommand{\\headrulewidth}{0pt}
\\fancyhead{}
\\fancyfoot{}
\\fancyfoot[C]{\\thepage}

\\name{\\href{https://www.joshghiloni.me}{${resume.name.toUpperCase()}}}
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

function renderSection(section, addPageBreak = false) {
  let sectionText = `\\${addPageBreak ? "pagebreak" : "medskip"}
\\section{${section.name.toUpperCase()}}`;
  section.items.forEach((item) => {
    if (item.header) {
      sectionText = `${sectionText}
\\goodbreak
\\textline{${renderStringish(item.header[0])}}{${renderStringish(
        item.header[1]
      )}}{${renderStringish(item.header[2])}}`;
    }

    if (Array.isArray(item.body)) {
      sectionText = `${sectionText}
\\medskip
\\begin{table}[htbp]
  \\begin{tabularx}{\\linewidth}{bss}
    {\\bf Name} & {\\bf Experience Level} & {\\bf Years of Experience} \\\\
    \\hline`;
      item.body.forEach((skill) => {
        sectionText = `${sectionText}
    ${skill.name} & ${skill.experience} & ${skill.first_used}—${
          skill.last_used === 9999 ? "Present" : skill.last_used
        } \\\\`;
      });
      sectionText = `${sectionText}
  \\end{tabularx}
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

resume.sections.forEach((section, idx) => {
  texFileContents = `${texFileContents}

${renderSection(section, (idx > 0 && (idx % 5 === 0)))}`;
});

texFileContents = `${texFileContents}

\\end{resume}
\\end{document}`;

fs.writeFileSync(path.join(texRoot, "resume.tex"), texFileContents);
