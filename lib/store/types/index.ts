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

    sortFilter:string;
    setSortFilter:(value:string)=>void;
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
  
  export interface ZustandStoreProps  {
    storeSheet: boolean;
    toggleStore: (value: boolean) => void;
    sidebar: boolean;
    toggleSidebar: (value: boolean) => void;
    searchSheet: boolean;
    searchProduct: string;
    setSearch: (value: string) => void;
    toggleSearchSheet: (value: boolean) => void;
  
    authForm: AuthForm;
  
  
    filterSheet:boolean;
    setFilterSheet:(value:boolean)=>void;
  };