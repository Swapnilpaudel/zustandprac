import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChangeQtyButtons from "./changeQtyBtns";

export default function Cart() {
  const { reset, products, removeProduct, total } = useStore(
    useShallow((state) => ({
      total: state.total,
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
    }))
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart></ShoppingCart>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96 ">
        <div className="flex gap-2 text-lg justify-items-center">
          <h1> Cart:</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX></CircleX>
          </Button>
        </div>
        <div className="space-y-2 ">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button
                  onClick={() => removeProduct(product.id)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2></Trash2>
                </Button>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                <ChangeQtyButtons productId="product.id"></ChangeQtyButtons>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: {total} $</p>
      </PopoverContent>
    </Popover>
  );
}
