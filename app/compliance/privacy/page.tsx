import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="flex flex-col gap-4 md:w-1/2">
        <img src="/placeholder.svg" alt="Product Image 1" className="w-full" />
        <div className="grid grid-cols-2 gap-4">
          <img src="/placeholder.svg" alt="Product Image 2" className="w-full" />
          <img src="/placeholder.svg" alt="Product Image 3" className="w-full" />
          <img src="/placeholder.svg" alt="Product Image 4" className="w-full" />
          <img src="/placeholder.svg" alt="Product Image 5" className="w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="text-2xl font-bold">Brown Chinos For Men</h1>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">₹2,097</span>
          <span className="line-through text-muted-foreground">Mrp ₹3,495</span>
          <span className="text-green-500 font-semibold">40% off</span>
        </div>
        <p className="text-muted-foreground">Prices include taxes</p>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Colors</span>
          <div className="flex gap-2">
            <img src="/placeholder.svg" alt="Color 1" className="w-12 h-12" />
            <img src="/placeholder.svg" alt="Color 2" className="w-12 h-12 border" />
            <img src="/placeholder.svg" alt="Color 3" className="w-12 h-12 border" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Size</span>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" className="w-full">
              28
            </Button>
            <Button variant="outline" className="w-full">
              30
            </Button>
            <Button variant="outline" className="w-full">
              32
            </Button>
            <Button variant="outline" className="w-full">
              34
            </Button>
            <Button variant="outline" className="w-full">
              36
            </Button>
            <Button variant="outline" className="w-full">
              38
            </Button>
            <Button variant="outline" className="w-full" disabled>
              40
            </Button>
            <Button variant="outline" className="w-full" disabled>
              42
            </Button>
            <Button variant="outline" className="w-full" disabled>
              44
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Free Delivery</span>
          <p className="text-muted-foreground">For orders above ₹1000. Delivery in 3-7 working days.</p>
          <div className="flex items-center gap-2">
            <Input placeholder="Enter Pincode" className="flex-1" />
            <Button variant="outline">Check</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="city1">City 1</SelectItem>
              <SelectItem value="city2">City 2</SelectItem>
              <SelectItem value="city3">City 3</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex-1 bg-green-500 text-white">Add To Cart</Button>
         
        </div>
        <div className="flex flex-col gap-2">
        
        </div>
        <Link href="#" className="text-muted-foreground text-sm" prefetch={false}>
          Import, Manufacturing & Packaging Info
        </Link>
      </div>
    </div>
  )
}

