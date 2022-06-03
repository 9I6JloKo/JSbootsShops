/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 *
 * @author anana
 */
@Entity
public class Product implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modell;
    private String size;
    private String bywho;
    private String price;
    private int piece;
    private int maxPiece;
    
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    
    public int getMaxPiece() {
        return maxPiece;
    }
    
    public int getPiece() {
        return piece;
    }
    
    public String getModell() {
        return modell;
    }

    public BigDecimal getSize() {
        return new BigDecimal(size);
    }

    public String getBywho() {
        return bywho;
    }

    public BigDecimal getPrice() {
        return new BigDecimal(price);
    }

    public void setModell(String modell) {
        this.modell = modell;
    }

    public void setSize(BigDecimal size) {
        this.size = size.toString();
    }

    public void setBywho(String bywho) {
        this.bywho = bywho;
    }

    public void setPrice(BigDecimal price) {
        this.price = price.toString();
    }

    public void setMaxPiece(int maxPiece) {
        this.maxPiece = maxPiece;
    }

    public void setPiece(int piece) {
        this.piece = piece;
    }
    
    @Override
    public String toString() {
        return "О продукте: [Продавец: " + bywho + "; \tМодель(подробная): " + modell + "; \tЦена: " + price + "; \tРазмер: " + size + "; \tКол-во: " + piece + "]";
    }
}
