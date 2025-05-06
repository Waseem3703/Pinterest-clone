import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Dashboard, Person, Comment, TrendingUp } from '@mui/icons-material';

const Sidebar = ({ open, handleDrawerClose }) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open} sx={{ width: 240, flexShrink: 0 }}>
      <div style={{
        width: 240,
        background: 'rgba(0, 0, 0, 0.7)', // Transparent background
        height: '100%',
        color: 'white',
        backdropFilter: 'blur(10px)', // Adds a blur effect to the background
        boxShadow: '4px 0px 15px rgba(0, 0, 0, 0.5)', // Slight shadow for depth
      }}>
        <List>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Dashboard" style={{ color: 'white', fontWeight: 'bold' }} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Dashboard style={{ color: 'white' }} />
            <ListItemText primary="Dashboard" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Person style={{ color: 'white' }} />
            <ListItemText primary="Users" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Comment style={{ color: 'white' }} />
            <ListItemText primary="Comments" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <TrendingUp style={{ color: 'white' }} />
            <ListItemText primary="Analytics" style={{ color: 'white' }} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
