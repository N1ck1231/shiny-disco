package com.controller.config;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public  class Myinterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler) throws Exception {
        HttpSession session = httpServletRequest.getSession();
        if(httpServletRequest.getRequestURI().contains("first")){
            return true;
        }
        if(httpServletRequest.getRequestURI().contains("login")){
            return true;
        }
        if(session.getAttribute("userLoginInfo")!=null){
            return  true;
        }

        httpServletRequest.getRequestDispatcher("/WEB-INF/pages/login.jsp").forward(httpServletRequest,httpServletResponse);
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
