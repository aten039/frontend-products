import { ActionFunctionArgs, Form, Link, redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom"
import { AvailabilityChanges, deleteProduct, getProducts } from "../services/ProductsService";
import { Product } from "../types";
import { formatCurrency } from "../helpers";

export async function loader() {
  const response = await getProducts();
  return response;
}

export async function action({params:{id}}: ActionFunctionArgs){
  if(id === undefined){
    alert('ha ocurrido un error');
    return redirect('/');
  }
  await deleteProduct(+id)
  return redirect('/')
}

export async function actionAvailability({request}: ActionFunctionArgs) {
  
  const data = Object.fromEntries( await request.formData());

  await AvailabilityChanges(+data.id)
  return {}
}

export default function Products() {
  const fetcher = useFetcher()
  const response: any = useLoaderData();
  const navigate = useNavigate();
 
  return (
    <>
      <div className=" flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
         to="productos/nuevos"
         className=" rounded-md bg-indigo-600 p-3 text-sm font-bold shadow-sm hover:bg-indigo-500 text-white"
        >Agregar Productos</Link>
      </div>
      {response?.error? 
      (<h2 className=" mt-10 p-4 bg-red-600 text-white font-bold rounded-md text-center">{response.message}</h2>)
      :(
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {response.map((product:Product)=> (
              <tr key={product.id} className = "border-b ">
                <td className="p-3 texto-lg texto-gris-800">{product.name}</td>
                <td className="p-3 texto-lg texto-gris-800">{formatCurrency(product.price)}</td>
                <td className="p-3 texto-lg texto-gris-800">
                  <fetcher.Form method="POST" >
                    <button
                      type="submit"
                      name="id"
                      value={product.id}
                      className={`${product.availability? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-600 hover:cursor-pointer`}
                    >{product.availability?'Disponible':'No Disponible'}</button>
                  </fetcher.Form>
                  
                  </td>
                <td className="p-3 texto-lg texto-gris-800">
                  <div className=" flex gap-2 items-center">
                    <button
                      onClick={ ()=> navigate(`productos/${product.id}/edit`)}
                      className=" bg-indigo-600 text-white rounded-lg w-full uppercase font-bold text-xs p-2 text-center"
                    >Editar</button>

                    <Form
                      className=" w-full"
                      method="POST"
                      action={`productos/${product.id}/delete`}
                      onSubmit={(e)=>{
                        if(!confirm('Eliminar?')){
                          e.preventDefault();
                        }
                      }}
                    >
                      <input
                        type="submit"
                        value="Eliminar"
                        className=" bg-red-600 text-white rounded-lg w-full uppercase font-bold text-xs p-2 text-center"
                      />
                    </Form>
                  </div>

                </td>
              </tr>
            ))}
              
          </tbody>
          <tbody>

          </tbody>
        </table>
      </div>)}
      
    </>
  )
}
