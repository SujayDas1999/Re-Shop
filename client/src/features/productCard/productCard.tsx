import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";

interface Props {
  index: number;
  item: Product;
}

function productCard({ index, item }: Props) {
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "secondary.main" }}>
              {item.name?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={item.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        ></CardHeader>
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={item.pictureUrl}
        />
        <CardContent sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Chip
            label={"$" + (item.price! / 100).toFixed(2)}
            color="success"
          ></Chip>
          <Chip label={`${item.brand} / ${item.type}`} color="warning" />
        </CardContent>
        <CardActions>
          <Button size="small">Add To Cart</Button>
          <Button component={Link} size="small" to={`/catalog/${item.id}`}>
            Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default productCard;
