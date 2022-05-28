/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;
import facades.ClientFacade;
import tools.PasswordProtected;
import entities.Client;
import java.io.IOException;
import java.io.PrintWriter;
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
import javax.servlet.http.HttpSession;
import jsontools.ClientJsonBuilder;

/**
 *
 * @author pupil
 */
@WebServlet(name = "LoginServlet", urlPatterns = {
    "/login",
    "/logout",
    
})
public class LoginServlet extends HttpServlet {
    PasswordProtected pp = new PasswordProtected();
    @EJB private ClientFacade clientFacade;
    HttpSession session = null;
    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        if(clientFacade.count()>0) return;
        Client client = new Client();
        client.setClientName("Maksim");
        client.setClientSurname("Grishin");
        client.setClientNumber("53883833");
        client.setClientMoney(0);
        client.setLogin("admin");
        client.setLevel("ADMINISTRATOR");
        String salt = pp.getSalt();
        client.setSalt(salt);
        client.setPassword(pp.getProtectedPassword("12345", salt));
        clientFacade.create(client);
        if(session != null){
            
        }
    }
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
        request.setCharacterEncoding("UTF-8");
        Client authUser = null;
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch(path){
            case "/login":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String login = jsonObject.getString("login","");
                String password = jsonObject.getString("password","");
                authUser = clientFacade.findByLogin(login);
                String passwordLogin = pp.getProtectedPassword(password, authUser.getSalt());
                if(authUser == null || !authUser.getLogin().equals(login) || !authUser.getPassword().equals(passwordLogin)){
                       job.add("auth",false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                }
                else {
                    session = request.getSession(true);
                    session.setAttribute("authUser", authUser);
                    job.add("info", "Йоу, "+authUser.getClientName()+"!")
                       .add("auth",true)
                       .add("user", new ClientJsonBuilder().getClientJsonObject(authUser));
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                }
                break;
            case "/logout":
                authUser = null;
                session = request.getSession(false);
                if(session != null){
                    session.invalidate();
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
