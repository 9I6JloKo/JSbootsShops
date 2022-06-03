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
import javax.servlet.http.HttpSession;
import jsontools.ClientJsonBuilder;
import jsontools.ShoeJsonBuilder;
import tools.PasswordProtected;

/**
 *
 * @author pupil
 */
@WebServlet(name = "ShoeServlet", urlPatterns = {
    "/sendShoe",
    "/getShoeOptions",
    "/editShoe",
    "/fillInputsShoes",
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
        String shoeFirm = "";
        String shoeModell = "";
        Double shoePrice = null;
        int shoeCount = 0;
        Double shoeSize = null;
        request.setCharacterEncoding("UTF-8");
        int shoePriceScale = 3;
        JsonObjectBuilder job = Json.createObjectBuilder();
        switch(path){
            case "/sendShoe":
                try{
                    JsonReader jr = Json.createReader(request.getReader());
                    JsonObject jo = jr.readObject();
                    shoeFirm = jo.getString("ShoeFirm", "");
                    shoeModell = jo.getString("ShoeModell", "");
                    shoeSize = Double.parseDouble(jo.getString("ShoeSize", ""));
                    shoePrice = Double.parseDouble(jo.getString("ShoePrice", ""));
                    shoePriceScale = new BigDecimal(jo.getString("ShoePrice", "")).scale();
                    shoeCount = Integer.parseInt(jo.getString("ShoeCount", ""));
                    if(shoePrice >= 0.01 && shoePrice <= 300 && shoeCount >= 1 && shoeCount <= 300 && shoeSize >= 25 && shoeSize <= 55 && shoePriceScale <= 2) {
                        Product product = new Product();
                        product.setBywho(shoeFirm);
                        product.setModell(shoeModell);
                        product.setPrice(shoePrice);
                        product.setPiece(shoeCount);
                        product.setMaxPiece(shoeCount);
                        product.setSize(shoeSize);
                        productFacade.create(product);
                        job.add("done", true);
                    }else{
                        int m = 5/0;
                    }
                }catch(Exception e){
                    job.add("done", false);
                    if("".equals(shoeFirm)){
                        job.add("shoeFirm", false);
                    }else{
                        job.add("shoeFirm", true);
                    }
                    if("".equals(shoeModell)){
                        job.add("shoeModell", false);
                    }else{
                        job.add("shoeModell", true);
                    }
                    if(shoeSize == null || shoeSize < 25 || shoeSize > 55){
                        job.add("shoeSize", false);
                    }else{
                        job.add("shoeSize", true);
                    }
                    if(shoePrice == null || shoePrice < 0.01 || shoePrice > 300 || shoePriceScale > 2 || shoePriceScale < 0){
                        job.add("shoePrice", false);
                    }else{
                        job.add("shoePrice", true);
                    }
                    if(shoeCount < 1 || shoeCount > 300){
                        job.add("shoeCount", false);
                    }else{
                        job.add("shoeCount", true);
                    }
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
                break;
            case "/getShoeOptions":
                List<Product> products = productFacade.findAll();
                ShoeJsonBuilder sjb = new ShoeJsonBuilder();
                if(!products.isEmpty()){
                    job.add("status", true)
                    .add("options", sjb.getShoesJsonArray(products));
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
                break;
            case "/fillInputsShoes":
                JsonReader jr = Json.createReader(request.getReader());
                JsonObject jo = jr.readObject();
                long shoeId = Long.parseLong(jo.getString("shoeId", ""));
                Product product = productFacade.find(shoeId);
                sjb = new ShoeJsonBuilder();
                job.add("shoe", sjb.getShoesJsonObject(product))
                        .add("status", true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }   
            break;
            case "/editShoe":
                jr = Json.createReader(request.getReader());
                jo = jr.readObject();
                long shoeIdEdit = Long.parseLong(jo.getString("shoeId_edit", ""));
                shoeFirm = jo.getString("shoeFirm_edit", "");
                shoeModell = jo.getString("shoeModell_edit", "");
                shoeSize = Double.parseDouble(jo.getString("shoeSize_edit", ""));
                shoePrice = Double.parseDouble(jo.getString("shoePrice_edit", ""));
                shoeCount = Integer.parseInt(jo.getString("shoeCount_edit", ""));
                shoePrice = Double.parseDouble(jo.getString("shoePrice_edit", ""));
                shoePriceScale = new BigDecimal(jo.getString("shoePrice_edit", "")).scale();
                Product shoe = productFacade.find(shoeIdEdit);
                try{
                    if(shoePrice >= 0.01 && shoePrice <= 300 && shoeCount >= 1 && shoeCount <= 300 && shoeSize >= 25 && shoeSize <= 55  && shoePriceScale <= 2){
                        shoe.setBywho(shoeFirm);
                        shoe.setModell(shoeModell);
                        shoe.setPrice(shoePrice);
                        shoe.setPiece(shoeCount);
                        shoe.setMaxPiece(shoeCount);
                        shoe.setSize(shoeSize);
                        productFacade.edit(shoe);
                        job.add("done", true);
                    }
                    else{
                            int i = 5/0;
                    }
                }
                catch(Exception e){
                    if("".equals(shoeFirm)){
                        job.add("shoeFirmEdit", false);
                    }else{
                        job.add("shoeFirmEdit", true);
                    }
                    if("".equals(shoeModell)){
                        job.add("shoeModellEdit", false);
                    }else{
                        job.add("shoeModellEdit", true);
                    }
                    if(shoeSize == null || shoeSize < 25 || shoeSize > 55){
                        job.add("shoeSizeEdit", false);
                    }else{
                        job.add("shoeSizeEdit", true);
                    }
                    if(shoePrice == null || shoePrice < 0.01 || shoePrice > 300 || shoePriceScale > 2 || shoePriceScale < 0){
                        job.add("shoePriceEdit", false);
                    }else{
                        job.add("shoePriceEdit", true);
                    }
                    if(shoeCount < 1 || shoeCount > 300){
                        job.add("shoeCountEdit", false);
                    }else{
                        job.add("shoeCountEdit", true);
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