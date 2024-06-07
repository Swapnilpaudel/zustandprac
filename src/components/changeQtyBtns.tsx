import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type Props = { productId: string };

function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
    }))
  );

  const product = getProductById(productId);
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
