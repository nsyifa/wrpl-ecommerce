export const menuItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Category",
    submenu: [
      {
        title: "Cosmetic",
        url: "products/cosmetic",
      },
      {
        title: "Perfume",
        url: "products/perfume",
      },
      {
        title: "Clothing",
        url: "products/clothing",
      },
    ],
  },
  {
    title: "Brand",
    submenu: [
      {
        title: "Cosmetic", 
        submenu: [
          {
            title: "FRESH",
            url: "products/fresh",
          }, 
          {
            title: "LA MER",
            url: "products/la-mer",
          }, 
          {
            title: "DRUNK ELEPHANT",
            url: "products/drunk-elephant",
          }, 
          {
            title: "LANEIGE",
            url: "products/laneige",
          }, 
          {
            title: "SUNDAY RILEY",
            url: "products/sunday-riley",
          }, 
          {
            title: "TATCHA",
            url: "products/tatcha",
          }, 
          {
            title: "SK-II",
            url: "products/sk-ii",
          }, 
        ]
      },
      {
        title: "Perfume", 
        submenu: [
          {
            title: "BDK Parfums",
            url: "products/bdk-parfums",
          }, 
          {
            title: "Vilhelm Parfumerie",
            url: "products/vilhelm-parfumerie",
          }, 
          {
            title: "Rook Perfumes",
            url: "products/rook-perfumes",
          },
          {
            title: "PRIN",
            url: "products/prin",
          },
        ]
      },
      {
        title: "Clothing", 
        submenu: [
          {
            title: "PARX",
            url: "products/parx",
          },
          {
            title: "SPYKAR",
            url: "products/spykar",
          },
          {
            title: "SEJ by Nisha Gupta",
            url: "products/sej",
          },
          {
            title: "PARFAIT",
            url: "products/parfait",
          },
          {
            title: "Gini and Jony",
            url: "products/Gini and Jony",
          },
        ]
      },
      {
        title: "Others",
        url: "products/others",
      },
    ],
  },
];
