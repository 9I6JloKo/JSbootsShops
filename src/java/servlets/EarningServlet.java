/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entities.History;
import facades.HistoryFacade;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.GregorianCalendar;
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

/**
 *
 * @author anana
 */
@WebServlet(name = "EarningServlet", urlPatterns = {
    "/calculateEarning"
})
public class EarningServlet extends HttpServlet {
    @EJB HistoryFacade historyFacade;
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
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        String earning_sum_final = "";
        switch(path){
                case "/calculateEarning":
                    try{
                        JsonReader jr = Json.createReader(request.getReader());
                        JsonObject jo = jr.readObject();
                        int monthId = Integer.parseInt(jo.getString("monthId", ""));
                        List<History> histories = historyFacade.findAll();
                        Calendar calendar = new GregorianCalendar();
                        BigDecimal earning = new BigDecimal(0);
                        BigDecimal earning_sum = null;
                        for(int i = 0; i < histories.size(); i++){
                            if(histories.get(i).getDateOfBuying().getTime().getMonth() == (monthId-1) && histories.get(i).getDateOfBuying().get(Calendar.YEAR) == calendar.get(Calendar.YEAR)){
                                earning_sum = earning.add(histories.get(i).getProductPrice());
                                earning = earning_sum;
                            }
                        }
                        earning_sum_final = earning_sum.toString();
                        job.add("earning", earning_sum_final);
                    }
                    catch(Exception e){
                        earning_sum_final = "0";
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
