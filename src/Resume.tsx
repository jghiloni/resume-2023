import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ResumeData } from "./utils/models";
import { ResumeProvider } from "./components/Contexts";
import { ResumeContents } from "./components/Contents";

export function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/resume.json")
      .then((response) => {
        response.json().then((json) => {
          setResumeData(json as ResumeData);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setResumeData]);

  return (
    <ResumeProvider value={resumeData}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Header />
      <ResumeContents />
      <Footer />
    </ResumeProvider>
  );
}
