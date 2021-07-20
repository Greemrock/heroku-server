import { Category } from './category';

export const categoriesStore: Category[] = [
  {
    id: 1,
    name: 'Action setA',
    iconSrc: '/assets/images/cry.jpg',
  },
  {
    id: 2,
    name: 'Action setB',
    iconSrc: '/assets/images/open.jpg',
  },
  {
    id: 3,
    name: 'Animal setA',
    iconSrc: '/assets/images/cat.jpg',
  },
  {
    id: 4,
    name: 'Animal setB',
    iconSrc: '/assets/images/bird.jpg',
  },
  {
    id: 5,
    name: 'Clothes',
    iconSrc: '/assets/images/skirt.jpg',
  },
  {
    id: 6,
    name: 'Emotions',
    iconSrc: '/assets/images/sad.jpg',
  },
  {
    id: 7,
    name: 'Body Parts',
    iconSrc: '/assets/images/eye.jpg',
  },
  {
    id: 8,
    name: 'Vegetable',
    iconSrc: '/assets/images/cabbage.jpg',
  },
];

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categoriesStore);
}

export function getCategoryById(
  categoryId: number,
): Promise<Category | undefined> {
  return Promise.resolve(categoriesStore.find((cat) => cat.id === categoryId));
}

export function createCategory(category: { name: string }): Promise<Category> {
  const isExist = typeof categoriesStore.find(
    (cat) => cat.name.toLowerCase() === category.name.toLowerCase(),
  ) !== 'undefined';
  if (isExist) {
    return Promise.reject(
      new Error(`Category with name ${category.name} is already exists`),
    );
  }

  const id = categoriesStore.length + 1;
  const iconSrc = '';
  const model = { ...category, id, iconSrc };
  categoriesStore.push(model);

  return Promise.resolve(model);
}

export function updateCategory(
  id: number,
  categoryData: Category,
): Promise<Category> {
  const selectedCategory = categoriesStore.find(
    (category) => category.id === categoryData.id,
  );
  if (selectedCategory === undefined) {
    return Promise.reject(
      new Error(`Category with id ${categoryData.id} doesn't exist`),
    );
  }

  selectedCategory.name = categoryData.name;
  selectedCategory.iconSrc = categoryData.iconSrc;
  return Promise.resolve(selectedCategory);
}

export function deleteCategory(id: number): Promise<void> {
  const index = categoriesStore.findIndex((cat) => cat.id === id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  categoriesStore.splice(index, 1);
  return Promise.resolve();
}
