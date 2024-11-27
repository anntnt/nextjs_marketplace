'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProductCategory } from '../../../../../database/productCategories';
import type { ProductCreatePost } from '../../../../api/new-product/route';
import ErrorMessage from '../../../../ErrorMessage';

type Props = {
  sellerId: number;
  productCategories: ProductCategory[];
};

export default function ProductFormApi(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  function resetFormStates(formData: FormData) {
    formData.delete('username');
    formData.delete('price');
    formData.delete('imageUrl');
    formData.delete('description');
    formData.delete('categoryId');
  }
  async function productFormApiHandler(formData: FormData) {
    const response = await fetch('/api/new-product', {
      method: 'POST',

      // Using FormData API
      body: formData,
    });

    console.log('response.ok ', response.ok);

    if (!response.ok) {
      let newErrorMessage = 'Error creating product';
      const errorData: ProductCreatePost = await response.json();
      if ('error' in errorData) {
        newErrorMessage = errorData.error;
      }
      setErrorMessage(newErrorMessage);
      return;
    }

    router.refresh();

    setSuccessMessage('Product created successfully');
    resetFormStates(formData);
  }

  return (
    <div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          await productFormApiHandler(formData);
        }}
        className="flex flex-col justify-center gap-3 max-w-sm mx-auto"
      >
        <input name="sellerId" type="hidden" value={props.sellerId} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="name"
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Price €
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="price"
          />
        </label>

        <label>
          Select Image:
          <input
            className=" block w-full text-sm text-blue-1000 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="image"
            accept="image/*"
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
          <textarea
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="description"
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="categoryId"
          >
            <option>Please select one...</option>
            {props.productCategories.map((productCategory) => {
              return (
                <option
                  key={`key-${productCategory.id}`}
                  value={`${productCategory.id}`}
                >
                  {productCategory.categoryName}
                </option>
              );
            })}
          </select>
        </label>
        <button className=" space-x-4 text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">
          Create product
        </button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
