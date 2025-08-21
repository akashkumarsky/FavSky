// src/components/ProductFilter.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../common/Button';

const ProductFilter = ({ onFilterChange }) => {
    const location = useLocation();

    const getInitialState = () => {
        const params = new URLSearchParams(location.search);
        return {
            category: params.getAll('category') || [],
            brand: params.getAll('brand') || [],
            color: params.getAll('color') || [],
            size: params.getAll('size') || [],
            minPrice: params.get('minPrice') || '0',
            maxPrice: params.get('maxPrice') || '1000',
            discountPercent: params.get('discountPercent') || '',
            sort: params.get('sort') || 'price_low',
        };
    };

    const [filters, setFilters] = useState(getInitialState);
    const [priceRange, setPriceRange] = useState({
        min: filters.minPrice,
        max: filters.maxPrice,
    });

    useEffect(() => {
        setFilters(getInitialState());
    }, [location.search]);

    // 🔥 Auto-apply whenever filters change
    useEffect(() => {
        onFilterChange({ ...filters, minPrice: priceRange.min, maxPrice: priceRange.max });
    }, [filters, priceRange]);

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const newValues = checked
            ? [...filters[name], value]
            : filters[name].filter((v) => v !== value);
        setFilters({ ...filters, [name]: newValues });
    };

    const handlePriceInputChange = (e) => {
        const { name, value } = e.target;
        setPriceRange({ ...priceRange, [name]: value });
    };

    const handleDiscountChange = (e) => {
        setFilters({ ...filters, discountPercent: e.target.value });
    };

    const handleSortChange = (e) => {
        setFilters({ ...filters, sort: e.target.value });
    };

    const resetFilters = () => {
        const defaultFilters = {
            category: [],
            brand: [],
            color: [],
            size: [],
            minPrice: '0',
            maxPrice: '1000',
            discountPercent: '',
            sort: 'price_low',
        };
        setFilters(defaultFilters);
        setPriceRange({ min: '0', max: '1000' });
        onFilterChange(defaultFilters);
    };

    const filterOptions = {
        categories: ['Men', 'Women', 'Kids'],
        brands: ['FavSky Basics', 'Urban Threads', 'Classic Co.'],
        colors: ['Blue', 'White', 'Black', 'Green'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        discounts: [10, 20, 30, 40, 50],
    };

    return (
        <aside
            className="lg:col-span-1 bg-white/80 backdrop-blur-lg border border-pink-100
                 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all h-fit sticky top-24"
        >
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Filters</h2>

            <div className="space-y-6">
                {/* Price Filter */}
                <details className="group transition-all" open>
                    <summary className="font-semibold cursor-pointer group-open:mb-3 text-gray-700">
                        Price
                    </summary>
                    <div className="flex items-center justify-between space-x-2 text-sm">
                        <InputField
                            label="Min"
                            name="min"
                            value={priceRange.min}
                            onChange={handlePriceInputChange}
                            type="number"
                        />
                        <span className="text-gray-400">-</span>
                        <InputField
                            label="Max"
                            name="max"
                            value={priceRange.max}
                            onChange={handlePriceInputChange}
                            type="number"
                        />
                    </div>
                </details>

                {/* Category Filter */}
                <FilterSection
                    title="Category"
                    name="category"
                    options={filterOptions.categories}
                    checkedValues={filters.category}
                    onChange={handleCheckboxChange}
                />

                {/* Brand Filter */}
                <FilterSection
                    title="Brand"
                    name="brand"
                    options={filterOptions.brands}
                    checkedValues={filters.brand}
                    onChange={handleCheckboxChange}
                />

                {/* Color Filter */}
                <FilterSection
                    title="Color"
                    name="color"
                    options={filterOptions.colors}
                    checkedValues={filters.color}
                    onChange={handleCheckboxChange}
                />

                {/* Size Filter */}
                <FilterSection
                    title="Size"
                    name="size"
                    options={filterOptions.sizes}
                    checkedValues={filters.size}
                    onChange={handleCheckboxChange}
                />

                {/* Discount Filter */}
                <details className="group" open>
                    <summary className="font-semibold cursor-pointer group-open:mb-3 text-gray-700">
                        Discount
                    </summary>
                    <div className="space-y-2">
                        {filterOptions.discounts.map((d) => (
                            <RadioInput
                                key={d}
                                name="discountPercent"
                                value={d}
                                checked={filters.discountPercent === String(d)}
                                onChange={handleDiscountChange}
                                label={`${d}% and above`}
                            />
                        ))}
                    </div>
                </details>

                {/* Sort Options */}
                <div>
                    <h3 className="font-semibold mb-2 text-gray-700">Sort By</h3>
                    <select
                        onChange={handleSortChange}
                        value={filters.sort}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm
                       focus:ring-pink-500 focus:border-pink-500 transition"
                    >
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* ✅ Reset Button Only */}
            <div className="mt-8 flex flex-col">
                <Button onClick={resetFilters} variant="secondary">
                    Reset Filters
                </Button>
            </div>
        </aside>
    );
};

// Helper Components
const FilterSection = ({ title, name, options, checkedValues, onChange }) => (
    <details className="group" open>
        <summary className="font-semibold cursor-pointer group-open:mb-3 text-gray-700">
            {title}
        </summary>
        <div className="space-y-2">
            {options.map((option) => (
                <Checkbox
                    key={option}
                    name={name}
                    value={option}
                    checked={checkedValues.includes(option)}
                    onChange={onChange}
                    label={option}
                />
            ))}
        </div>
    </details>
);

const Checkbox = ({ name, value, checked, onChange, label }) => (
    <div className="flex items-center">
        <input
            type="checkbox"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
        />
        <label
            htmlFor={`${name}-${value}`}
            className="ml-2 text-sm text-gray-600 cursor-pointer"
        >
            {label}
        </label>
    </div>
);

const RadioInput = ({ name, value, checked, onChange, label }) => (
    <div className="flex items-center">
        <input
            type="radio"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500"
        />
        <label
            htmlFor={`${name}-${value}`}
            className="ml-2 text-sm text-gray-600 cursor-pointer"
        >
            {label}
        </label>
    </div>
);

const InputField = ({ label, ...props }) => (
    <div className="w-full">
        <label className="text-xs text-gray-500">{label}</label>
        <input
            {...props}
            className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-pink-500 focus:border-pink-500 transition"
        />
    </div>
);

export default ProductFilter;
