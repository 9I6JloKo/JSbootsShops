package entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-05-27T11:17:30")
@StaticMetamodel(Client.class)
public class Client_ { 

    public static volatile SingularAttribute<Client, Double> clientMoney;
    public static volatile SingularAttribute<Client, String> password;
    public static volatile SingularAttribute<Client, String> salt;
    public static volatile SingularAttribute<Client, String> clientName;
    public static volatile SingularAttribute<Client, String> level;
    public static volatile SingularAttribute<Client, String> clientSurname;
    public static volatile SingularAttribute<Client, Long> id;
    public static volatile SingularAttribute<Client, String> clientNumber;
    public static volatile SingularAttribute<Client, String> login;

}