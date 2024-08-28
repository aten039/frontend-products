import { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({product}:ProductFormProps) {
  return (
    <>
    <div> 
        <label
          htmlFor="name"
          className=" font-bold text-2xl text-gray-800"
        >Nombre:</label>
        <input 
          id="name"
          type="text"
          name="name"
          placeholder="Introduce un nombre"
          className="  mt-2 block w-full p-3 border bg-gray-50 rounded-md"
          defaultValue={product?.name}
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className=" font-bold text-2xl  text-gray-800"
        >Precio:</label>
        <input 
          id="price"
          type="number"
          name="price"
          placeholder="Introduce un precio"
          className="  mt-2 block w-full p-3 border bg-gray-50 rounded-md"
          defaultValue={product?.price}
        />
      </div>
    </>
  )
}
