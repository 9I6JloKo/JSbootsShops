/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entities.Client;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author anana
 */
@Stateless
public class ClientFacade extends AbstractFacade<Client> {

    @PersistenceContext(unitName = "BootsShopJSPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ClientFacade() {
        super(Client.class);
    }
    public Client findByLogin(String login) {
        try {
            return (Client) em.createQuery("SELECT c FROM Client c WHERE c.login=:login")
                    .setParameter("login", login)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
}
