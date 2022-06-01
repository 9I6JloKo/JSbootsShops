package entities;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-06-01T23:03:20")
@StaticMetamodel(Client.class)
public class Client_ { 

    public static volatile SingularAttribute<Client, BigDecimal> clientMoney;
    public static volatile SingularAttribute<Client, String> password;
    public static volatile SingularAttribute<Client, String> salt;
    public static volatile SingularAttribute<Client, String> clientName;
    public static volatile SingularAttribute<Client, String> level;
    public static volatile SingularAttribute<Client, String> clientSurname;
    public static volatile SingularAttribute<Client, Long> id;
    public static volatile SingularAttribute<Client, String> clientNumber;
    public static volatile SingularAttribute<Client, String> login;

}