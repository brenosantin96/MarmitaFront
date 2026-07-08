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

    const buttonClasses = "hover:bg-green-700 hover:text-white md:max-[1200px]:!p-2 md:max-[1200px]:!text-xs md:max-[1200px]:!border max-[375px]:!p-2 max-[375px]:!text-xs max-[375px]:!border max-[320px]:!p-1.5 max-[320px]:!text-[10px]";
    const counterButtonClasses = "hover:bg-green-700 hover:text-white md:max-[1200px]:!p-2 md:max-[1200px]:!text-sm md:max-[1200px]:!min-w-[32px] md:max-[1200px]:!border max-[375px]:!p-1.5 max-[375px]:!text-xs max-[375px]:!min-w-[28px] max-[375px]:!border max-[320px]:!p-1 max-[320px]:!min-w-[24px]";

    return (
        <div className='flex rounded-lg justify-start items-center font-hindmadurai border w-full border-gray-300 mb-3 p-2 md:max-[1200px]:p-1.5 max-[375px]:mb-2 cursor-pointer transition'>
            <div className="flex-shrink-0 overflow-hidden rounded-lg h-[100px] w-[120px] md:max-[1200px]:h-[72px] md:max-[1200px]:w-[84px] md:max-[1200px]:bg-gray-50 max-[375px]:h-[68px] max-[375px]:w-[68px] max-[320px]:h-[52px] max-[320px]:w-[52px]">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover md:max-[1200px]:object-contain max-[375px]:object-contain"
                />
            </div>
            <div className='min-w-0 flex-1 pt-2 px-5 md:max-[1200px]:pt-0 md:max-[1200px]:px-3 md:max-[1200px]:text-sm max-[375px]:px-3 max-[375px]:text-xs max-[320px]:px-2 max-[320px]:text-[11px]'>
                <div className="md:max-[1200px]:leading-tight md:max-[1200px]:line-clamp-2 max-[375px]:leading-tight max-[375px]:line-clamp-2">{title}</div>
                <div id="price" className="md:max-[1200px]:text-sm max-[375px]:text-xs max-[320px]:text-[11px]">{formatPriceToBRL(price)}</div>
                <div id="portionGram" className='text-gray-400 md:max-[1200px]:text-xs max-[375px]:text-[11px] max-[320px]:text-[10px]'>{portionGram}g</div>
            </div>
            <div className='flex-shrink-0 px-5 py-3 md:max-[1200px]:px-2 md:max-[1200px]:py-2 max-[375px]:px-2 max-[375px]:py-1.5 max-[320px]:px-1 max-[320px]:py-1'>
                {quantityInCart === 0 && (
                    <Button01 onClick={() => addItemToCart(id)} outline={true} classes={buttonClasses}>
                        Adicionar
                    </Button01>
                )}
                {quantityInCart > 0 && (
                    <div className="flex gap-5 items-center md:max-[1200px]:gap-3 max-[375px]:gap-2 max-[320px]:gap-1.5">
                        <Button01 onClick={() => addItemToCart(id)} outline={true} classes={counterButtonClasses}>+</Button01>
                        <div className="text-sm font-oswald font-semibold md:max-[1200px]:text-sm max-[375px]:text-xs max-[320px]:text-[11px]">{quantityInCart}</div>
                        <Button01 onClick={() => removeItemToCart(id)} outline={true} classes={counterButtonClasses}>-</Button01>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardItem01Cart;
