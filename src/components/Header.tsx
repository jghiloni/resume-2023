import { GitHub, LinkedIn } from "@mui/icons-material";
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import MenuIcon from "@mui/icons-material/Menu";
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled
} from "@mui/material";
import { useContext, useState } from "react";
import { ResumeContext, ToggleThemeButton } from "./Contexts";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export function Header() {
  const data = useContext(ResumeContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const phoneLink = (sx = {}) => (
    <Button
      variant="text" sx={sx}
      href={`tel:+1${data.phone}`}
      target="_blank"
      color="primary"
      startIcon={<PermPhoneMsgRoundedIcon />}
    >
      ({data.phone?.substring(0, 3)}) {data.phone?.substring(3, 6)}-
      {data.phone?.substring(6)}
    </Button>
  );

  const emailLink = (sx = {}) => (
    <Button
      variant="text" sx={sx}
      href={`mailto:${data.email}`}
      target="_blank"
      color="primary"
      startIcon={<AlternateEmailRoundedIcon />}
    >
      {data.email}
    </Button>
  );

  const linkedinLink = (sx = {}) => (
    <Button
      variant="text" sx={sx}
      href={data.linkedin ?? "https://linkedin.com"}
      target="_blank"
      color="primary"
      startIcon={<LinkedIn />}
    >
      LinkedIn
    </Button>
  );

  const githubLink = (sx = {}) => (
    <Button
      variant="text" sx={sx}
      href={data.github ?? "https://github.com"}
      target="_blank"
      color="primary"
      startIcon={<GitHub />}
    >
      Github
    </Button>
  );

  const contactLinks = [
    { key: "phone", link: phoneLink },
    { key: "email", link: emailLink },
    { key: "linkedin", link: linkedinLink },
    { key: "github", link: githubLink },
  ];

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Contact Josh"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClick={handleCloseNavMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {contactLinks.map(({ key, link }) => (
                  <MenuItem key={key}>{link({ my: 0 })}</MenuItem>
                ))}
              </Menu>
            </Box>
            <DescriptionRoundedIcon fontSize="large" htmlColor="white" />
            <Typography variant="h5" ml="12px" mr="36px" color="white" noWrap>Josh Ghiloni, Principal Software Engineer</Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {contactLinks.map(({ link }) => link({ my: 2, color: 'white' }))}
            </Box>
            <ToggleThemeButton />
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
}
