package com.controller.Service;
import com.controller.Domain.Course;
import java.util.List;
public interface CourseService {
   //新增课程
   int addCourse(Course course);
   //删除课程
   int deleteCourse(int id);
   //更新课程
   int updateCourse(Course course);
   //查询课程
   Course findCourse (int id);
   //展示全部课程
   List<Course> findAll();

}

