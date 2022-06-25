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
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/BasketSlice";

interface Props {
  index: number;
  item: Product;
}

function ProductCard({ index, item }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
            loading={status.includes("pendingAddItem" + item.id)}
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: item?.id! }))
            }
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
