'use client';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProductCategory } from '../../../../../database/productCategories';
import type { Product } from '../../../../../database/products';
import ErrorMessage from '../../../../ErrorMessage';

type Props = {
  username: String;
  product: Product;
  productCategories: ProductCategory[];
};

export default function EditProductFormApi(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState(props.product?.name);
  const [price, setPrice] = useState(props.product?.price);
  const [description, setDescription] = useState(props.product?.description);
  const [categoryId, setCategoryId] = useState(props.product?.categoryId);

  const router = useRouter();

  function resetFormStates(formData: FormData) {
    formData.delete('username');
    formData.delete('price');
    formData.delete('imageUrl');
    formData.delete('description');
    formData.delete('categoryId');
  }
  async function updateProductFormApiHandler(formData: FormData) {
    const response = await fetch('/api/edit-product', {
      method: 'PUT',

      // Using FormData API
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.error);
      return;
    }

    const data = await response.json();

    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    router.refresh();

    setSuccessMessage('Product updated successfully');
    //resetFormStates;
    redirect(`/profile/${props.username}/business/`);
  }

  return (
    <div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          updateProductFormApiHandler(formData);
        }}
        className="flex flex-col justify-center gap-3 max-w-sm mx-auto"
      >
        {' '}
        <input name="productId" type="hidden" value={props.product.id} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
          <input
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="name"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Price €
          <input
            value={price}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="price"
            onChange={(event) => setPrice(Number(event.currentTarget.value))}
          />
        </label>
        <div className="block mb-2 ">
          <Image
            src={props.product.imageUrl}
            width={500}
            height={375}
            alt={`Product ${name}`}
          />
        </div>
        <label>
          Select new image:
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
            value={description}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="description"
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category
          <select
            value={categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="categoryId"
            onChange={(event) =>
              setCategoryId(Number(event.currentTarget.value))
            }
          >
            <option>Please select one...</option>
            {props.productCategories.map((productCategory) => {
              return (
                <option value={`${productCategory.id}`}>
                  {productCategory.categoryName}
                </option>
              );
            })}
          </select>
        </label>
        <button
          type="submit"
          className=" space-x-4 text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
        >
          Update product
        </button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
