import React from 'react'

const pageTest = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-[45px_1fr_1fr] min-h-screen text-white text-center font-semibold">
      {/* Linha 1 (fixa 45px) */}
      <div className="bg-red-500 col-span-2 flex items-center justify-center">
        div1 (45px)
      </div>

      {/* Linha 2 */}
      <div className="bg-green-500 col-start-1 col-end-2 flex items-center justify-center">
        div3
      </div>
      <div className="bg-blue-500 col-start-2 col-end-3 row-span-2 flex items-center justify-center">
        div2
      </div>

      {/* Linha 3 */}
      <div className="bg-yellow-500 col-start-1 col-end-2 flex items-center justify-center">
        div4
      </div>
    </div>
  );


}

export default pageTest