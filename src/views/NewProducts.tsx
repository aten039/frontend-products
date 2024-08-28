import { Link , Form, useActionData, ActionFunctionArgs, redirect} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductsService";
import ProductForm from "../components/ProductForm";


export async function action({request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData());
  
  let error = '';

  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios';
  }
  if(error){
    return error;
  }

  await addProduct(data);
  
  return redirect('/')
}

export default function NewProducts() {

  const error = useActionData() as string;
  

  return (
    <>
    <div className=" flex justify-between">
      <h2 className="text-4xl font-black text-slate-500">Nuevo Producto</h2>
      <Link
       to="/"
       className=" rounded-md bg-indigo-600 p-3 text-sm font-bold shadow-sm hover:bg-indigo-500 text-white"
      >Volver a Productos</Link>
    </div>

    {error && (
      <ErrorMessage>{error}</ErrorMessage>
    )}

    <Form 
      className="mt-10 space-y-5"
      method="POST"  
    >

      <ProductForm/>

      <input 
        type="submit"
        value="Registrar Producto"
        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer hover:bg-indigo-500 rounded lg:w-auto lg:ml-auto lg:block transition-all"
      />
    </Form>

  </>
  )
}
