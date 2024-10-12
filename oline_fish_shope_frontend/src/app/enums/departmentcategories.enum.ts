import { Category } from "./category.enum";
import { Department } from "./department";

export const DepartmentCategories: Record<Department, Category[]> = {
  [Department.CAVIAR_ROE]: [
    Category.Caviar,
    Category.Anchovies,
    Category.SmokedSeafood,
  ],
  [Department.CLAMS_OYSTERS]: [
    Category.Clams,
    Category.Oysters,
  ],
  [Department.CRAB_LOBSTER_SHRIMP]: [
    Category.Crab,
    Category.Lobster,
    Category.Shrimp,
    Category.Mussels,
    Category.Squid,
  ],
  [Department.CURATED_BY_FULTON]: [
    Category.CuratedByFulton,
    Category.Bundles,
  ],
  [Department.FISH]: [
    Category.Cod,
    Category.Halibut,
    Category.Trout,
    Category.Salmon,
    Category.Tuna,
    Category.Swordfish,
    Category.Snapper,
  ],
  [Department.MUSSELS_SCALLOPS]: [
    Category.Mussels,
    Category.Scallops,
  ],
  [Department.OCTOPUS_SQUID]: [
    Category.Octopus,
    Category.Squid,
  ],
  [Department.PANTRY_MERCHANDISE]: [
    Category.Books,
    Category.KitchenTools,
    Category.SaucesSpices,
  ],
  [Department.PREPARED_READY_TO_EAT]: [
    Category.Burgers,
    Category.Cakes,
    Category.Bundles,
  ],
};
