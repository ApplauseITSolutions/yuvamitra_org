// data/menuData.js
export const menu = [
  { title: "Home", path: "/" },
  {
    title: "About Us",
    children: [
      { name: "About Yuva Mitra", path: "/about/about-yuva-mitra" },
      { name: "Our History", path: "/about/our-history" },
      { name: "Advisory Board", path: "/about/advisory-board" },
      { name: "Trustees" , path: "/about/trustees"},
      { name:"Leadership Team",path: "/about/leadership-team"}
    ],
  },
  
  {
    title: "Programs",
    children: [
  {
    name: "Water Resourse Developement & Management",
    path: "/programs/category/water",
  },
  {
    name: "Livelihood & Skill Developement",
    path: "/programs/category/livelihood",
  },
  {
    name: "Institute Building and Sustainable Agriculture",
    path: "/programs/category/agriculture",
  },
  {
    name: "Health and Education",
    path: "/programs/category/health",
  },
 ]
  },

  {
    title: "Resources",
    children: [
      { name: "Financials", path: "/resources/financials" }
    ],
  },
  { title: "Careers", path: "/careers" },
  { title: "Contact Us", path: "/contact" },
];