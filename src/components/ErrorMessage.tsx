import { ReactNode } from "react";


export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <div className=" text-center my-4 p-2 bg-red-600 text-white font-bold uppercase">
        {children}
    </div>
  )
}
