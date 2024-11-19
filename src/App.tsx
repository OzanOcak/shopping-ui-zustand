import { Cart } from "@/components/Cart";
import { ChangeQtyButtons } from "@/components/ChangeQtyButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { User } from "@/components/User";
import { PRODUCTS_DATA } from "@/lib/mockData";
import { useStore } from "@/store/store";

export default function App() {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <main className="space-y-4 h-screen bg-background mx-[10%] md:mx[16%] lg:mx[20%] mt-2">
      <div className="flex justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
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
