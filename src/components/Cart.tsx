import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { ChangeQtyButtons } from "@/components/ChangeQtyButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/store/store";

export function Cart() {
  const { reset, products, removeProduct, total, fullName, address } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
      fullName: state.fullName,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex gap-2 text-lg items-center">
          <h1>Cart:</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX />
          </Button>
        </div>
        <div className="space-y-1">
          {products.map((product) => (
            <Card className="flex flex-wrap" key={product.id}>
              <CardHeader className=" bg-gray-300 w-[30%]">
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-2 mt-3 w-[15%]">
                {product.price}$
              </CardContent>
              <CardFooter className="gap-1 pt-2 w-[55%]">
                <ChangeQtyButtons productId={product.id} />
                <Button
                  onClick={() => removeProduct(product.id)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Name: {fullName}</p>
        <p>Address: {address}</p>
        <p>Total: {total}$</p>
      </PopoverContent>
    </Popover>
  );
}
