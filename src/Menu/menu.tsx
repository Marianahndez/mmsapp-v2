/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect } from 'react';
import {
  makeStyles,
  AppBar,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListSubheader,
  Box,
} from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LanguageIcon from '@mui/icons-material/Language';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { userDataContext } from '../context/userData-context.js';
import './menu.scss';

function SidebarMenu() {
  const { t, i18n } = useTranslation();

  const { user, changeL } = useContext(userDataContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [translateEs, setTranslateEs] = useState(false);

  const userLocalS = localStorage.getItem('userData')!;
  const userIDLocal = JSON.parse(userLocalS);

  const changeLanguage = (lng: any) => {
    setTranslateEs(!translateEs);
    changeL(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar
      variant="outlined"
      position="static"
      style={{ background: grey[300], border: 'none' }}
    >
      <Toolbar>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuRoundedIcon sx={{ color: grey[900] }} />
          </IconButton>
          {/* <div style={{ position: 'relative', padding: '0.5rem 0' }}>
            <span className="redNotification" />
            <IconButton component={Link} to="/notifications">
              <NotificationsRoundedIcon sx={{ color: grey[900] }} />
            </IconButton>
          </div> */}
        </div>
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          className="menuDesktop"
          PaperProps={{
            sx: { width: '75%', padding: ' 1rem', background: '#141825' },
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              style={{ marginLeft: '1rem', marginTop: '2.7rem' }}
              component={Link}
              to="/profile"
            >
              <Avatar sx={{ width: 60, height: 60 }}>
                <PersonRoundedIcon />
              </Avatar>
              <p className="personName">{userIDLocal.name}</p>
              <span className="personRole">{userIDLocal.role}</span>
            </Box>
            <Avatar variant="square" style={{ borderRadius: '15px' }}>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Avatar>
          </div>
          <List style={{ marginTop: '2.5rem' }}>
            <ListItem button component={Link} to="/userHome">
              <DashboardRoundedIcon style={{ color: '#fff' }} />
              <ListItemText
                style={{ margin: '1rem 0 1rem 1rem' }}
                primary={t('Inicio')}
                className="listStyle"
              />
            </ListItem>
            {userIDLocal.role !== 'Admin' ? (
              <>
                <ListItem button component={Link} to="/history">
                  <FormatListBulletedRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('Historial')}
                    className="listStyle"
                  />
                </ListItem>

                <ListItem button component={Link} to="/sucursales">
                  <ApartmentRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('Sucursales')}
                    className="listStyle"
                  />
                </ListItem>

                <ListItem button component={Link} to="/notifications" disabled>
                  <NotificationsRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('Notificaciones')}
                    className="listStyle"
                  />
                </ListItem>

                <ListItem button>
                  <PhoneInTalkRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('LlamarACoordinador')}
                    className="listStyle"
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/notifications" disabled>
                  <NotificationsRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('Notificaciones')}
                    className="listStyle"
                  />
                </ListItem>
                <ListItem button disabled>
                  <MapRoundedIcon style={{ color: '#fff' }} />
                  <ListItemText
                    style={{ margin: '1rem 0 1rem 1rem' }}
                    primary={t('Rastreo')}
                    className="listStyle"
                  />
                </ListItem>
              </>
            )}
          </List>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: '#141825',
              marginTop: '4rem',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                style={{
                  background: '#141825',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                {t('Traductor')}
              </ListSubheader>
            }
          >
            {translateEs ? (
              <ListItem button onClick={() => changeLanguage('en')}>
                <LanguageIcon style={{ color: '#fff' }} />
                <ListItemText
                  style={{ margin: '1rem 0 1rem 1rem' }}
                  primary="Inglés"
                  className="listStyle"
                />
              </ListItem>
            ) : (
              <ListItem button onClick={() => changeLanguage('es')}>
                <LanguageIcon style={{ color: '#fff' }} />
                <ListItemText
                  style={{ margin: '1rem 0 1rem 1rem' }}
                  primary="Español"
                  className="listStyle"
                />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default SidebarMenu;
