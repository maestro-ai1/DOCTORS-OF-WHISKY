import React from 'react';
import { PRODUCTS } from '@/lib/data/products';
import { slimProducts } from '@/lib/slim-products';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return <SearchClient products={slimProducts(PRODUCTS)} />;
}
