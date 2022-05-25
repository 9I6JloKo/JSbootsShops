package entities;

import java.time.LocalDate;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-05-25T11:25:26")
@StaticMetamodel(History.class)
public class History_ { 

    public static volatile SingularAttribute<History, String> product;
    public static volatile SingularAttribute<History, Date> dateOfBuying;
    public static volatile SingularAttribute<History, Double> size;
    public static volatile SingularAttribute<History, String> clientName;
    public static volatile SingularAttribute<History, Long> id;
    public static volatile SingularAttribute<History, String> clientNumber;
    public static volatile SingularAttribute<History, LocalDate> localDate;

}