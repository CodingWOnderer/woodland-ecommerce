import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

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
    <Link href="#" className="group block overflow-hidden">
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
          <h3 className=" text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {product.title}
          </h3>
        )}
      </div>
    </Link>
    <p className="mt-2 flex justify-between">
      {product.linkone && <Link href={product.linkone}>Shop Men</Link>}
      {product.linktwo && <Link href={product.linktwo}>Shop Women</Link>}
    </p>
  </li>
);

export default FrontProductCard;
