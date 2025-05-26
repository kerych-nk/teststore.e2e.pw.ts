import { FilterSections } from "../components/FilterSections.component";
import { ProductDescription } from "../components/ProductDescription.component";
import { BasePage } from "./BasePage";

export class CategoryPage extends BasePage {
  private readonly pageUrl: string = "?controller=category&id_category=3";
  private productDescription: ProductDescription;
  private filterSections: FilterSections;
}
