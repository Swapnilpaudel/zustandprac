import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type Props = { productId: string };

function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);
  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc * item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);
  return (
    <>
      {product && (
        <div className="flex ga-2 items-center">
          <Button onClick={() => decQty(product.id)} size="icon">
            <Minus></Minus>
          </Button>
          <Button onClick={() => incQty(product.id)} size="icon">
            <Plus></Plus>
          </Button>
        </div>
      )}
    </>
  );
}

export default ChangeQtyButtons;
