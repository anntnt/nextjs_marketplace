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
  const [name, setName] = useState('');

  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const router = useRouter();

  function resetFormStates() {
    setName('');
    setPrice('');
    setImageUrl('');
    setDescription('');
    setCategoryId('');
  }
  async function productFormApiHandler(formData: FormData) {
    const response = await fetch('/api/new-product', {
      method: 'POST',

      // Using FormData API
      body: formData,
    });

    if (!response.ok) {
      let newErrorMessage = 'Error creating product';
      const errorData: ProductCreatePost = await response.json();
      if ('error' in errorData) {
        newErrorMessage = errorData.error;
      }
      setErrorMessage(newErrorMessage);
      return;
    }

    setSuccessMessage('Product created successfully');
    resetFormStates();
    router.refresh();
  }

  return (
    <div>
      {successMessage && (
        <p className="mx-auto flex max-w-sm flex-col justify-center gap-3 py-8 text-md font-semibold text-brand-accent">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const priceValue = formData.get('price');
          if (priceValue) {
            const priceNumber = Number(priceValue);
            const cents = Number.isNaN(priceNumber)
              ? 0
              : Math.round(priceNumber * 100);
            formData.set('price', String(cents));
          }

          await productFormApiHandler(formData);
        }}
        className="mx-auto flex max-w-sm flex-col justify-center gap-3 py-8 text-brand-text dark:text-dark-text"
      >
        <input name="sellerId" type="hidden" value={props.sellerId} />
        <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
          Name
          <input
            className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            required
            name="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
          Price €
          <input
            value={price}
            type="number"
            step="0.01"
            className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            required
            name="price"
            onChange={(event) => setPrice(event.currentTarget.value)}
          />
        </label>

        <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
          Select Image:
          <input
            value={imageUrl}
            className="block w-full cursor-pointer rounded-lg border border-brand-muted/30 bg-brand-surface text-sm text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-brand-primary"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => setImageUrl(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
          Description
          <textarea
            value={description}
            className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            rows={8}
            required
            name="description"
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
          Category
          <select
            value={categoryId}
            className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text"
            name="categoryId"
            onChange={(event) => setCategoryId(event.currentTarget.value)}
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
        <button className="me-2 inline-flex items-center justify-center gap-2 rounded-lg border border-brand-primary bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
          Create product
        </button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
