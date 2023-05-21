package com.controller.Contoller;
import com.controller.Service.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.controller.Domain.Course;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.List;

@Controller
@RequestMapping("/Course")
public class CourseController {
    @Autowired
    @Qualifier("CourseServiceImpl")
    private CourseServiceImpl courseService;

    @RequestMapping("/first")
    public String welcome() {
        return "login";
    }

    @RequestMapping("/addCourse")
    public String addCourse(Course course){
        System.out.println(course);
        courseService.addCourse(course);
        return "redirect:/Course/allCourse";
    }
    @RequestMapping("/toaddCourse")
    public String toaddCourse() {
        return "addCourse";
    }

    @RequestMapping("/allCourse")
    public String list(Model model){
     List<Course> list= courseService.findAll();
     model.addAttribute("list",list);
     return "allCourse";
    }
    @RequestMapping("/deleteCourse")
    public String deleteBook(int id) {
        courseService.deleteCourse(id);
        return "redirect:/Course/allCourse";
    }
    @RequestMapping("/toupdateCourse")
    public String toUpdateCourse(Model model, Integer id) {
        Course courses = courseService.findCourse(id);
        System.out.println(courses);
        model.addAttribute("Qcourse",courses );
        return "updateCourse";
    }

    @RequestMapping("/updateCourse")
    public String updateBook (Course course) {
        System.out.println(course);
        courseService.updateCourse(course);
        return "redirect:/Course/allCourse";
    }
    @RequestMapping("/login")
    public String login(HttpSession session, String username , String password){
        session.setAttribute("userLoginInfo",username);
        if (username.equals("liwen") && password.equals("123456")) {
            return "redirect:/Course/allCourse";
        } else {
            return "redirect:/Course/first";
        }
    }
    @RequestMapping( "/upload")
    public String upload(MultipartFile file) throws IOException{
        if (!file.isEmpty()){
            file.transferTo(new File("D:/李文/Documents"));
            return "allCourse";
        }
        return "allCourse";
    }

}