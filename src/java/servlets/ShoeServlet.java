/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entities.Client;
import entities.Product;
import facades.ProductFacade;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
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

/**
 *
 * @author pupil
 */
@WebServlet(name = "ShoeServlet", urlPatterns = {
    "/sendShoe",
    
})
public class ShoeServlet extends HttpServlet {
    @EJB ProductFacade productFacade;
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
        switch(path){
            case "/sendShoe":
                JsonReader jr = Json.createReader(request.getReader());
                JsonObject jo = jr.readObject();
                String shoeFirm = jo.getString("ShoeFirm", "");
                String ShoeModell = jo.getString("ShoeModell", "");
                String ShoePrice = jo.getString("ShoePrice", "");
                String ShoeCount = jo.getString("ShoeCount", "");
                String ShoeSize = jo.getString("ShoeSize", "");
                Product product = new Product();
                product.setBywho(shoeFirm);
                product.setModell(ShoeModell);
                product.setPrice(Double.parseDouble(ShoePrice));
                product.setPiece(Integer.parseInt(ShoeCount));
                product.setMaxPiece(Integer.parseInt(ShoeCount));
                product.setBywho(ShoeSize);
                productFacade.create(product);
                job.add("info", "Shoe added successfully!");
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
