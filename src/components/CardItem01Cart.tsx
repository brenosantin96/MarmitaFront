import { formatPriceToBRL } from "@/utils/Formatter";
import Button01 from "./Button01";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

type PropsCardItem01Cart = {
    id: number
    title: string;
    imageUrl: string;
    price: number;
    portionGram: number;
    oldPrice?: number;
    quantityInCart: number;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
}

const CardItem01Cart = ({ id, title, price, imageUrl, portionGram, oldPrice, onAdd, onRemove, quantityInCart }: PropsCardItem01Cart) => {

    const { user } = useUserContext();
    const router = useRouter();

    const addItemToCart = (id: number) => {
        if (!user) {
            alert("Faça login antes de comprar");
            router.push("/login");
            return;
        }
        onAdd(id); // envia para o pai atualizar o contexto
        console.log("Adicionado item no cart");
    };

    const removeItemToCart = (id: number) => {
        if (!user) {
            alert("Faça login antes de comprar");
            router.push("/login");
            return;
        }
        onRemove(id); // envia para o pai atualizar o contexto
        console.log("Removendo item do cart");
    };

    return (
        <div className='flex rounded-lg justify-start items-center font-hindmadurai border w-full border-gray-300 mb-3 p-2 cursor-pointer transition'>
            <div className="overflow-hidden rounded-t-lg h-[100px] w-[120px]">
                <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className='pt-2 px-5'>
                <div>{title}</div>
                <div id="price">{formatPriceToBRL(quantityInCart * price)}</div>
                <div id="portionGram" className='text-gray-400'>{portionGram}g</div>
            </div>
            <div className='px-5 py-3'>
                {quantityInCart === 0 && (
                    <Button01 onClick={() => addItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>
                        Adicionar
                    </Button01>
                )}
                {quantityInCart > 0 && (
                    <div className="flex gap-5 items-center">
                        <Button01 onClick={() => addItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>+</Button01>
                        <div className="text-sm font-oswald font-semibold">{quantityInCart}</div>
                        <Button01 onClick={() => removeItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>-</Button01>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardItem01Cart;
