import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";


export default function FeatureProductsCard() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Bamboo Prducts",
      description:
        "Eco-friendly and durable bamboo products designed to reduce environmental impact while enhancing your daily life.",
      image: "http://localhost:8080/greenmart/uploads/images/bamboo-category.jpg",
      id: 1,
    },
    {
      title: "Personal Care",
      description:
        "Gentle, chemical-free personal care items crafted from natural ingredients to nourish your body and mind.",
      image: "http://localhost:8080/greenmart/uploads/images/selfcare.jpeg",
      id: 2,
    },
    {
      title: "Handicrafts",
      description:
        "Beautiful, hand-crafted items made from natural resources, reflecting traditional artistry and sustainable practices.",
      image: "http://localhost:8080/greenmart/uploads/images/decorative.jpg",
      id: 3,
    },
    {
      title: "Eco Friendly Bags",
      description:
        "Versatile and stylish bags made from biodegradable materials, perfect for reducing single-use plastic and embracing a greener lifestyle.",
      image:
        "http://localhost:8080/greenmart/uploads/images/ecofreindlybags.jpeg",
      id: 4,
    },
    {
      title: "Health Care",
      description:
        "Holistic health care solutions made from natural ingredients, promoting well-being without harmful chemicals.",
      image: "http://localhost:8080/greenmart/uploads/images/Eco-Essentials.jpeg",
      id: 5,
    },
    // Add more categories as needed
  ];

  const handleClick = async (categoryId) => {
    try {
      const response = await axios.get(
        `${config.url}/products/category/${categoryId}`
      
      );
      navigate("/search-results", { state: { products: response.data } });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        gap: "16px",
        padding: "16px",
      }}
    >
      {categories.map((category, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 345 }}
          onClick={() => handleClick(category.id)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={category.image}
              alt={category.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {category.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
