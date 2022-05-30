/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 *
 * @author anana
 */
@Entity
public class Client implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String clientSurname;
    private String clientNumber;
    private BigDecimal clientMoney;
    private String login;
    private String password;
    private String level;
    private String salt;
    public String getLevel() {
        return level;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public void setLevel(String level) {
        this.level = level;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    
    public String getClientName() {
        return clientName;
    }

    public String getClientSurname() {
        return clientSurname;
    }

    public String getClientNumber() {
        return clientNumber;
    }

    public BigDecimal getClientMoney() {
        return clientMoney;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public void setClientSurname(String clientSurname) {
        this.clientSurname = clientSurname;
    }

    public void setClientNumber(String clientNumber) {
        this.clientNumber = clientNumber;
    }

    public void setClientMoney(BigDecimal clientMoney) {
        this.clientMoney = clientMoney;
    }
    
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.clientName);
        hash = 79 * hash + Objects.hashCode(this.clientSurname);
        hash = 79 * hash + Objects.hashCode(this.clientNumber);
        hash = 79 * hash + Objects.hashCode(this.clientMoney);
        hash = 79 * hash + Objects.hashCode(this.login);
        hash = 79 * hash + Objects.hashCode(this.password);
        hash = 79 * hash + Objects.hashCode(this.level);
        hash = 79 * hash + Objects.hashCode(this.salt);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Client other = (Client) obj;
        if (!Objects.equals(this.clientName, other.clientName)) {
            return false;
        }
        if (!Objects.equals(this.clientSurname, other.clientSurname)) {
            return false;
        }
        if (!Objects.equals(this.clientNumber, other.clientNumber)) {
            return false;
        }
        if (!Objects.equals(this.login, other.login)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.level, other.level)) {
            return false;
        }
        if (!Objects.equals(this.salt, other.salt)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.clientMoney, other.clientMoney)) {
            return false;
        }
        return true;
    }
    

    
    
    @Override
    public String toString() {
        return "Client{" + "id=" + id + ", clientName=" + clientName + ", clientSurname=" + clientSurname + ", clientNumber=" + clientNumber + ", clientMoney=" + clientMoney + ", login=" + login + ", password=" + password + ", level=" + level + '}';
    }    
}
