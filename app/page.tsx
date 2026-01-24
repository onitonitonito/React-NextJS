"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';

type SortField = 'name' | 'price' | 'category';
type SortDirection = 'asc' | 'desc';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection }>({
    field: 'name',
    direction: 'asc',
  });

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((product) => product.category))];
  }, []);

  // 정렬 및 필터링된 상품 목록
  const filteredAndSortedProducts = useMemo(() => {
    // 필터링
    let result = [...products];

    // 검색어로 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          (product.category || '').toLowerCase().includes(term) ||
          (product.description || '').toLowerCase().includes(term) ||
          product.price.toString().includes(term)
      );
    }

    // 카테고리로 필터링
    if (categoryFilter !== 'all') {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // 정렬
    return [...result].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.field === 'price') {
        aValue = a.price;
        bValue = b.price;
      } else if (sortConfig.field === 'category') {
        aValue = a.category;
        bValue = b.category;
      } else {
        aValue = a.name;
        bValue = b.name;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [products, searchTerm, categoryFilter, sortConfig]);

  // 정렬 핸들러
  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // 정렬 방향 아이콘
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return <span>↕️</span>;
    return sortConfig.direction === 'asc' ? <span>⬆️</span> : <span>⬇️</span>;
  };

  return (
    <main className="container mx-auto p-2 max-w-6xl">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">🛒 상품 목록</h1>

        {/* 검색 및 필터링 섹션 */}
        <div className="mb-3 space-y-1">
          <div className="flex flex-col sm:flex-row gap-1">
            <div className="flex-1">
              <input
                type="text"
                placeholder="상품명, 카테고리, 가격으로 검색..."
                className="w-full p-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="p-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? '전체' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-gray-500 text-right">
            {filteredAndSortedProducts.length}개 상품
          </div>
        </div>

        {/* 상품 테이블 */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-100 text-xs">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500">
                <th className="px-1 py-1 text-center w-8">No.</th>
                <th className="px-1 py-1 text-left w-16">분류</th>
                <th
                  className="px-1 py-1 text-left cursor-pointer min-w-[100px]"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    상품명
                    <span className="ml-0.5 text-[10px]"><SortIcon field="name" /></span>
                  </div>
                </th>
                <th
                  className="px-1 py-1 text-right cursor-pointer w-24"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end">
                    가격
                    <span className="ml-0.5 text-[10px]"><SortIcon field="price" /></span>
                  </div>
                </th>
                <th className="px-1 py-1 text-center w-16">단위</th>
                <th className="px-1 py-1 text-left hidden md:table-cell">설명</th>
                <th className="px-1 py-1 text-center w-16">재고</th>
                <th className="px-1 py-1 text-center w-12">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedProducts.map((product, index) => {
                const stock = product.stock;
                const stockStatus = stock > 30 ? 'text-green-600' : stock > 10 ? 'text-yellow-600' : 'text-red-600';

                return (
                  <tr key={product.id} className="hover:bg-gray-50 text-xs">
                    <td className="px-1 py-1 text-center text-gray-500">{index + 1}</td>
                    <td className="px-1 py-1 whitespace-nowrap">
                      <span className="text-gray-600">{product.category || '-'}</span>
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap">
                      <Link
                        href={`/list#product-${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-right font-medium">
                      {product.price.toLocaleString()}원
                    </td>
                    <td className="px-1 py-1 text-center text-gray-600">
                      {product.unit || '-'}
                    </td>
                    <td className="px-1 py-1 hidden md:table-cell max-w-[200px] truncate" title={product.description || ''}>
                      <span className="text-gray-500 text-xs">{product.description || '-'}</span>
                    </td>
                    <td className={`px-1 py-1 text-center font-medium ${stockStatus}`}>
                      {stock}개
                    </td>
                    <td className="px-1 py-1 text-center">
                      <Link
                        href={`/list#product-${product.id}`}
                        className="text-blue-500 hover:underline text-xs"
                      >
                        보기
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filteredAndSortedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-2 py-3 text-center text-gray-400 text-xs">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
