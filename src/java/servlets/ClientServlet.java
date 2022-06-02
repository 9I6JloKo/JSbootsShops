/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entities.Client;
import entities.Product;
import facades.ClientFacade;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jsontools.ClientJsonBuilder;
import jsontools.ShoeJsonBuilder;
import tools.PasswordProtected;

/**
 *
 * @author anana
 */
@WebServlet(name = "ClientServlet", urlPatterns = {
    "/sendClient",
    "/getClientOptions",
    "/fillInputsClient",
    "/editClient",
})
public class ClientServlet extends HttpServlet {
    @EJB ClientFacade clientFacade;
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String path = request.getServletPath();
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        String clientName = "";
        String clientSurname = "";
        String clientNumber = "";
        int lengthNumber = 0;
        int scaleMoney = 5;
        String clientLogin = "";
        String clientPassword = "";
        switch(path){
            case "/sendClient":
                try{
                    JsonReader jr = Json.createReader(request.getReader());
                    JsonObject jo = jr.readObject();
                    clientName = jo.getString("clientName", "");
                    clientSurname = jo.getString("clientSurname", "");
                    clientNumber = jo.getString("clientNumber", "");
                    lengthNumber = clientNumber.length();
                    BigDecimal clientMoney = new BigDecimal(jo.getString("clientMoney", ""));
                    scaleMoney = new BigDecimal(jo.getString("clientMoney", "")).scale();
                    clientLogin = jo.getString("clientLogin", "");
                    clientPassword = jo.getString("clientPassword", "");
                    PasswordProtected pp = new PasswordProtected();
                    String salt = pp.getSalt();
                    Client clientExists = clientFacade.findByLogin(clientLogin);
                    if(!"".equals(clientName)
                            && !"".equals(clientSurname)
                            && !"".equals(clientLogin)
                            && !"".equals(clientPassword)
                            && lengthNumber <= 8 && lengthNumber >= 7
                            && scaleMoney >= 0 && scaleMoney <= 2){
                        Client client = new Client();
                        client.setClientName(clientName);
                        client.setClientSurname(clientSurname);
                        client.setClientNumber(clientNumber);
                        client.setClientMoney(clientMoney);
                        client.setLogin(clientLogin);
                        client.setLevel("USER");
                        client.setSalt(salt);
                        client.setPassword(pp.getProtectedPassword(clientPassword, salt));
                        if(clientExists != null){
                            job.add("infoforif", true);
                            int i  = 5/0;
                        }
                        clientFacade.create(client);
                        job.add("done", true);
                    }else{
                        int i  = 5/0;
                    }
                }catch(Exception e){
                    if("".equals(clientName)){
                        job.add("clientName", false);
                    }else{
                        job.add("clientName", true);
                    }
                    if("".equals(clientSurname)){
                        job.add("clientSurname", false);
                    }else{
                        job.add("clientSurname", true);
                    }
                    if(lengthNumber > 8 || lengthNumber < 7){
                        job.add("clientNumber", false);
                    }else{
                        job.add("clientNumber", true);
                    }
                    if(scaleMoney > 2 || scaleMoney < 0){
                        job.add("clientMoney", false);
                    }else{
                        job.add("clientMoney", true);
                    }
                    if("".equals(clientLogin)){
                        job.add("clientLogin", false);
                    }else{
                        job.add("clientLogin", true);
                    }
                    if("".equals(clientPassword)){
                        job.add("clientPassword", false);
                    }else{
                        job.add("clientPassword", true);
                    }
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
                break;
            case "/getClientOptions":
                List<Client> clients = clientFacade.findAll();
                clients.remove(0);
                ClientJsonBuilder cjb = new ClientJsonBuilder();
                if(!clients.isEmpty()){
                    job.add("status", true)
                    .add("options", cjb.getClientsJsonArray(clients));
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
                break;
            case "/fillInputsClient":
                JsonReader jr = Json.createReader(request.getReader());
                JsonObject jo = jr.readObject();
                long clientId = Long.parseLong(jo.getString("clientId", ""));
                Client client = clientFacade.find(clientId);
                ClientJsonBuilder cjb2 = new ClientJsonBuilder();
                job.add("client", cjb2.getClientJsonObject(client))
                        .add("status", true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
                break;
            case "/editClient":
                jr = Json.createReader(request.getReader());
                jo = jr.readObject();
                long clientIdEdit = Long.parseLong(jo.getString("clientId_edit", ""));
                Client clientEditByIdExists = clientFacade.find(clientIdEdit);
                clientLogin = jo.getString("clientLogin_edit", "");
                Client clientEditExists = clientFacade.findByLogin(clientLogin);
                String clientLevelEdit = jo.getString("clientLevel_edit", "");
                boolean LoginTrue = false;
                try{
                    clientName = jo.getString("clientName_edit", "");
                    clientSurname = jo.getString("clientSurname_edit", "");
                    clientNumber = jo.getString("clientNumber_edit", "");
                    clientPassword = jo.getString("clientPassword_edit", "");
                    lengthNumber = clientNumber.length();
                    BigDecimal clientMoney = new BigDecimal(jo.getString("clientMoney_edit", ""));
                    scaleMoney = new BigDecimal(jo.getString("clientMoney_edit", "")).scale();
                    PasswordProtected pp = new PasswordProtected();
                    String salt = pp.getSalt();
                    if(clientEditExists != null){
                       LoginTrue = clientEditExists.getLogin().equals(clientEditByIdExists.getLogin());
                    }
                    if(!"".equals(clientName)
                            && !"".equals(clientName)
                            && !"".equals(clientSurname)
                            && !"".equals(clientLogin)
//                            && !"".equals(clientPassword)
                            && lengthNumber <=8 && lengthNumber >=7
                            && (LoginTrue || clientEditExists == null)
                            && !clientEditByIdExists.getLogin().equals("admin")
                            && !"".equals(clientLevelEdit)
                            && scaleMoney >= 0 && scaleMoney <= 2){
                        clientEditByIdExists.setClientName(clientName);
                        clientEditByIdExists.setClientSurname(clientSurname);
                        clientEditByIdExists.setClientNumber(clientNumber);
                        clientEditByIdExists.setClientMoney(clientMoney);
                        clientEditByIdExists.setLogin(clientLogin);
                        if(!"".equals(clientPassword)){
                            clientEditByIdExists.setPassword(pp.getProtectedPassword(clientPassword, salt));
                        }
                        clientEditByIdExists.setSalt(salt);
                        clientEditByIdExists.setLevel(clientLevelEdit);
                        clientFacade.edit(clientEditByIdExists);
                        job.add("status", true)
                                .add("clientId", clientIdEdit);
                    }
                    else{
                            int i = 5/0;
                    }
                }
                catch(Exception e){
                    if("".equals(clientName)){
                        job.add("clientNameEdit", false);
                    }else{
                        job.add("clientNameEdit", true);
                    }
                    if("".equals(clientSurname)){
                        job.add("clientSurnameEdit", false);
                    }else{
                        job.add("clientSurnameEdit", true);
                    }
                    if(lengthNumber > 8 || lengthNumber < 7){
                        job.add("clientNumberEdit", false);
                    }else{
                        job.add("clientNumberEdit", true);
                    }
                    if("".equals(clientLogin)){
                        job.add("clientLoginEdit", false);
                        job.add("clientLoginEdit_text", "Wrong login");
                    }else if(!clientEditExists.getLogin().equals(clientEditByIdExists.getLogin())){
                        job.add("clientLoginEdit", false);
                        job.add("clientLoginEditText", true);
                    }else{
                        job.add("clientLoginEdit", true);
                    }
                    if(scaleMoney > 2 || scaleMoney < 0){
                        job.add("clientMoneyEdit", false);
                    }else{
                        job.add("clientMoneyEdit", true);
                    }
//                    if("".equals(clientPassword)){
//                        job.add("clientPasswordEdit", false);
//                    }else{
//                        job.add("clientPasswordEdit", true);
//                    }
                    if("".equals(clientLevelEdit)){
                        job.add("clientLevelEdit", false);
                    }else{
                        job.add("clientLevelEdit", true);
                    }
                }
                try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                }   
                break;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
