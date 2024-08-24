import { Link , Form, useActionData, ActionFunctionArgs} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";


export async function action({request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData());
  
  let error = '';

  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios';
  }
  if(error){
    return error;
  }

  return {}
}

export default function NewProducts() {

  const error = useActionData() as string;
  console.log(error)

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
        />
      </div>

      <input 
        type="submit"
        value="Registrar Producto"
        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer hover:bg-indigo-500 rounded lg:w-auto lg:ml-auto lg:block transition-all"
      />
    </Form>

  </>
  )
}
