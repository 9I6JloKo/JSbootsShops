package entities;

import entities.Client;
import entities.Product;
import java.util.Calendar;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-06-07T18:44:14")
@StaticMetamodel(History.class)
public class History_ { 

    public static volatile SingularAttribute<History, Product> product;
    public static volatile SingularAttribute<History, Calendar> dateOfBuying;
    public static volatile SingularAttribute<History, Client> client;
    public static volatile SingularAttribute<History, Long> id;
    public static volatile SingularAttribute<History, String> productPrice;

}