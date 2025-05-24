import type { Product, ProductImage } from "@/types"

// Use different images to show transition effects
const frontImage =
  "https://shoptommy.scene7.com/is/image/ShopTommy/78JB151_C1O_FNT?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"
const backImage =
  "https://shoptommy.scene7.com/is/image/ShopTommy/78JB151_C1O_BCK?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"

// Intentionally unavailable images for testing error handling
const unavailableImage1 = "https://shoptommy.scene7.com/is/image/ShopTommy/unavailable-image-1"
const unavailableImage2 = "https://shoptommy.scene7.com/is/image/ShopTommy/unavailable-image-2"

export const productImages: ProductImage[] = [
  {
    src: frontImage,
    alt: "Hilfiger 1985 Logo T-Shirt - Front View",
  },
  {
    src: backImage,
    alt: "Hilfiger 1985 Logo T-Shirt - Back View",
  },
  {
    src: unavailableImage1,
    alt: "Hilfiger 1985 Logo T-Shirt - Side View (Unavailable)",
  },
  {
    src: unavailableImage2,
    alt: "Hilfiger 1985 Logo T-Shirt - Detail View (Unavailable)",
  },
]

export const moreLikeThisProducts: Product[] = [
  {
    id: 1,
    src: frontImage,
    alt: "Green T-Shirt with TH Logo",
    name: "TH Logo T-Shirt",
    price: 34.5,
    salePrice: 24.15, // 30% off
    discount: "30% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 2,
    src: frontImage,
    alt: "Green Hilfiger 1985 T-Shirt",
    name: "Hilfiger 1985 T-Shirt",
    price: 39.5,
    salePrice: 23.7, // 40% off
    discount: "40% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 3,
    src: frontImage,
    alt: "Green Tommy Script T-Shirt",
    name: "Tommy Script T-Shirt",
    price: 29.99,
    salePrice: 20.99, // 30% off
    discount: "30% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 4,
    src: frontImage,
    alt: "Green Hilfiger Embroidered T-Shirt",
    name: "Hilfiger Embroidered T-Shirt",
    price: 42.5,
    salePrice: 29.75, // 30% off
    discount: "30% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 5,
    src: frontImage,
    alt: "Green Essential T-Shirt",
    name: "Essential T-Shirt",
    price: 24.99,
    salePrice: 17.49, // 30% off
    discount: "30% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 6,
    src: frontImage,
    alt: "Green Classic T-Shirt",
    name: "Classic T-Shirt",
    price: 29.99,
    salePrice: 22.49, // 25% off
    discount: "25% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
  {
    id: 7,
    src: frontImage,
    alt: "Green Striped T-Shirt",
    name: "Striped T-Shirt",
    price: 34.99,
    salePrice: 24.49, // 30% off
    discount: "30% off",
    colors: ["red", "navy", "white", "lightblue", "gray", "green", "pink"],
    currentColor: "Fort Green",
    images: [frontImage, backImage, unavailableImage1, unavailableImage2],
  },
]
