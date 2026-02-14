export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface ServiceData {
  [key: string]: ServiceItem[];
}

export const SERVICE_DATA: ServiceData = {
  Ironing: [
    { id: 'i1', title: 'Shirt Iron', price: '15', image: 'https://images.pexels.com/photos/4107227/pexels-photo-4107227.jpeg' },
    { id: 'i2', title: 'Pant Iron', price: '15', image: 'https://images.pexels.com/photos/7641253/pexels-photo-7641253.jpeg' },
    { id: 'i3', title: 'Saree Iron', price: '50', image: 'https://images.pexels.com/photos/35399683/pexels-photo-35399683.jpeg' },
    { id: 'i4', title: 'Coat Iron', price: '80', image: 'https://images.pexels.com/photos/8790753/pexels-photo-8790753.jpeg' },
  ],
  Washing: [
    { id: 'w1', title: 'T-Shirt Wash', price: '30', image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg' },
    { id: 'w2', title: 'Jeans Wash', price: '50', image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg' },
    { id: 'w3', title: 'Bed Sheet', price: '100', image: 'https://images.pexels.com/photos/7765000/pexels-photo-7765000.jpeg' },
    { id: 'w4', title: 'Blanket', price: '250', image: 'https://images.pexels.com/photos/4886896/pexels-photo-4886896.jpeg' },
  ],
  'Dry Clean': [
    { id: 'd1', title: 'Suit Set', price: '350', image: 'https://images.unsplash.com/photo-1594932224828-b4b057b69b2d?q=80&w=200' },
    { id: 'd2', title: 'Silk Saree', price: '250', image: 'https://images.unsplash.com/photo-1610030469983-98e55ec3e6c3?q=80&w=200' },
    { id: 'd3', title: 'Leather Jacket', price: '500', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=200' },
  ],
  Carpet: [
    { id: 'c1', title: 'Small Rug', price: '400', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=200' },
    { id: 'c2', title: 'Large Carpet', price: '1200', image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=200' },
  ],
};

export const SERVICES = [
  { id: 1, name: 'Ironing', icon: 'iron', type: 'MaterialCommunityIcons' },
  {
    id: 2,
    name: 'Washing',
    icon: 'local-laundry-service',
    type: 'MaterialIcons',
  },
  { id: 3, name: 'Dry Clean', icon: 'dry-cleaning', type: 'MaterialIcons' },
  { id: 4, name: 'Folding', icon: 'wb-iridescent', type: 'MaterialIcons' },
  { id: 5, name: 'Stain Remove', icon: 'dirty-lens', type: 'MaterialIcons' },

  { id: 6, name: 'Carpet', icon: 'layers', type: 'MaterialIcons' },
];

export const OFFERS = [
  {
    id: '1',
    title: '50% Off on Ironing',
    description: 'Limited time offer on all ironing services',
    image: require('../../assets/img/offer2.png'),
  },
  {
    id: '2',
    title: 'Flat ₹100 Off',
    description: 'On orders above ₹499',
    image: require('../../assets/img/offer3.png'),
  },
  {
    id: '3',
    title: 'Free Pickup',
    description: 'Free pickup & delivery this weekend',
    image: require('../../assets/img/offer1.png'),
  },
  {
    id: '4',
    title: 'Dry Clean Special',
    description: '30% off on dry cleaning',
    image: require('../../assets/img/offer4.png'),
  },
];