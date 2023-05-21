import com.controller.Service.CourseService;
import com.controller.Domain.Course;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class mytest {
    @Test
    public void test(){
         ApplicationContext Context=  new ClassPathXmlApplicationContext("applicationContext.xml");
        CourseService courseServiceimpl = (CourseService) Context.getBean("CourseServiceImpl");
        for (Course course:courseServiceimpl.findAll()
             ) {
            System.out.println(course);
        }
    }
}
