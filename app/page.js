import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Home() {
  return (
    <main className="bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen py-8">
      {/* Gym Manager App Heading */}
      <header className="text-center mb-8">
        <h1 className="text-purple-700 text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Gym Manager
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          Manage Members, Plans, and Staff
        </p>
      </header>

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
            <Typography variant="body2" color="textSecondary" component="p">
              Manage your gym members efficiently. Track activities and update details.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/member" style={{border: "1px solid #7C3AED"}}
            className="custom-button border border-purple-700 hover:bg-purple-700 hover:text-white">Manage</Button>
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
            <Typography variant="body2" color="textSecondary" component="p">
              Customize subscription plans for your gym members with flexible options.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/plan" style={{border: "1px solid #7C3AED"}}
            className="custom-button border border-purple-700 hover:bg-purple-700 hover:text-white">Manage</Button>
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
            <Typography variant="body2" color="textSecondary" component="p">
              Manage your gym's staff, assign roles, and track performance.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/staff" style={{border: "1px solid #7C3AED"}}
            className="custom-button border border-purple-700 hover:bg-purple-700 hover:text-white">Manage</Button>
          </CardActions>
        </Card>

      </div>
    </main>
  );
}
