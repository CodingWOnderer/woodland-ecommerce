// Filters Store

export interface Color {
  name: string;
  code: string;
  selected: boolean;
}

export interface Size {
  size: string;
  selected: boolean;
}

export interface PriceRange {
  label: string;
  min: string;
  max: string;
}

export interface FilterStore {
  colorFilter: Color[];
  setColorFilter: (value: Color[]) => void;
  sizeFilter: Size[];
  setSizeFilter: (value: Size[]) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;

  sortFilter: string;
  setSortFilter: (value: string) => void;
}

// In Memory Data Store

export interface AuthForm {
  userPhone: string;
  verifyForm: boolean;
  setVerifyForm: (value: boolean) => void;
  setUserPhone: (value: string) => void;
  setAuthSheet: boolean;
  toggleAuthSheet: (value: boolean) => void;
}

export interface IManufacturingInfo {
  productCode: string;
  articalCode: string;
  division: string;
  color: string;
  Measurement: string;
  Mrp: number;
  MaterialUsed: string;
  DesignedFor: string;
  PackagingQty: string;
  OriginCountry: string;
  MarketedBy: string;
}

export interface ZustandStoreProps {
  storeSheet: boolean;
  toggleStore: (value: boolean) => void;
  sidebar: boolean;
  toggleSidebar: (value: boolean) => void;
  searchSheet: boolean;
  searchProduct: string;
  setSearch: (value: string) => void;
  toggleSearchSheet: (value: boolean) => void;

  authForm: AuthForm;

  filterSheet: boolean;
  setFilterSheet: (value: boolean) => void;

  sizeSheet: boolean;
  setSizeSheet: (value: boolean) => void;

  division: "FOOTWEAR" | "GARMENT";
  setDivision: (value: "FOOTWEAR" | "GARMENT") => void;

  infoSheet: boolean;
  setInfoSheet: (value: boolean) => void;

  productManufacturingData: Partial<IManufacturingInfo> | undefined;
  setManufacturingInfo: (value: Partial<IManufacturingInfo>) => void;

  zoomDialouge: boolean;
  setZoomDialouge: (value: boolean) => void;

  cancelSheet: {
    subOrderId: string;
    orderId: string;
    drawer: boolean;
  };
  setCancelSheet: (value: {
    subOrderId: string;
    orderId: string;
    drawer: boolean;
  }) => void;
}
