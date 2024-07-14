interface SubHeading {
  name: string;
  href: string;
}

interface CategoryProps {
  heading: string;
  extraStyle?: string;
  subHeadings: (SubHeading & { nestedItem?: SubHeading[] })[];
}

type ResponseModal<T> = {
  status: "success" | "error";
  code: number;
  message: string;
  data: T;
};

type TOrderDetails = {
  amount: number;
  razorpayOrderId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};
