import { Cookie } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
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
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/Product";
import { currencyFormat } from "../../app/util/util";

interface Props {
  index: number;
  item: Product;
}

function ProductCard({ index, item }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
          <Chip label={currencyFormat(item.price!)} color="success"></Chip>
          <Chip label={`${item.brand} / ${item.type}`} color="warning" />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() => handleAddItem(item.id!)}
            size="small"
          >
            Add To Cart
          </LoadingButton>
          <Button component={Link} size="small" to={`/catalog/${item.id}`}>
            Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
