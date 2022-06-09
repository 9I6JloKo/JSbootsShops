
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsontools;

import entities.Product;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 */
public class ShoeJsonBuilder {
    public JsonArray getShoesJsonArray(List<Product> listProducts){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i=0;i<listProducts.size();i++){
            jab.add(getShoesJsonObject(listProducts.get(i)));
        }
        return jab.build();
    }
    public JsonObject getShoesJsonObject(Product product){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", product.getId());
        job.add("productModell", product.getModell());
        job.add("productFirm", product.getBywho());
        job.add("productPrice", product.getPrice());
        job.add("productPiece", product.getPiece());
        job.add("productSize", product.getSize());
        job.add("productPath", product.getPathToFile());
        return job.build();
    }
}