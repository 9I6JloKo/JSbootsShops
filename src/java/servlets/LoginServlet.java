/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;
import facades.ClientFacade;
import tools.PasswordProtected;
import entities.Client;
import entities.History;
import entities.Product;
import facades.HistoryFacade;
import facades.ProductFacade;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.GregorianCalendar;
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
@WebServlet(name = "LoginServlet", loadOnStartup = 0, urlPatterns = {
    "/login",
    "/logout",
    "/BuyShoe",
})
public class LoginServlet extends HttpServlet {
    PasswordProtected pp = new PasswordProtected();
    @EJB private ClientFacade clientFacade;
    @EJB private ProductFacade productFacade;
    @EJB private HistoryFacade historyFacade;
    HttpSession session = null;
    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        try{
            String uploadDir = this.getClass().getResource("").toString().replace("file:/", "").replace("build/web/WEB-INF/classes/servlets/", "").replace("/", "\\"); 
            String uploadDir2 = "images";
            Path path = Paths.get((uploadDir + "\\images"));
            if(Files.exists(path)){
                File folder = new File(path.toString());
                File[] listOfFiles = folder.listFiles();
                for (File f : listOfFiles) {
                    File maybeFile = new File(uploadDir + "\\build\\web\\images" + File.separator + f.getName());
                    maybeFile.mkdirs();
                    Files.copy(f.toPath(), maybeFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                }
            }
        }catch(Exception e){
        }
        if(clientFacade.count()>0) return;
        Client client = new Client();
        client.setClientName("Maksim");
        client.setClientSurname("Grishin");
        client.setClientNumber("53883833");
        client.setClientMoney(new BigDecimal(0));
        client.setLogin("admin");
        client.setLevel("ADMINISTRATOR");
        String salt = pp.getSalt();
        client.setSalt(salt);
        client.setPassword(pp.getProtectedPassword("12345", salt));
        clientFacade.create(client);
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
                    job.add("info", "??????, "+authUser.getClientName()+"!")
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
            case "/BuyShoe":
                try{
                    JsonReader jr = Json.createReader(request.getReader());
                    JsonObject jo = jr.readObject();
                    long productId = Long.parseLong(jo.getString("productId", ""));
                    Product product = productFacade.find(productId);
                    Client client = (Client) session.getAttribute("authUser");
                    client = clientFacade.find(client.getId());
                    BigDecimal pp = product.getPrice();
                    if(client.getClientMoney().compareTo(pp) >= 0 && product.getPiece() >= 1){
                        client.setClientMoney(client.getClientMoney().subtract(pp));
                        product.setPiece(product.getPiece()-1);
                        History history = new History();
                        history.setProduct(product);
                        history.setClient(client);
                        Calendar c = new GregorianCalendar();
                        history.setDateOfBuying(c.getTime());
                        history.setProductPrice(product.getPrice());
                        historyFacade.create(history);
                        clientFacade.edit(client);
                        productFacade.edit(product);
                        job.add("status", true)
                                .add("info", "SUCCESSFUL");
                    }else{
                        if(client.getClientMoney().compareTo(pp) == -1){
                            job.add("status", false)
                                .add("info", "You've ran out of money");
                        }else{
                            job.add("status", false)
                                .add("info", "We've ran out of shoe");
                        }
                    }
                }catch(Exception e){
                    job.add("status", false)
                        .add("info", "Choose shoes you want, please");
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
