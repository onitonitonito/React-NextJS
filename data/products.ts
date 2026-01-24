export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  unit?: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: '토마토',
    price: 10_000,
    image: '/food-img/food-00.jpg',
    category: '채소',
    description: '신선한 국내산 토마토',
    unit: '1box',
    stock: 50
  },
  {
    id: 2,
    name: '감자',
    price: 7_500,
    image: '/food-img/food-01.jpg',
    category: '채소',
    description: '고구마처럼 달콤한 햇감자',
    unit: '1box',
    stock: 30
  },
  {
    id: 3,
    name: '양파',
    price: 5_500,
    image: '/food-img/food-02.jpg',
    category: '채소',
    description: '맛과 향이 풍부한 양파',
    unit: '1망',
    stock: 100
  },
  {
    id: 4,
    name: '파스타면',
    price: 45_000,
    image: '/food-img/food-03.jpg',
    category: '가공식품',
    description: '이탈리아 정통 파스타 면',
    unit: '1봉',
    stock: 25
  },
  {
    id: 5,
    name: '캐찹',
    price: 75_000,
    image: '/food-img/food-04.jpg',
    category: '소스/조미료',
    description: '신선한 토마토로 만든 캐찹',
    unit: '1병',
    stock: 5
  }
];
