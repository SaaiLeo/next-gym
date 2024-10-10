import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <main>
      <h1 className="text-5xl font-bold text-center">Welcome to Gym Management System</h1>
      <br/>
      <br/>
      <div className="grid grid-cols-3 gap-4 m-4">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="membership card"
            height="250"
            image="https://img.freepik.com/premium-psd/gym-membership-3d-gym-fitness-icon_618274-451.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Members
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/member">Manage</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUesRR2_xZv_TiwrPeWM3PrHACChTKWtfeWw&s"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Subscription Plans
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/plan">Manage</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="https://media.istockphoto.com/id/1369575322/photo/shot-of-a-muscular-young-man-using-a-clipboard-while-checking-equipment-in-a-gym.jpg?s=612x612&w=0&k=20&c=RnHAY_vP3FRyo1rU6GVV2QcBlwlxYvqEn7YZsiStSkI="
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Staff
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/staff">Manage</Button>
          </CardActions>
        </Card>

        </div>
    </main>
  )
}