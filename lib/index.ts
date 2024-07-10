interface SubCategory {
    name: string;
    target: string;
  }
  
  interface Category {
    name: string;
    haschild: boolean;
    subCategory: SubCategory[];
    target: string;
  }
  
  interface Division {
    division: string;
    category: Category[];
    extradivision?: ExtraDivision[];
    extradivisionone?: ExtraDivision[];
  }
  
  interface ExtraDivision {
    division: string;
    category: Category[];
  }
  
  export const women: Division[] = [
    {
      division: "Footwear",
      category: [
        {
          name: "Boots",
          haschild: false,
          subCategory: [],
          target: "/collections/boots?gender=WOMEN",
        },
        {
          name: "Sneaker/Sports",
          haschild: false,
          subCategory: [],
          target: "/collections/sneakers?gender=WOMEN",
        },
        {
          name: "Formal",
          haschild: true,
          subCategory: [
            {
              name: "Heels",
              target: "/collections/heels?gender=WOMEN",
            },
            {
              name: "Ballerinas",
              target: "/collections/ballerinas?gender=WOMEN",
            },
            {
              name: "Loafers",
              target: "/collections/loafers?gender=WOMEN",
            },
          ],
          target: "#",
        },
        {
          name: "Slippers/Flip-Flops",
          haschild: false,
          subCategory: [],
          target: "/collections/slippers?gender=WOMEN",
        },
        {
          name: "Sandals",
          haschild: false,
          subCategory: [],
          target: "/collections/sandals?gender=WOMEN",
        },
      ],
    },
    {
      division: "Clothing Tops",
      category: [
        {
          name: "Jackets",
          haschild: true,
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/jackets_full_sleeve?gender=WOMEN",
            },
            {
              name: "Sleeve Less",
              target: "/collections/jackets_sleeve_less?gender=WOMEN",
            },
            {
              name: "Leather",
              target: "/collections/leather?gender=WOMEN",
            },
            {
              name: "Windcheater",
              target: "/collections/windcheater?gender=WOMEN",
            },
          ],
          target: "#",
        },
        {
          name: "T-shirts",
          haschild: true,
          subCategory: [
            {
              name: "Polo",
              target: "/collections/polo?gender=WOMEN",
            },
            {
              name: "Round Tees",
              target: "/collections/round_tees?gender=WOMEN",
            },
            {
              name: "V-Neck",
              target: "/collections/v_neck?gender=WOMEN",
            },
          ],
          target: "/",
        },
        {
          name: "Shirts",
          haschild: true,
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/shirts_full_sleeve?gender=WOMEN",
            },
            {
              name: "Half Sleeve",
              target: "/collections/shirts_half_sleeve?gender=WOMEN",
            },
          ],
          target: "/",
        },
        {
          name: "Sweaters",
          haschild: true,
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/sweaters_full_sleeve?gender=WOMEN",
            },
            {
              name: "Sleeve Less",
              target: "/collections/sweaters_sleeve_less?gender=WOMEN",
            },
          ],
          target: "/",
        },
        {
          name: "Sweatshirts & Hoodies",
          haschild: true,
          subCategory: [
            {
              name: "Sweatshirts",
              target: "/collections/sweatshirts?gender=WOMEN",
            },
            {
              name: "Hoodies",
              target: "/collections/hoodies?gender=WOMEN",
            },
          ],
          target: "/",
        },
        {
          name: "Dresses",
          haschild: false,
          subCategory: [],
          target: "/collections/dresses?gender=WOMEN",
        },
        {
          name: "Tracksuits",
          haschild: false,
          subCategory: [],
          target: "/collections/tracksuits?gender=WOMEN",
        },
        {
          name: "Innerwear Tops",
          haschild: true,
          subCategory: [
            {
              name: "Athleisuress",
              target: "/collections/athleisure?gender=WOMEN",
            },
          ],
          target: "/",
        },
      ],
    },
    {
      division: "Clothing Bottoms",
      category: [
        {
          name: "Bottoms",
          haschild: true,
          subCategory: [
            {
              name: "Chinos",
              target: "/collections/chinos?gender=WOMEN",
            },
            {
              name: "Shorts",
              target: "/collections/shorts?gender=WOMEN",
            },
            {
              name: "Denims",
              target: "/collections/denims?gender=WOMEN",
            },
            {
              name: "Corduroys",
              target: "/collections/corduroys?gender=WOMEN",
            },
            {
              name: "Track Pants",
              target: "/collections/trackpants?gender=WOMEN",
            },
            {
              name: "Cargos",
              target: "/collections/cargo?gender=WOMEN",
            },
          ],
          target: "/",
        },
      ],
      extradivision: [
        {
          division: "Bags",
          category: [
            {
              name: "Cross Body Bags",
              haschild: false,
              subCategory: [],
              target: "/collections/hand_bags?gender=WOMEN",
            },
            {
              name: "Hiking Backpacks",
              haschild: false,
              subCategory: [],
              target: "/collections/hiking_backpacks?gender=WOMEN",
            },
            {
              name: "Canvas Bags",
              haschild: false,
              subCategory: [],
              target: "/collections/canvas_bags?gender=WOMEN",
            },
            {
              name: "Backpacks",
              haschild: false,
              subCategory: [],
              target: "/collections/backpacks?gender=WOMEN",
            },
            {
              name: "Trolley Bags",
              haschild: false,
              subCategory: [],
              target: "/collections/trolley_bags?gender=WOMEN",
            },
            {
              name: "Waterproof Bags",
              haschild: false,
              subCategory: [],
              target: "/collections/waterproof_bags?gender=WOMEN",
            },
          ],
        },
      ],
    },
    {
      division: "Accessories",
      category: [
        {
          name: "Belts",
          haschild: false,
          subCategory: [],
          target: "/collections/belts?gender=WOMEN",
        },
        {
          name: "Socks",
          haschild: false,
          subCategory: [],
          target: "/collections/socks?gender=WOMEN",
        },
        {
          name: "Wallets/Card holders",
          haschild: false,
          subCategory: [],
          target: "/collections/wallets_card_holders?gender=WOMEN",
        },
        {
          name: "Lace",
          haschild: false,
          subCategory: [],
          target: "/collections/lace?gender=WOMEN",
        },
        {
          name: "Key Rings",
          haschild: false,
          subCategory: [],
          target: "/collections/key_rings?gender=WOMEN",
        },
        {
          name: "Travel Kit",
          haschild: false,
          subCategory: [],
          target: "/collections/travel_kit?gender=WOMEN",
        },
        {
          name: "Flasks",
          haschild: false,
          subCategory: [],
          target: "/collections/flasks?gender=WOMEN",
        },
        {
          name: "Mask",
          haschild: false,
          subCategory: [],
          target: "/collections/mask?gender=WOMEN",
        },
        {
          name: "Shoe Care",
          haschild: false,
          subCategory: [],
          target: "/collections/shoe_care?gender=WOMEN",
        },
      ],
      extradivision: [
        {
          division: "Wearables",
          category: [
            {
              name: "Summer Caps",
              haschild: false,
              subCategory: [],
              target: "/collections/summer_caps?gender=WOMEN",
            },
            {
              name: "Woollen Caps",
              haschild: false,
              subCategory: [],
              target: "/collections/woollen_caps?gender=WOMEN",
            },
            {
              name: "Head Bands",
              haschild: false,
              subCategory: [],
              target: "/collections/head_bands?gender=WOMEN",
            },
            {
              name: "Gloves",
              haschild: false,
              subCategory: [],
              target: "/collections/gloves?gender=WOMEN",
            },
            {
              name: "Eyewear",
              haschild: false,
              subCategory: [],
              target: "/collections/eyewear?gender=WOMEN",
            },
          ],
        },
      ],
      extradivisionone: [
        {
          division: "Personal Care",
          category: [
            {
              name: "Towels",
              haschild: false,
              target: "/collections/towel?gender=WOMEN",
              subCategory: [],
            },
            {
              name: "Deodorants",
              haschild: false,
              target: "/collections/deodorant?gender=WOMEN",
              subCategory: [],
            },
          ],
        },
      ],
    },
  ];
  
  export const men: Division[] = [
    {
      division: "Footwear",
      category: [
        {
          name: "Boots",
          haschild: false,
          subCategory: [],
          target: "/collections/boots?gender=MEN",
        },
        {
          name: "Sneaker/Sports",
          haschild: false,
          subCategory: [],
          target: "/collections/sneakers?gender=MEN",
        },
        {
          name: "Casuals",
          haschild: true,
          subCategory: [
            {
              name: "Lace up",
              target: "/collections/casuals_lace_up?gender=MEN",
            },
            {
              name: "Slip on",
              target: "/collections/casuals_slip_on?gender=MEN",
            },
            {
              name: "Canvas",
              target: "/collections/canvas?gender=MEN",
            },
          ],
          target: "#",
        },
        {
          name: "Formal",
          haschild: true,
          subCategory: [
            {
              name: "Lace up",
              target: "/collections/formal_lace_up?gender=MEN",
            },
            {
              name: "Slip on",
              target: "/collections/formal_slip_on?gender=MEN",
            },
          ],
          target: "#",
        },
        {
          name: "Slippers/Flip-Flops",
          haschild: false,
          subCategory: [],
          target: "/collections/slippers?gender=MEN",
        },
        {
          name: "Sandals",
          haschild: true,
          subCategory: [
            {
              name: "Casual",
              target: "/collections/casual_sandals?gender=MEN",
            },
            {
              name: "Sport",
              target: "/collections/sports_sandals?gender=MEN",
            },
          ],
          target: "#",
        },
        {
          name: "Safety Shoes",
          haschild: false,
          subCategory: [],
          target: "/collections/safety_shoes?gender=MEN",
        },
      ],
    },
    {
      division: "Clothing Tops",
      category: [
        {
          name: "Jackets",
          haschild: true,
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/jackets_full_sleeve?gender=MEN",
            },
            {
              name: "Sleeve Less",
              target: "/collections/jackets_sleeve_less?gender=MEN",
            },
            {
              name: "Leather",
              target: "/collections/leather?gender=MEN",
            },
            {
              name: "Windcheater",
              target: "/collections/windcheater?gender=MEN",
            },
          ],
          target: "#",
        },
        {
          name: "T-shirts",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Polo",
              target: "/collections/polo?gender=MEN",
            },
            {
              name: "Round Tees",
              target: "/collections/round_tees?gender=MEN",
            },
            {
              name: "V-Neck",
              target: "/collections/v_neck?gender=MEN",
            },
          ],
        },
        {
          name: "Shirts",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/shirts_full_sleeve?gender=MEN",
            },
            {
              name: "Half Sleeve",
              target: "/collections/shirts_half_sleeve?gender=MEN",
            },
          ],
        },
        {
          name: "Sweaters",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Full Sleeve",
              target: "/collections/sweaters_full_sleeve?gender=MEN",
            },
            {
              name: "Sleeve Less",
              target: "/collections/sweaters_sleeve_less?gender=MEN",
            },
          ],
        },
        {
          name: "Sweatshirts & Hoodies",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Sweatshirts",
              target: "/collections/sweatshirts?gender=MEN",
            },
            {
              name: "Hoodies",
              target: "/collections/hoodies?gender=MEN",
            },
          ],
        },
        {
          name: "Innerwear Tops",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "T-Shirts",
              target: "/collections/tshirts?gender=MEN",
            },
            {
              name: "Athleisuress",
              target: "/collections/athleisure?gender=MEN",
            },
            {
              name: "Vests",
              target: "/collections/vests?gender=MEN",
            },
          ],
        },
      ],
    },
    {
      division: "Clothing Bottoms",
      category: [
        {
          name: "Bottoms",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Chinos",
              target: "/collections/chinos?gender=MEN",
            },
            {
              name: "Shorts",
              target: "/collections/shorts?gender=MEN",
            },
            {
              name: "Denims",
              target: "/collections/denims?gender=MEN",
            },
            {
              name: "Corduroys",
              target: "/collections/corduroys?gender=MEN",
            },
            {
              name: "Track Pants",
              target: "/collections/trackpants?gender=MEN",
            },
            {
              name: "Cargos",
              target: "/collections/cargo?gender=MEN",
            },
          ],
        },
        {
          name: "Innerwear Bottoms",
          haschild: true,
          target: "#",
          subCategory: [
            {
              name: "Shorts & Boxers",
              target: "/collections/shorts_&_boxers?gender=MEN",
            },
            {
              name: "Briefs & Trunks",
              target: "/collections/brief_&_trunks?gender=MEN",
            },
            {
              name: "Athleisures",
              target: "/collections/athleisures?gender=MEN",
            },
          ],
        },
      ],
      extradivision: [
        {
          division: "Bags",
          category: [
            {
              name: "Cross Body Bags",
              haschild: false,
              target: "/collections/cross_body_bag?gender=MEN",
              subCategory: [],
            },
            {
              name: "Hiking Backpacks",
              haschild: false,
              target: "/collections/hiking_backpacks?gender=MEN",
              subCategory: [],
            },
            {
              name: "Canvas Bags",
              haschild: false,
              target: "/collections/canvas_bags?gender=MEN",
              subCategory: [],
            },
            {
              name: "Backpacks",
              haschild: false,
              target: "/collections/backpacks?gender=MEN",
              subCategory: [],
            },
            {
              name: "Trolley Bags",
              haschild: false,
              target: "/collections/trolley_bags?gender=MEN",
              subCategory: [],
            },
            {
              name: "Waterproof Bags",
              haschild: false,
              target: "/collections/waterproof_bags?gender=MEN",
              subCategory: [],
            },
          ],
        },
      ],
    },
    {
      division: "Accessories",
      category: [
        {
          name: "Belts",
          haschild: false,
          target: "/collections/belts?gender=MEN",
          subCategory: [],
        },
        {
          name: "Socks",
          haschild: false,
          target: "/collections/socks?gender=MEN",
          subCategory: [],
        },
        {
          name: "Wallets/Card holders",
          haschild: false,
          target: "/collections/wallets_card_holders?gender=MEN",
          subCategory: [],
        },
        {
          name: "Lace",
          haschild: false,
          target: "/collections/lace?gender=MEN",
          subCategory: [],
        },
        {
          name: "Key Rings",
          haschild: false,
          target: "/collections/key_rings?gender=MEN",
          subCategory: [],
        },
        {
          name: "Travel Kit",
          haschild: false,
          target: "/collections/travel_kit?gender=MEN",
          subCategory: [],
        },
        {
          name: "Flasks",
          haschild: false,
          target: "/collections/flasks?gender=MEN",
          subCategory: [],
        },
        {
          name: "Mask",
          haschild: false,
          target: "/collections/mask?gender=MEN",
          subCategory: [],
        },
        {
          name: "Shoe Care",
          target: "/collections/shoe_care?gender=MEN",
          haschild: false,
          subCategory: [],
        },
      ],
      extradivision: [
        {
          division: "Wearables",
          category: [
            {
              name: "Summer Caps",
              haschild: false,
              target: "/collections/summer_caps?gender=MEN",
              subCategory: [],
            },
            {
              name: "Woollen Caps",
              haschild: false,
              target: "/collections/woollen_caps?gender=MEN",
              subCategory: [],
            },
            {
              name: "Head Bands",
              haschild: false,
              target: "/collections/head_bands?gender=MEN",
              subCategory: [],
            },
            {
              name: "Gloves",
              haschild: false,
              target: "/collections/gloves?gender=MEN",
              subCategory: [],
            },
            {
              name: "Eyewear",
              haschild: false,
              target: "/collections/eyewear?gender=MEN",
              subCategory: [],
            },
          ],
        },
      ],
      extradivisionone: [
        {
          division: "Personal Care",
          category: [
            {
              name: "Towels",
              haschild: false,
              target: "/collections/towel?gender=MEN",
              subCategory: [],
            },
            {
              name: "Deodorants",
              haschild: false,
              target: "/collections/deodorant?gender=MEN",
              subCategory: [],
            },
          ],
        },
      ],
    },
  ];