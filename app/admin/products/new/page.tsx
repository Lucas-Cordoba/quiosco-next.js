import Heading from "@/components/ui/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

export default function Create() {
  return (
    <>
        <Heading>Nuevo Producto</Heading>
        <GoBackButton/>
        <AddProductForm>
          <ProductForm/>
        </AddProductForm>
    </>
  )
}

