import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/Product/ProductContext';
import ProductCard from '../../components/ProductCard';
import { filters, singleFilter } from './FilterData';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import Pagination from '../../components/Pagination';

const Product = () => {
    const { products, pagination, loading } = useContext(ProductContext);
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    // Read the 1-based index from the URL, default to page 1
    const pageNumberFromUrl = parseInt(searchParams.get('pageNumber')) || 1;
    // Convert to 0-based index for the component's `forcePage` prop
    const currentPage = pageNumberFromUrl > 0 ? pageNumberFromUrl - 1 : 0;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (!params.has('pageSize')) {
            params.set('pageSize', '12');
            navigate({ search: `?${params.toString()}` }, { replace: true });
        }
    }, []);

    const handlePageChange = (event) => {
        const searchParams = new URLSearchParams(location.search);
        // Set the URL to be 1-based for user-friendliness
        searchParams.set('pageNumber', event.selected + 1);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    // ... (handleFilter and handleRadioFilterChange remain the same) ...
    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        let filterValue = searchParams.getAll(sectionId);

        if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
            filterValue = filterValue[0].split(',').filter((item) => item !== value);
            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            } else {
                searchParams.set(sectionId, filterValue.join(','));
            }
        } else {
            filterValue.push(value);
            searchParams.set(sectionId, filterValue.join(','));
        }
        searchParams.set('pageNumber', 1); // Reset to first page
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    const handleRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, e.target.value);
        searchParams.set('pageNumber', 1); // Reset to first page
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    onChange={() => handleFilter(option.value, section.id)}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                                {singleFilter.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    onChange={(e) => handleRadioFilterChange(e, section.id)}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="radio"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                            <div className="lg:col-span-3">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {products.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                        <Pagination
                                            pageCount={pagination.totalPages}
                                            onPageChange={handlePageChange}
                                            forcePage={currentPage}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Product;