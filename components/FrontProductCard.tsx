import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface Product {
  img: string;
  title: string;
  linkone: string;
  linktwo: string;
}

interface ProductCardProps {
  product: Product;
}

const FrontProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <li key={product.img}>
    <div className="group block overflow-hidden">
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: 400 / 480,
        }}
      >
        <Image
          src={product.img}
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
      <div className="relative bg-white pt-3">
        {product.title && (
          <h3 className=" text-black font-semibold  ">{product.title}</h3>
        )}
      </div>
    </div>
    <p className="mt-2 flex justify-between">
      {product.linkone && (
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), " px-0")}
          href={product.linkone}
        >
          Shop Men
        </Link>
      )}
      {product.linktwo && (
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), " px-0")}
          href={product.linktwo}
        >
          Shop Women
        </Link>
      )}
    </p>
  </li>
);

export default FrontProductCard;
