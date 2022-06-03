/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.GregorianCalendar;
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
    private Calendar dateOfBuying;
    private Product product;
    private String productPrice;
    private Client client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getDateOfBuying() {
        return dateOfBuying;
    }

    public void setDateOfBuying(Date dateOfBuying) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(dateOfBuying);
        this.dateOfBuying = calendar;
    }
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getProductPrice() {
        
        return new BigDecimal(productPrice);
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice.toString();
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "History{" + "id=" + id + ", dateOfBuying=" + dateOfBuying + ", product=" + product + ", productPrice=" + productPrice + ", client=" + client + '}';
    }
    
    
    
    
}

// localDate.minusWeeks(2).getDayOfMonth() + "." + localDate.minusWeeks(2).getMonthValue() + "." + localDate.minusWeeks(2).getYear() + "; \tВремя, до которого возможно вернуть: " + localDate.getDayOfMonth() + "." + localDate.getMonthValue() + "." + localDate.getYear()