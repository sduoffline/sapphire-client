import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const itemData = [
  {
    avatar: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    description: 'Breakfast',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    description: 'Burger',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    description: 'Camera',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    description: 'Coffee',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    description: 'Hats',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    description: 'Honey',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    description: 'Basketball',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    description: 'Fern',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    description: 'Mushrooms',
  },
];

export default function LeaderBoard() {
  return (
    <Paper elevation={1}>
      <Box sx={{ p: 2 }}>
        {/* 排行榜标题 */}
        <Typography variant="h6" gutterBottom>
          排行榜
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {itemData.map((item) => (
            <ListItem key={item.description}>
              <ListItemAvatar>
                <Avatar alt={item.description} src={item.avatar} />
              </ListItemAvatar>
              <ListItemText primary={item.description} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="info">
                  <InfoIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
