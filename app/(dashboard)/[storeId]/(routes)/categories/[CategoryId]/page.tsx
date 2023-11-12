import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

interface CategoryPageProps {
  category: any
  billboards: any
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, billboards }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  params: { categoryId: string; storeId: string };
}) {
  const { categoryId, storeId } = context.params;

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });
  console.log("🚀 ~ file: page.tsx:30 ~ billboards:", billboards);

  return {
    props: {
      category,
      billboards,
    },
  };
}

export default CategoryPage;
