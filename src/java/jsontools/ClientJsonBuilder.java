/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsontools;

import entities.Client;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author pupil
 */
public class ClientJsonBuilder {
    public JsonArray getUsersJsonArray(List<Client> listClients){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i=0;i<listClients.size();i++){
            jab.add(getClientJsonObject(listClients.get(i)));
        }
        return jab.build();
    }
    public JsonObject getClientJsonObject(Client client){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", client.getId());
        job.add("firstname", client.getClientName());
        job.add("lastname", client.getClientSurname());
        job.add("login", client.getLogin());
        return job.build();
    }
}
