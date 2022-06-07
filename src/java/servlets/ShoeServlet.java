/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entities.Product;
import facades.ProductFacade;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import jsontools.ShoeJsonBuilder;

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
@MultipartConfig
public class ShoeServlet extends HttpServlet {
    private final String uploadDir = this.getClass().getResource("").toString().replace("/", "\\").replace("file:/", ""); 
    private final String uploadDir2 = "\\WEB-INF\\classes\\servlets\\images";
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
        BigDecimal shoePrice = null;
        int shoeCount = 0;
        BigDecimal shoeSize = null;
        String shoeFileName = "";
        request.setCharacterEncoding("UTF-8");
        int shoePriceScale = 3;
        JsonObjectBuilder job = Json.createObjectBuilder();
        switch(path){
            case "/sendShoe":
                try{
                    shoeFirm = request.getParameter("ShoeFirm");
                    shoeModell = request.getParameter("ShoeModell");
                    shoeSize = new BigDecimal(request.getParameter("ShoeSize"));
                    shoePrice = new BigDecimal(request.getParameter("ShoePrice"));
                    shoePriceScale = new BigDecimal(request.getParameter("ShoePrice")).scale();
                    shoeCount = Integer.parseInt(request.getParameter("ShoeCount"));
                    shoeFileName = getFileName(request.getPart("ShoeFile"));
                    if(!"".equals(shoeFirm) && !"".equals(shoeModell) && !"".equals(shoeFileName) && shoePrice.compareTo(new BigDecimal(0.01)) >= 0 && shoePrice.compareTo(new BigDecimal(10000)) <= 0 && shoeCount >= 1 && shoeCount <= 10000 && shoeSize.compareTo(new BigDecimal(20)) >= 0 && shoeSize.compareTo(new BigDecimal(60)) <= 0 && shoePriceScale <= 2) {
                        Product product = new Product();
                        product.setBywho(shoeFirm);
                        product.setModell(shoeModell);
                        product.setPrice(shoePrice);
                        product.setPiece(shoeCount);
                        product.setMaxPiece(shoeCount);
                        product.setSize(shoeSize);
                        try {
                            product.setPathToFile(getPathToCover(request.getPart("ShoeFile")));
                        } catch (Exception e) {
                            shoeFileName = request.getParameter("ShoeFile");
                            product.setPathToFile(getPathToCover(shoeFileName));
                        }
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
                    if(shoeSize == null || shoeSize.compareTo(new BigDecimal(20)) == -1 || shoeSize.compareTo(new BigDecimal(60)) == 1){
                        job.add("shoeSize", false);
                    }else{
                        job.add("shoeSize", true);
                    }
                    if(shoePrice == null || shoePrice.compareTo(new BigDecimal(0.01)) == -1 || shoePrice.compareTo(new BigDecimal(10000)) == 1 || shoePriceScale > 2 || shoePriceScale < 0){
                        job.add("shoePrice", false);
                    }else{
                        job.add("shoePrice", true);
                    }
                    if(shoeCount < 1 || shoeCount > 10000){
                        job.add("shoeCount", false);
                    }else{
                        job.add("shoeCount", true);
                    }
                    if("".equals(shoeFileName)){
                        job.add("shoeFile", false);
                    }else{
                        job.add("shoeFile", true);
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
                try{
                    long shoeIdEdit = Long.parseLong(jo.getString("shoeId_edit", ""));
                    shoeFirm = jo.getString("shoeFirm_edit", "");
                    shoeModell = jo.getString("shoeModell_edit", "");
                    shoeSize = new BigDecimal(jo.getString("shoeSize_edit", ""));
                    shoePrice = new BigDecimal(jo.getString("shoePrice_edit", ""));
                    shoePriceScale = new BigDecimal(jo.getString("shoePrice_edit", "")).scale();
                    shoeCount = Integer.parseInt(jo.getString("shoeCount_edit", ""));
                    Product shoe = productFacade.find(shoeIdEdit);
                    if(shoePrice.compareTo(new BigDecimal(0.01)) >= 0 && shoePrice.compareTo(new BigDecimal(10000)) <= 0 && shoeCount >= 1 && shoeCount <= 10000 && shoeSize.compareTo(new BigDecimal(20)) >= 0 && shoeSize.compareTo(new BigDecimal(60)) <= 0 && shoePriceScale <= 2){
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
                    if(shoeSize == null || shoeSize.compareTo(new BigDecimal(20)) == -1 || shoeSize.compareTo(new BigDecimal(60)) == 1){
                        job.add("shoeSizeEdit", false);
                    }else{
                        job.add("shoeSizeEdit", true);
                    }
                    if(shoePrice == null || shoePrice.compareTo(new BigDecimal(0.01)) == -1 || shoePrice.compareTo(new BigDecimal(10000)) == 1 || shoePriceScale > 2 || shoePriceScale < 0){
                        job.add("shoePriceEdit", false);
                    }else{
                        job.add("shoePriceEdit", true);
                    }
                    if(shoeCount < 1 || shoeCount > 10000){
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
        private String getPathToCover(Part part) throws IOException {
        String pathToCover = uploadDir + File.separator + getFileName(part);
        String pathToCover2 = uploadDir2 + File.separator + getFileName(part);
        File file = new File(pathToCover);
        file.mkdirs();
        try(InputStream fileContent = part.getInputStream()){
            Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }
        return pathToCover2;
    }
    private String getPathToCover(String coverFileName){
        File uploadDirFolder = new File(uploadDir);
        File[] listOfFiles = uploadDirFolder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if(listOfFiles[i].isFile()){
                if(coverFileName.equals(listOfFiles[i].getName())){
                    return listOfFiles[i].getPath();
                }
            }
        }
        return "";
    }
    private String[] getCoversFileName(){
        Set<String> setPathToCover = new HashSet<>();
        File uploadDirFolder = new File(uploadDir);
        File[] listOfFiles = uploadDirFolder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if(listOfFiles[i].isFile()){
                setPathToCover.add(listOfFiles[i].getName());
            }
        }
        return setPathToCover.toArray(new String[setPathToCover.size()]);
    }
    private String getFileName(Part part){
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
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