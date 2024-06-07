import ChangeQtyButtons from "./components/changeQtyBtns";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";

function App() {
  const addProduct = useStore((state) => state.addProduct);
  const products = useStore((state) => state.products);
  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <h1 className=" text-2xl "> Products</h1>

      <div className="space y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardDescription></CardDescription>
            <CardFooter>
              {products.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id}></ChangeQtyButtons>
              ) : (
                <Button onClick={() => addProduct(product)} variant="default">
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default App;
