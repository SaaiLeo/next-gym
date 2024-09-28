import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles.css'; // Import external CSS file

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
        
        <Card className="card-custom transition-transform hover:scale-105">
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
            <Button size="small" href="/member" className="text-blue-500 hover:text-blue-700">Manage</Button>
          </CardActions>
        </Card>

        <Card className="card-custom transition-transform hover:scale-105">
          <CardMedia
            component="img"
            alt="subscription plans"
            height="250"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUesRR2_xZv_TiwrPeWM3PrHACChTKWtfeWw&s"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Subscription Plans
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/plan" className="text-blue-500 hover:text-blue-700">Manage</Button>
          </CardActions>
        </Card>

        <Card className="card-custom transition-transform hover:scale-105">
          
          <CardMedia
            component="img"
            alt="staff management"
            height="250"
            image="https://media.istockphoto.com/id/1369575322/photo/shot-of-a-muscular-young-man-using-a-clipboard-while-checking-equipment-in-a-gym.jpg?s=612x612&w=0&k=20&c=RnHAY_vP3FRyo1rU6GVV2QcBlwlxYvqEn7YZsiStSkI="
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Staff
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/staff" className="text-blue-500 hover:text-blue-700">Manage</Button>
          </CardActions>
          
        </Card>

      </div>
    </main>
  );
}
