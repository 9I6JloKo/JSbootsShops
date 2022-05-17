/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;
import java.io.Serializable;
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
    private Double size;
    private String bywho;
    private Double price;
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

    public Double getSize() {
        return size;
    }

    public String getBywho() {
        return bywho;
    }

    public Double getPrice() {
        return price;
    }

    public void setModell(String modell) {
        this.modell = modell;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public void setBywho(String bywho) {
        this.bywho = bywho;
    }

    public void setPrice(Double price) {
        this.price = price;
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
