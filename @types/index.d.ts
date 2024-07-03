interface SubHeading {
  name: string;
  href: string;
}

interface CategoryProps {
  heading: string;
  extraStyle?: string;
  subHeadings: (SubHeading & { nestedItem?: SubHeading[] })[];
}
