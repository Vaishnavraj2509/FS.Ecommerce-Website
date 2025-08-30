package com.SSS.Ecommerce.repository;

import com.SSS.Ecommerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Category findByName(String name);

    @Query("Select c from Category Where c.name=:name And c.parentCategory.name=:parentCategoryName")
   public Category findByNameAndParant(String parantCategoryName, String name);
}
