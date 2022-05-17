/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;
import java.io.Serializable;
import java.util.Date;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
/**
 *
 * @author anana
 */
@Entity
public class History implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dateOfBuying;
    private String clientNumber;
    private String product;
    private Double size;
    private String clientName;
    private LocalDate localDate;
    
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    
    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Double getSize() {
        return size;
    }
    
    public Date getDateOfBuying() {
        return dateOfBuying;
    }

    public String getClientNumber() {
        return clientNumber;
    }

    public String getProduct() {
        return product;
    }

    public void setDateOfBuying(Date dateOfBuying) {
        this.dateOfBuying = dateOfBuying;
        
    }

    public void setClientNumber(String clientNumber) {
        this.clientNumber = clientNumber;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }
    
    @Override
    public String toString(){
        return "Об истории: [" + "Номер покупателя: " + clientNumber + "; \tЕго имя: " + clientName + "; \tМодель(подробная): " + product + "; \tРазмер: " + size + "; \tДата покупки: " + 
                localDate.minusWeeks(2).getDayOfMonth() + "." + localDate.minusWeeks(2).getMonthValue() + "." + localDate.minusWeeks(2).getYear() + "; \tВремя, до которого возможно вернуть: " + localDate.getDayOfMonth() + "." + localDate.getMonthValue() + "." + localDate.getYear() + "]";
    }
    
}
