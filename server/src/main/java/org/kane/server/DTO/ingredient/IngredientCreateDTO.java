package org.kane.server.DTO.ingredient;

import lombok.Data;

@Data
public class IngredientCreateDTO {
    private Long productID;
    private Double amount;
    private Long measureUnitID;
}
