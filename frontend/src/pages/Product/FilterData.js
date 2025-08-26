export const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'top', label: 'Top' },
      { value: 'men_jeans', label: 'Jeans' },
      { value: 'Women', label: 'Dresses' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
    ],
  },
];

export const singleFilter = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '0-100000', label: '$0 To $100000' },
      { value: '100-499', label: '$100 To $499' },
      { value: '500-999', label: '$500 To $999' },
      { value: '1000-2000', label: '$1000 To $2000' },
    ],
  },
  {
    id: 'minDiscount', // Changed from "discount"
    name: 'Discount Range',
    options: [
      { value: '10', label: '10% And Above' },
      { value: '20', label: '20% And Above' },
      { value: '30', label: '30% And Above' },
      { value: '40', label: '40% And Above' },
      { value: '50', label: '50% And Above' },
      { value: '60', label: '60% And Above' },
    ],
  },
  {
    id: 'size', // Moved from filters array
    name: 'Size',
    options: [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
    ],
  },
  {
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out_of_stock', label: 'Out Of Stock' },
    ],
  },
];
